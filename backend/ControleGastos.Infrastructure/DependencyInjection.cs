using ControleGastos.Application.Abstractions;
using ControleGastos.Infrastructure.Auth;
using ControleGastos.Infrastructure.Data;
using ControleGastos.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ControleGastos.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.Configure<JwtSettings>(configuration.GetSection(JwtSettings.SectionName));
        services.Configure<AuthSettings>(configuration.GetSection(AuthSettings.SectionName));

        var provider = configuration["Database:Provider"] ?? "Sqlite";
        var connectionString = configuration.GetConnectionString("Default")
            ?? "Data Source=controle_gastos.db";

        services.AddDbContext<ControleGastosDbContext>(options =>
        {
            if (string.Equals(provider, "Postgres", StringComparison.OrdinalIgnoreCase))
            {
                options.UseNpgsql(
                    connectionString,
                    npgsql => npgsql.MigrationsAssembly(
                        typeof(ControleGastosDbContext).Assembly.GetName().Name));
            }
            else
            {
                options.UseSqlite(
                    connectionString,
                    sqlite => sqlite.MigrationsAssembly(
                        typeof(ControleGastosDbContext).Assembly.GetName().Name));
            }
        });

        services.AddScoped<IPessoaRepository, PessoaRepository>();
        services.AddScoped<ITransacaoRepository, TransacaoRepository>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddSingleton<IJwtTokenService, JwtTokenService>();

        services.AddHealthChecks()
            .AddDbContextCheck<ControleGastosDbContext>("database");

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer();

        services.AddOptions<JwtBearerOptions>(JwtBearerDefaults.AuthenticationScheme)
            .Configure<Microsoft.Extensions.Options.IOptions<JwtSettings>>((options, jwtSettings) =>
            {
                var settings = jwtSettings.Value;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = settings.Issuer,
                    ValidAudience = settings.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(settings.Secret))
                };
            });

        services.AddAuthorization();

        return services;
    }

    public static async Task MigrateAndSeedAsync(this IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ControleGastosDbContext>();
        await context.Database.MigrateAsync();

        if (!await context.Pessoas.AnyAsync())
        {
            await SeedFromLegacyJsonAsync(context);
        }
    }

    private static async Task SeedFromLegacyJsonAsync(ControleGastosDbContext context)
    {
        var dataFolder = Path.Combine(AppContext.BaseDirectory, "Data");
        var pessoasFile = Path.Combine(dataFolder, "pessoas.json");
        var transacoesFile = Path.Combine(dataFolder, "transacoes.json");

        if (!File.Exists(pessoasFile))
        {
            return;
        }

        var jsonOptions = new System.Text.Json.JsonSerializerOptions(System.Text.Json.JsonSerializerDefaults.Web);
        var pessoasJson = await File.ReadAllTextAsync(pessoasFile);
        var pessoas = System.Text.Json.JsonSerializer.Deserialize<List<LegacyPessoa>>(pessoasJson, jsonOptions) ?? [];

        foreach (var pessoa in pessoas)
        {
            context.Pessoas.Add(new Domain.Entities.Pessoa
            {
                Id = pessoa.Id,
                Nome = pessoa.Nome,
                Idade = pessoa.Idade
            });
        }

        if (File.Exists(transacoesFile))
        {
            var transacoesJson = await File.ReadAllTextAsync(transacoesFile);
            var transacoes = System.Text.Json.JsonSerializer.Deserialize<List<LegacyTransacao>>(transacoesJson, jsonOptions) ?? [];

            var baseTimestamp = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            for (var i = 0; i < transacoes.Count; i++)
            {
                var transacao = transacoes[i];
                context.Transacoes.Add(new Domain.Entities.Transacao
                {
                    Id = transacao.Id,
                    Descricao = transacao.Descricao,
                    Valor = transacao.Valor,
                    Tipo = Domain.Enums.TipoTransacaoExtensions.FromApiValue(transacao.Tipo),
                    PessoaId = transacao.PessoaId,
                    CriadoEm = baseTimestamp.AddSeconds(i)
                });
            }
        }

        await context.SaveChangesAsync();
    }

    private sealed class LegacyPessoa
    {
        public Guid Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public int Idade { get; set; }
    }

    private sealed class LegacyTransacao
    {
        public Guid Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public string Tipo { get; set; } = string.Empty;
        public Guid PessoaId { get; set; }
    }
}
