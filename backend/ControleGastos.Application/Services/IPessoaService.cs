using ControleGastos.Application.Dtos;
using ControleGastos.Domain.Entities;

namespace ControleGastos.Application.Services;

public interface IPessoaService
{
    Task<List<PessoaResponseDto>> ListarAsync(CancellationToken cancellationToken = default);
    Task<PessoaResponseDto> CriarAsync(CreatePessoaDto dto, CancellationToken cancellationToken = default);
    Task<bool> DeletarAsync(Guid id, CancellationToken cancellationToken = default);
}
