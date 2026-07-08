namespace ControleGastos.Domain.Enums;

public enum TipoTransacao
{
    Receita,
    Despesa
}

public static class TipoTransacaoExtensions
{
    public static string ToApiValue(this TipoTransacao tipo) =>
        tipo == TipoTransacao.Receita ? "receita" : "despesa";

    public static TipoTransacao FromApiValue(string value)
    {
        var normalized = value.Trim().ToLowerInvariant();
        return normalized switch
        {
            "receita" => TipoTransacao.Receita,
            "despesa" => TipoTransacao.Despesa,
            _ => throw new ArgumentException("Tipo de transação deve ser 'receita' ou 'despesa'.")
        };
    }
}
