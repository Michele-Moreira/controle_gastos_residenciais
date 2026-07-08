using ControleGastos.Domain.Enums;

namespace ControleGastos.Domain.Entities;

public sealed class Transacao
{
    public Guid Id { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public decimal Valor { get; set; }
    public TipoTransacao Tipo { get; set; }
    public Guid PessoaId { get; set; }
    public DateTime CriadoEm { get; set; }
    public Pessoa? Pessoa { get; set; }
}
