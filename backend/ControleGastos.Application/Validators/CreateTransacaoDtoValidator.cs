using ControleGastos.Application.Dtos;
using FluentValidation;

namespace ControleGastos.Application.Validators;

public sealed class CreateTransacaoDtoValidator : AbstractValidator<CreateTransacaoDto>
{
    public CreateTransacaoDtoValidator()
    {
        RuleFor(x => x.Descricao)
            .NotEmpty().WithMessage("Descrição é obrigatória.");

        RuleFor(x => x.Valor)
            .GreaterThan(0).WithMessage("Valor deve ser maior que zero.");

        RuleFor(x => x.Tipo)
            .NotEmpty().WithMessage("Tipo é obrigatório.")
            .Must(tipo =>
            {
                var normalized = tipo.Trim().ToLowerInvariant();
                return normalized is "receita" or "despesa";
            })
            .WithMessage("Tipo deve ser 'receita' ou 'despesa'.");

        RuleFor(x => x.PessoaId)
            .NotEqual(Guid.Empty).WithMessage("PessoaId é obrigatório.");
    }
}
