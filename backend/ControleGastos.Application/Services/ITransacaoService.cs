using ControleGastos.Application.Dtos;

namespace ControleGastos.Application.Services;

public interface ITransacaoService
{
    Task<List<TransacaoResponseDto>> ListarAsync(CancellationToken cancellationToken = default);
    Task<TransacaoResponseDto> CriarAsync(CreateTransacaoDto dto, CancellationToken cancellationToken = default);
}
