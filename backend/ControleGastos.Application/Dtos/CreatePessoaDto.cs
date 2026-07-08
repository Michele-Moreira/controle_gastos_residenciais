namespace ControleGastos.Application.Dtos;

public sealed class CreatePessoaDto
{
    public string Nome { get; set; } = string.Empty;
    public int? Idade { get; set; }
}
