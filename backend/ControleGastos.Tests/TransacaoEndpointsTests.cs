using System.Net;
using System.Net.Http.Json;
using ControleGastos.Application.Dtos;
using FluentAssertions;

namespace ControleGastos.Tests;

public sealed class TransacaoEndpointsTests : IClassFixture<CustomWebApplicationFactory>
{
    private readonly HttpClient _client;

    public TransacaoEndpointsTests(CustomWebApplicationFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task MenorDeIdade_NaoPodeRegistrarReceita()
    {
        var pessoaResponse = await _client.PostAsJsonAsync("/pessoas", new CreatePessoaDto
        {
            Nome = "Carlos",
            Idade = 15
        });
        var pessoa = await pessoaResponse.Content.ReadFromJsonAsync<PessoaResponseDto>();

        var response = await _client.PostAsJsonAsync("/transacoes", new CreateTransacaoDto
        {
            Descricao = "Mesada",
            Valor = 50,
            Tipo = "receita",
            PessoaId = pessoa!.Id
        });

        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        response.Content.Headers.ContentType?.MediaType.Should().Be("application/problem+json");
    }

    [Fact]
    public async Task MenorDeIdade_PodeRegistrarDespesa()
    {
        var pessoaResponse = await _client.PostAsJsonAsync("/pessoas", new CreatePessoaDto
        {
            Nome = "Ana",
            Idade = 16
        });
        var pessoa = await pessoaResponse.Content.ReadFromJsonAsync<PessoaResponseDto>();

        var response = await _client.PostAsJsonAsync("/transacoes", new CreateTransacaoDto
        {
            Descricao = "Lanche",
            Valor = 20,
            Tipo = "despesa",
            PessoaId = pessoa!.Id
        });

        response.StatusCode.Should().Be(HttpStatusCode.Created);
    }

    [Fact]
    public async Task CriarTransacao_ComPessoaInexistente_RetornaBadRequest()
    {
        var response = await _client.PostAsJsonAsync("/transacoes", new CreateTransacaoDto
        {
            Descricao = "Teste",
            Valor = 10,
            Tipo = "despesa",
            PessoaId = Guid.NewGuid()
        });

        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }
}
