using ControleGastos.Application.Abstractions;
using ControleGastos.Application.Dtos;
using ControleGastos.Domain.Entities;
using ControleGastos.Domain.Enums;
using ControleGastos.Domain.Exceptions;
using Microsoft.Extensions.Logging;

namespace ControleGastos.Application.Services;

public sealed class TransacaoService : ITransacaoService
{
    private readonly IPessoaRepository _pessoaRepository;
    private readonly ITransacaoRepository _transacaoRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<TransacaoService> _logger;

    public TransacaoService(
        IPessoaRepository pessoaRepository,
        ITransacaoRepository transacaoRepository,
        IUnitOfWork unitOfWork,
        ILogger<TransacaoService> logger)
    {
        _pessoaRepository = pessoaRepository;
        _transacaoRepository = transacaoRepository;
        _unitOfWork = unitOfWork;
        _logger = logger;
    }

    public async Task<List<TransacaoResponseDto>> ListarAsync(CancellationToken cancellationToken = default)
    {
        var transacoes = await _transacaoRepository.ListarAsync(cancellationToken);
        return transacoes.Select(MapToResponse).ToList();
    }

    public async Task<TransacaoResponseDto> CriarAsync(CreateTransacaoDto dto, CancellationToken cancellationToken = default)
    {
        var pessoa = await _pessoaRepository.ObterPorIdAsync(dto.PessoaId, cancellationToken);
        if (pessoa is null)
        {
            throw new DomainException("Pessoa informada não existe.");
        }

        var tipo = TipoTransacaoExtensions.FromApiValue(dto.Tipo);

        if (pessoa.Idade < 18 && tipo == TipoTransacao.Receita)
        {
            throw new DomainException("Pessoa menor de idade só pode registrar despesas.");
        }

        var transacao = new Transacao
        {
            Id = Guid.NewGuid(),
            Descricao = dto.Descricao.Trim(),
            Valor = dto.Valor,
            Tipo = tipo,
            PessoaId = dto.PessoaId,
            CriadoEm = DateTime.UtcNow
        };

        await _transacaoRepository.AdicionarAsync(transacao, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        _logger.LogInformation(
            "Transação criada {TransacaoId} para pessoa {PessoaId}",
            transacao.Id,
            transacao.PessoaId);

        return MapToResponse(transacao);
    }

    private static TransacaoResponseDto MapToResponse(Transacao transacao) => new()
    {
        Id = transacao.Id,
        Descricao = transacao.Descricao,
        Valor = transacao.Valor,
        Tipo = transacao.Tipo.ToApiValue(),
        PessoaId = transacao.PessoaId
    };
}
