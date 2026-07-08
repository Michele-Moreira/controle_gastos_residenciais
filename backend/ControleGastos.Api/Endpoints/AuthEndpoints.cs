using ControleGastos.Application.Dtos;
using ControleGastos.Api.Extensions;
using ControleGastos.Infrastructure.Auth;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Api.Endpoints;

public static class AuthEndpoints
{
    public static RouteGroupBuilder MapAuthEndpoints(this RouteGroupBuilder group)
    {
        group.MapPost("/login", (LoginDto dto, IJwtTokenService jwtTokenService) =>
        {
            var response = jwtTokenService.Authenticate(dto.Username, dto.Password);
            if (response is null)
            {
                return Results.Unauthorized();
            }

            return Results.Ok(response);
        }).WithValidation<LoginDto>();

        return group;
    }
}
