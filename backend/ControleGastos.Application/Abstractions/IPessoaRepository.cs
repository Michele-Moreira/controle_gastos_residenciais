using ControleGastos.Domain.Entities;

namespace ControleGastos.Application.Abstractions;

public interface IPessoaRepository
{
    Task<List<Pessoa>> ListarAsync(CancellationToken cancellationToken = default);
    Task<Pessoa?> ObterPorIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task AdicionarAsync(Pessoa pessoa, CancellationToken cancellationToken = default);
    Task RemoverAsync(Pessoa pessoa, CancellationToken cancellationToken = default);
}
