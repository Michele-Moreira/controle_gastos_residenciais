using ControleGastos.Application.Abstractions;
using ControleGastos.Application.Dtos;
using ControleGastos.Domain.Entities;
using Microsoft.Extensions.Logging;

namespace ControleGastos.Application.Services;

public sealed class PessoaService : IPessoaService
{
    private readonly IPessoaRepository _pessoaRepository;
    private readonly ITransacaoRepository _transacaoRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<PessoaService> _logger;

    public PessoaService(
        IPessoaRepository pessoaRepository,
        ITransacaoRepository transacaoRepository,
        IUnitOfWork unitOfWork,
        ILogger<PessoaService> logger)
    {
        _pessoaRepository = pessoaRepository;
        _transacaoRepository = transacaoRepository;
        _unitOfWork = unitOfWork;
        _logger = logger;
    }

    public async Task<List<PessoaResponseDto>> ListarAsync(CancellationToken cancellationToken = default)
    {
        var pessoas = await _pessoaRepository.ListarAsync(cancellationToken);
        return pessoas.Select(MapToResponse).ToList();
    }

    public async Task<PessoaResponseDto> CriarAsync(CreatePessoaDto dto, CancellationToken cancellationToken = default)
    {
        var pessoa = new Pessoa
        {
            Id = Guid.NewGuid(),
            Nome = dto.Nome.Trim(),
            Idade = dto.Idade!.Value
        };

        await _pessoaRepository.AdicionarAsync(pessoa, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Pessoa criada {PessoaId} {Nome}", pessoa.Id, pessoa.Nome);
        return MapToResponse(pessoa);
    }

    public async Task<bool> DeletarAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var pessoa = await _pessoaRepository.ObterPorIdAsync(id, cancellationToken);
        if (pessoa is null)
        {
            return false;
        }

        await _transacaoRepository.RemoverPorPessoaAsync(id, cancellationToken);
        await _pessoaRepository.RemoverAsync(pessoa, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Pessoa removida {PessoaId}", id);
        return true;
    }

    private static PessoaResponseDto MapToResponse(Pessoa pessoa) => new()
    {
        Id = pessoa.Id,
        Nome = pessoa.Nome,
        Idade = pessoa.Idade
    };
}
