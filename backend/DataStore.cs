using System.Text.Json;
using System.Text.Json.Serialization;
using ControleGastos.Api.Models;

namespace ControleGastos.Api.Services;

/// <summary>
/// Responsável por armazenar e recuperar os dados de pessoas e transações em arquivos JSON.
/// </summary>
public sealed class DataStore
{
    private readonly string _dataFolder;
    private readonly string _pessoasFile;
    private readonly string _transacoesFile;
    private readonly SemaphoreSlim _mutex = new(1, 1);
    private readonly JsonSerializerOptions _jsonOptions = new(JsonSerializerDefaults.Web)
    {
        WriteIndented = true,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
    };

    public List<Pessoa> Pessoas { get; private set; }
    public List<Transacao> Transacoes { get; private set; }

    public DataStore()
    {
        _dataFolder = Path.Combine(AppContext.BaseDirectory, "Data");
        _pessoasFile = Path.Combine(_dataFolder, "pessoas.json");
        _transacoesFile = Path.Combine(_dataFolder, "transacoes.json");

        GarantirStorage();
        Pessoas = CarregarLista<Pessoa>(_pessoasFile);
        Transacoes = CarregarLista<Transacao>(_transacoesFile);
    }

    private void GarantirStorage()
    {
        Directory.CreateDirectory(_dataFolder);
        if (!File.Exists(_pessoasFile))
        {
            File.WriteAllText(_pessoasFile, "[]");
        }

        if (!File.Exists(_transacoesFile))
        {
            File.WriteAllText(_transacoesFile, "[]");
        }
    }

    private List<T> CarregarLista<T>(string path)
    {
        var content = File.ReadAllText(path);
        return JsonSerializer.Deserialize<List<T>>(content, _jsonOptions) ?? new List<T>();
    }

    private async Task SalvarArquivoAsync<T>(string path, List<T> items)
    {
        var text = JsonSerializer.Serialize(items, _jsonOptions);
        await File.WriteAllTextAsync(path, text);
    }

    /// <summary>
    /// Persiste as listas de pessoas e transações no disco.
    /// </summary>
    public async Task SaveChangesAsync()
    {
        await _mutex.WaitAsync();
        try
        {
            await SalvarArquivoAsync(_pessoasFile, Pessoas);
            await SalvarArquivoAsync(_transacoesFile, Transacoes);
        }
        finally
        {
            _mutex.Release();
        }
    }
}
