using ControleGastos.Application.Dtos;
using ControleGastos.Application.Services;
using ControleGastos.Application.Validators;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace ControleGastos.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IPessoaService, PessoaService>();
        services.AddScoped<ITransacaoService, TransacaoService>();
        services.AddScoped<ITotaisService, TotaisService>();

        services.AddValidatorsFromAssemblyContaining<CreatePessoaDtoValidator>();

        return services;
    }
}
