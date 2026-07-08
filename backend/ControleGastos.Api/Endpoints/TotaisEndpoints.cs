using ControleGastos.Application.Services;

namespace ControleGastos.Api.Endpoints;

public static class TotaisEndpoints
{
    public static RouteGroupBuilder MapTotaisEndpoints(this RouteGroupBuilder group)
    {
        group.MapGet("/", async (ITotaisService service, CancellationToken ct) =>
            Results.Ok(await service.CalcularTotaisAsync(ct)));

        return group;
    }
}
