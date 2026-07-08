namespace ControleGastos.Domain.Models;

public sealed class TotaisResumo
{
    public List<TotaisPessoa> Pessoas { get; set; } = new();
    public decimal TotalReceitas { get; set; }
    public decimal TotalDespesas { get; set; }
    public decimal SaldoLiquido => TotalReceitas - TotalDespesas;
}
