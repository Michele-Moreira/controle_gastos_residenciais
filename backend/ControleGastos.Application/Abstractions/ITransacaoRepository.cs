using ControleGastos.Domain.Entities;

namespace ControleGastos.Application.Abstractions;

public interface ITransacaoRepository
{
    Task<List<Transacao>> ListarAsync(CancellationToken cancellationToken = default);
    Task<List<Transacao>> ListarPorPessoaAsync(Guid pessoaId, CancellationToken cancellationToken = default);
    Task AdicionarAsync(Transacao transacao, CancellationToken cancellationToken = default);
    Task RemoverPorPessoaAsync(Guid pessoaId, CancellationToken cancellationToken = default);
}
