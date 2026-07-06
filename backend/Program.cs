using ControleGastos.Api.Dtos;
using ControleGastos.Api.Models;
using ControleGastos.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Registra serviços de domínio e persistência
builder.Services.AddSingleton<DataStore>();
builder.Services.AddSingleton<PessoaService>();
builder.Services.AddSingleton<TransacaoService>();
builder.Services.AddSingleton<TotaisService>();

var app = builder.Build();

app.UseCors();

app.MapGet("/pessoas", (PessoaService pessoaService) => Results.Ok(pessoaService.ObterTodas()));

app.MapPost("/pessoas", async (CreatePessoaDto dto, PessoaService pessoaService) =>
{
    var validation = dto.Validar();
    if (!validation.IsValid)
    {
        return Results.BadRequest(validation.Errors);
    }

    var pessoa = await pessoaService.CriarAsync(dto);
    return Results.Created($"/pessoas/{pessoa.Id}", pessoa);
});

app.MapDelete("/pessoas/{id:guid}", async (Guid id, PessoaService pessoaService) =>
{
    var deleted = await pessoaService.DeletarAsync(id);
    return deleted ? Results.NoContent() : Results.NotFound(new { Message = "Pessoa não encontrada." });
});

app.MapGet("/transacoes", (TransacaoService transacaoService) => Results.Ok(transacaoService.ObterTodas()));

app.MapPost("/transacoes", async (CreateTransacaoDto dto, TransacaoService transacaoService) =>
{
    var validation = dto.Validar();
    if (!validation.IsValid)
    {
        return Results.BadRequest(validation.Errors);
    }

    try
    {
        var transacao = await transacaoService.CriarAsync(dto);
        return Results.Created($"/transacoes/{transacao.Id}", transacao);
    }
    catch (InvalidOperationException ex)
    {
        return Results.BadRequest(new { Message = ex.Message });
    }
});

app.MapGet("/totais", (TotaisService totaisService) => Results.Ok(totaisService.CalcularTotais()));

app.Run();
