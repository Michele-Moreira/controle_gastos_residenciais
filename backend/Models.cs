namespace ControleGastos.Api.Models;

/// <summary>
/// Representa uma pessoa cadastrada no sistema.
/// </summary>
public sealed class Pessoa
{
    public Guid Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public int Idade { get; set; }
}

/// <summary>
/// Representa uma transação financeira vinculada a uma pessoa.
/// </summary>
public sealed class Transacao
{
    public Guid Id { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public decimal Valor { get; set; }
    public string Tipo { get; set; } = string.Empty;
    public Guid PessoaId { get; set; }
}

/// <summary>
/// Totais calculados para uma pessoa, considerando receitas e despesas.
/// </summary>
public sealed class TotaisPessoa
{
    public Guid PessoaId { get; set; }
    public string Nome { get; set; } = string.Empty;
    public decimal TotalReceitas { get; set; }
    public decimal TotalDespesas { get; set; }
    public decimal Saldo => TotalReceitas - TotalDespesas;
}

/// <summary>
/// Totais agregados do sistema, incluindo todas as pessoas.
/// </summary>
public sealed class TotaisResumo
{
    public List<TotaisPessoa> Pessoas { get; set; } = new();
    public decimal TotalReceitas { get; set; }
    public decimal TotalDespesas { get; set; }
    public decimal SaldoLiquido => TotalReceitas - TotalDespesas;
}
