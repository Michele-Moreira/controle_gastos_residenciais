using System.Net;
using System.Net.Http.Json;
using ControleGastos.Application.Dtos;
using ControleGastos.Tests.Support;
using FluentAssertions;

namespace ControleGastos.Tests;

public sealed class AuthEndpointsTests : IClassFixture<CustomWebApplicationFactory>
{
    private readonly HttpClient _client;

    public AuthEndpointsTests(CustomWebApplicationFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task Login_ComCredenciaisValidas_RetornaToken()
    {
        var response = await _client.PostAsJsonAsync("/auth/login", new LoginDto
        {
            Username = "admin",
            Password = "admin"
        });

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var body = await response.Content.ReadFromJsonAsync<LoginResponseDto>();
        body.Should().NotBeNull();
        body!.Token.Should().NotBeNullOrWhiteSpace();
    }

    [Fact]
    public async Task Login_ComCredenciaisInvalidas_RetornaUnauthorized()
    {
        var response = await _client.PostAsJsonAsync("/auth/login", new LoginDto
        {
            Username = "admin",
            Password = "wrong"
        });

        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }

    [Fact]
    public async Task Health_NaoRequerAutenticacao()
    {
        var response = await _client.GetAsync("/health");
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }
}
