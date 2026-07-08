using ControleGastos.Application.Dtos;
using FluentValidation;

namespace ControleGastos.Application.Validators;

public sealed class CreatePessoaDtoValidator : AbstractValidator<CreatePessoaDto>
{
    public CreatePessoaDtoValidator()
    {
        RuleFor(x => x.Nome)
            .NotEmpty().WithMessage("Nome é obrigatório.");

        RuleFor(x => x.Idade)
            .NotNull().WithMessage("Idade é obrigatória.")
            .InclusiveBetween(0, 200).WithMessage("Idade deve estar entre 0 e 200.");
    }
}
