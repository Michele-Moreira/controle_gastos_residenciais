using ControleGastos.Application.Abstractions;
using ControleGastos.Infrastructure.Data;

namespace ControleGastos.Infrastructure.Repositories;

public sealed class UnitOfWork : IUnitOfWork
{
    private readonly ControleGastosDbContext _context;

    public UnitOfWork(ControleGastosDbContext context)
    {
        _context = context;
    }

    public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default) =>
        _context.SaveChangesAsync(cancellationToken);
}
