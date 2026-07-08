using ControleGastos.Application.Abstractions;
using ControleGastos.Domain.Entities;
using ControleGastos.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Infrastructure.Repositories;

public sealed class PessoaRepository : IPessoaRepository
{
    private readonly ControleGastosDbContext _context;

    public PessoaRepository(ControleGastosDbContext context)
    {
        _context = context;
    }

    public Task<List<Pessoa>> ListarAsync(CancellationToken cancellationToken = default) =>
        _context.Pessoas.AsNoTracking().OrderBy(x => x.Nome).ToListAsync(cancellationToken);

    public Task<Pessoa?> ObterPorIdAsync(Guid id, CancellationToken cancellationToken = default) =>
        _context.Pessoas.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

    public async Task AdicionarAsync(Pessoa pessoa, CancellationToken cancellationToken = default)
    {
        await _context.Pessoas.AddAsync(pessoa, cancellationToken);
    }

    public Task RemoverAsync(Pessoa pessoa, CancellationToken cancellationToken = default)
    {
        _context.Pessoas.Remove(pessoa);
        return Task.CompletedTask;
    }
}
