using System.Net;
using System.Net.Http.Json;
using ControleGastos.Application.Dtos;
using ControleGastos.Tests.Support;
using FluentAssertions;

namespace ControleGastos.Tests;

public sealed class PessoaEndpointsTests : IClassFixture<CustomWebApplicationFactory>
{
    private readonly HttpClient _client;

    public PessoaEndpointsTests(CustomWebApplicationFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task ListarPessoas_RequiresAuthentication()
    {
        var response = await _client.GetAsync("/pessoas");
        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }

    [Fact]
    public async Task CriarEListarPessoa_RetornaDadosEsperados()
    {
        await ApiTestClient.CreateAuthenticatedClientAsync(_client);

        var createResponse = await _client.PostAsJsonAsync("/pessoas", new CreatePessoaDto
        {
            Nome = "Maria",
            Idade = 25
        });

        createResponse.StatusCode.Should().Be(HttpStatusCode.Created);
        var created = await createResponse.Content.ReadFromJsonAsync<PessoaResponseDto>();
        created.Should().NotBeNull();
        created!.Nome.Should().Be("Maria");
        created.Idade.Should().Be(25);

        var listResponse = await _client.GetAsync("/pessoas");
        listResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        var pessoas = await listResponse.Content.ReadFromJsonAsync<List<PessoaResponseDto>>();
        pessoas.Should().Contain(p => p.Id == created.Id);
    }

    [Fact]
    public async Task CriarPessoa_ComDadosInvalidos_RetornaProblemDetails()
    {
        await ApiTestClient.CreateAuthenticatedClientAsync(_client);

        var response = await _client.PostAsJsonAsync("/pessoas", new CreatePessoaDto
        {
            Nome = "",
            Idade = 25
        });

        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        response.Content.Headers.ContentType?.MediaType.Should().Be("application/problem+json");

        var errors = await ApiTestClient.ReadValidationErrorsAsync(response);
        errors.Should().Contain("Nome é obrigatório.");
    }

    [Fact]
    public async Task DeletarPessoa_RemovePessoaECascade()
    {
        await ApiTestClient.CreateAuthenticatedClientAsync(_client);

        var pessoaResponse = await _client.PostAsJsonAsync("/pessoas", new CreatePessoaDto
        {
            Nome = "João",
            Idade = 30
        });
        var pessoa = await pessoaResponse.Content.ReadFromJsonAsync<PessoaResponseDto>();

        await _client.PostAsJsonAsync("/transacoes", new CreateTransacaoDto
        {
            Descricao = "Aluguel",
            Valor = 100,
            Tipo = "despesa",
            PessoaId = pessoa!.Id
        });

        var deleteResponse = await _client.DeleteAsync($"/pessoas/{pessoa.Id}");
        deleteResponse.StatusCode.Should().Be(HttpStatusCode.NoContent);

        var transacoesResponse = await _client.GetAsync("/transacoes");
        var transacoes = await transacoesResponse.Content.ReadFromJsonAsync<List<TransacaoResponseDto>>();
        transacoes.Should().NotContain(t => t.PessoaId == pessoa.Id);
    }
}
