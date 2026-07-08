using ControleGastos.Application.Dtos;
using ControleGastos.Application.Services;
using ControleGastos.Api.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Api.Endpoints;

public static class PessoaEndpoints
{
    public static RouteGroupBuilder MapPessoaEndpoints(this RouteGroupBuilder group)
    {
        group.MapGet("/", async (IPessoaService service, CancellationToken ct) =>
            Results.Ok(await service.ListarAsync(ct)));

        group.MapPost("/", async (CreatePessoaDto dto, IPessoaService service, CancellationToken ct) =>
        {
            var pessoa = await service.CriarAsync(dto, ct);
            return Results.Created($"/pessoas/{pessoa.Id}", pessoa);
        }).WithValidation<CreatePessoaDto>();

        group.MapDelete("/{id:guid}", async (Guid id, IPessoaService service, CancellationToken ct) =>
        {
            var deleted = await service.DeletarAsync(id, ct);
            return deleted
                ? Results.NoContent()
                : Results.NotFound(new ProblemDetails
                {
                    Title = "Pessoa não encontrada.",
                    Status = StatusCodes.Status404NotFound
                });
        });

        return group;
    }
}
