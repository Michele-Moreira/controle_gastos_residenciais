using ControleGastos.Application.Abstractions;
using ControleGastos.Domain.Entities;
using ControleGastos.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Infrastructure.Repositories;

public sealed class TransacaoRepository : ITransacaoRepository
{
    private readonly ControleGastosDbContext _context;

    public TransacaoRepository(ControleGastosDbContext context)
    {
        _context = context;
    }

    public Task<List<Transacao>> ListarAsync(CancellationToken cancellationToken = default) =>
        _context.Transacoes.AsNoTracking().OrderByDescending(x => x.CriadoEm).ToListAsync(cancellationToken);

    public Task<List<Transacao>> ListarPorPessoaAsync(Guid pessoaId, CancellationToken cancellationToken = default) =>
        _context.Transacoes.AsNoTracking().Where(x => x.PessoaId == pessoaId).ToListAsync(cancellationToken);

    public async Task AdicionarAsync(Transacao transacao, CancellationToken cancellationToken = default)
    {
        await _context.Transacoes.AddAsync(transacao, cancellationToken);
    }

    public async Task RemoverPorPessoaAsync(Guid pessoaId, CancellationToken cancellationToken = default)
    {
        var transacoes = await _context.Transacoes
            .Where(x => x.PessoaId == pessoaId)
            .ToListAsync(cancellationToken);

        _context.Transacoes.RemoveRange(transacoes);
    }
}
