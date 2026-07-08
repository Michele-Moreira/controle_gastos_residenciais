using ControleGastos.Application.Abstractions;
using ControleGastos.Domain.Enums;
using ControleGastos.Domain.Models;

namespace ControleGastos.Application.Services;

public sealed class TotaisService : ITotaisService
{
    private readonly IPessoaRepository _pessoaRepository;
    private readonly ITransacaoRepository _transacaoRepository;

    public TotaisService(IPessoaRepository pessoaRepository, ITransacaoRepository transacaoRepository)
    {
        _pessoaRepository = pessoaRepository;
        _transacaoRepository = transacaoRepository;
    }

    public async Task<TotaisResumo> CalcularTotaisAsync(CancellationToken cancellationToken = default)
    {
        var pessoas = await _pessoaRepository.ListarAsync(cancellationToken);
        var transacoes = await _transacaoRepository.ListarAsync(cancellationToken);
        var resumo = new TotaisResumo();

        foreach (var pessoa in pessoas)
        {
            var transacoesDaPessoa = transacoes.Where(x => x.PessoaId == pessoa.Id);
            var totalReceitas = transacoesDaPessoa
                .Where(x => x.Tipo == TipoTransacao.Receita)
                .Sum(x => x.Valor);
            var totalDespesas = transacoesDaPessoa
                .Where(x => x.Tipo == TipoTransacao.Despesa)
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
