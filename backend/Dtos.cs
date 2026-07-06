using System.ComponentModel.DataAnnotations;

namespace ControleGastos.Api.Dtos;

/// <summary>
/// Dados para criação de uma nova pessoa.
/// </summary>
public sealed class CreatePessoaDto
{
    [Required(ErrorMessage = "Nome é obrigatório.")]
    public string Nome { get; set; } = string.Empty;

    [Required(ErrorMessage = "Idade é obrigatória.")]
    [Range(0, 200, ErrorMessage = "Idade deve estar entre 0 e 200.")]
    public int? Idade { get; set; } 

    public ValidationResult Validar()
    {
        if (string.IsNullOrWhiteSpace(Nome))
        {
            return ValidationResult.Failure("Nome é obrigatório.");
        }

        // Checa se é nulo ou se está fora do limite
        if (Idade == null)
        {
            return ValidationResult.Failure("Idade é obrigatória.");
        }
        
        if (Idade < 0 || Idade > 200)
        {
            return ValidationResult.Failure("Idade deve estar entre 0 e 200.");
        }

        return ValidationResult.Success();
    }
}

/// <summary>
/// Dados para criação de uma nova transação.
/// </summary>
public sealed class CreateTransacaoDto
{
    [Required(ErrorMessage = "Descrição é obrigatória.")]
    public string Descricao { get; set; } = string.Empty;

    public decimal Valor { get; set; }

    [Required(ErrorMessage = "Tipo é obrigatório.")]
    public string Tipo { get; set; } = string.Empty;

    public Guid PessoaId { get; set; }

    public ValidationResult Validar()
    {
        if (string.IsNullOrWhiteSpace(Descricao))
        {
            return ValidationResult.Failure("Descrição é obrigatória.");
        }

        if (Valor <= 0)
        {
            return ValidationResult.Failure("Valor deve ser maior que zero.");
        }

        var tipoNormalizado = Tipo?.Trim().ToLowerInvariant();
        if (tipoNormalizado != "receita" && tipoNormalizado != "despesa")
        {
            return ValidationResult.Failure("Tipo deve ser 'receita' ou 'despesa'.");
        }

        if (PessoaId == Guid.Empty)
        {
            return ValidationResult.Failure("PessoaId é obrigatório.");
        }

        return ValidationResult.Success();
    }
}

/// <summary>
/// Resultado de validação simples para os DTOs.
/// </summary>
public sealed class ValidationResult
{
    public bool IsValid { get; private set; }
    public IEnumerable<string> Errors { get; private set; } = Enumerable.Empty<string>();

    private ValidationResult(bool isValid, IEnumerable<string> errors)
    {
        IsValid = isValid;
        Errors = errors;
    }

    public static ValidationResult Success() => new(true, Array.Empty<string>());
    public static ValidationResult Failure(string error) => new(false, new[] { error });
}

public record UpdatePessoaDto(string Nome, int? Idade);