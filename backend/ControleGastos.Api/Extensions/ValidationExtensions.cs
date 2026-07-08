using FluentValidation;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ControleGastos.Api.Extensions;

public static class ValidationExtensions
{
    public static RouteHandlerBuilder WithValidation<TDto>(this RouteHandlerBuilder builder)
    {
        return builder.AddEndpointFilter(async (context, next) =>
        {
            var dto = context.Arguments.OfType<TDto>().FirstOrDefault();
            if (dto is null)
            {
                return Results.BadRequest(new { title = "Payload inválido.", status = 400 });
            }

            var validator = context.HttpContext.RequestServices.GetService<IValidator<TDto>>();
            if (validator is null)
            {
                return await next(context);
            }

            var result = await validator.ValidateAsync(dto, context.HttpContext.RequestAborted);
            if (!result.IsValid)
            {
                throw new ValidationException(result.Errors);
            }

            return await next(context);
        });
    }
}
