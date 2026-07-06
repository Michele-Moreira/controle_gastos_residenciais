using ControleGastos.Api.Dtos;
using ControleGastos.Api.Models;

namespace ControleGastos.Api.Services;

/// <summary>
/// Serviço de domínio responsável pelos cadastros e exclusões de pessoas.
/// </summary>
public sealed class PessoaService
{
    private readonly DataStore _dataStore;

    public PessoaService(DataStore dataStore)
    {
        _dataStore = dataStore;
    }

    public List<Pessoa> ObterTodas() => _dataStore.Pessoas;

    public async Task<Pessoa> CriarAsync(CreatePessoaDto dto)
    {
        var pessoa = new Pessoa
        {
            Id = Guid.NewGuid(),
            Nome = dto.Nome.Trim(),
            Idade = dto.Idade.Value
        };

        _dataStore.Pessoas.Add(pessoa);
        await _dataStore.SaveChangesAsync();
        return pessoa;
    }

    public async Task<bool> DeletarAsync(Guid id)
    {
        var pessoa = _dataStore.Pessoas.FirstOrDefault(x => x.Id == id);
        if (pessoa is null)
        {
            return false;
        }

        _dataStore.Pessoas.Remove(pessoa);
        _dataStore.Transacoes.RemoveAll(x => x.PessoaId == id);
        await _dataStore.SaveChangesAsync();
        return true;
    }
}

/// <summary>
/// Serviço de domínio responsável pelo cadastro e listagem de transações.
/// </summary>
public sealed class TransacaoService
{
    private readonly DataStore _dataStore;

    public TransacaoService(DataStore dataStore)
    {
        _dataStore = dataStore;
    }

    public List<Transacao> ObterTodas() => _dataStore.Transacoes;

    public async Task<Transacao> CriarAsync(CreateTransacaoDto dto)
    {
        var pessoa = _dataStore.Pessoas.FirstOrDefault(x => x.Id == dto.PessoaId);
        if (pessoa is null)
        {
            throw new InvalidOperationException("Pessoa informada não existe.");
        }

        var tipoNormalizado = dto.Tipo.Trim().ToLowerInvariant();
        if (tipoNormalizado != "receita" && tipoNormalizado != "despesa")
        {
            throw new InvalidOperationException("Tipo de transação deve ser 'receita' ou 'despesa'.");
        }

        if (pessoa.Idade < 18 && tipoNormalizado == "receita")
        {
            throw new InvalidOperationException("Pessoa menor de idade só pode registrar despesas.");
        }

        var transacao = new Transacao
        {
            Id = Guid.NewGuid(),
            Descricao = dto.Descricao.Trim(),
            Valor = dto.Valor,
            Tipo = tipoNormalizado,
            PessoaId = dto.PessoaId
        };

        _dataStore.Transacoes.Add(transacao);
        await _dataStore.SaveChangesAsync();
        return transacao;
    }
}

/// <summary>
/// Serviço responsável pelo cálculo de totais por pessoa e do total geral.
/// </summary>
public sealed class TotaisService
{
    private readonly DataStore _dataStore;

    public TotaisService(DataStore dataStore)
    {
        _dataStore = dataStore;
    }

    public TotaisResumo CalcularTotais()
    {
        var resumo = new TotaisResumo();

        foreach (var pessoa in _dataStore.Pessoas)
        {
            var transacoesDaPessoa = _dataStore.Transacoes.Where(x => x.PessoaId == pessoa.Id);
            var totalReceitas = transacoesDaPessoa
                .Where(x => x.Tipo == "receita")
                .Sum(x => x.Valor);
            var totalDespesas = transacoesDaPessoa
                .Where(x => x.Tipo == "despesa")
                .Sum(x => x.Valor);

            resumo.Pessoas.Add(new TotaisPessoa
            {
                PessoaId = pessoa.Id,
                Nome = pessoa.Nome,
                TotalReceitas = totalReceitas,
                TotalDespesas = totalDespesas
            });

            resumo.TotalReceitas += totalReceitas;
            resumo.TotalDespesas += totalDespesas;
        }

        return resumo;
    }
}
