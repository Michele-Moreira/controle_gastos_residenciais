using ControleGastos.Application.Dtos;
using ControleGastos.Application.Services;
using ControleGastos.Api.Extensions;

namespace ControleGastos.Api.Endpoints;

public static class TransacaoEndpoints
{
    public static RouteGroupBuilder MapTransacaoEndpoints(this RouteGroupBuilder group)
    {
        group.MapGet("/", async (ITransacaoService service, CancellationToken ct) =>
            Results.Ok(await service.ListarAsync(ct)));

        group.MapPost("/", async (CreateTransacaoDto dto, ITransacaoService service, CancellationToken ct) =>
        {
            var transacao = await service.CriarAsync(dto, ct);
            return Results.Created($"/transacoes/{transacao.Id}", transacao);
        }).WithValidation<CreateTransacaoDto>();

        return group;
    }
}
