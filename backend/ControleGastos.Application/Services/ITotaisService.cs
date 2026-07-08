using ControleGastos.Domain.Models;

namespace ControleGastos.Application.Services;

public interface ITotaisService
{
    Task<TotaisResumo> CalcularTotaisAsync(CancellationToken cancellationToken = default);
}
