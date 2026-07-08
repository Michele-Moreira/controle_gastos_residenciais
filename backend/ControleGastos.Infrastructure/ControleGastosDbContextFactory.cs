using ControleGastos.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace ControleGastos.Infrastructure;

public sealed class ControleGastosDbContextFactory : IDesignTimeDbContextFactory<ControleGastosDbContext>
{
    public ControleGastosDbContext CreateDbContext(string[] args)
    {
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "..", "ControleGastos.Api"))
            .AddJsonFile("appsettings.json", optional: true)
            .AddJsonFile("appsettings.Development.json", optional: true)
            .AddEnvironmentVariables()
            .Build();

        var provider = configuration["Database:Provider"] ?? "Sqlite";
        var connectionString = configuration.GetConnectionString("Default")
            ?? "Data Source=controle_gastos.db";

        var optionsBuilder = new DbContextOptionsBuilder<ControleGastosDbContext>();

        if (string.Equals(provider, "Postgres", StringComparison.OrdinalIgnoreCase))
        {
            optionsBuilder.UseNpgsql(connectionString);
        }
        else
        {
            optionsBuilder.UseSqlite(connectionString);
        }

        return new ControleGastosDbContext(optionsBuilder.Options);
    }
}
