using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using ControleGastos.Application.Dtos;
using FluentAssertions;

namespace ControleGastos.Tests.Support;

public static class ApiTestClient
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    public static async Task<HttpClient> CreateAuthenticatedClientAsync(HttpClient client)
    {
        var loginResponse = await client.PostAsJsonAsync("/auth/login", new LoginDto
        {
            Username = "admin",
            Password = "admin"
        });

        loginResponse.EnsureSuccessStatusCode();
        var login = await loginResponse.Content.ReadFromJsonAsync<LoginResponseDto>(JsonOptions);
        login.Should().NotBeNull();

        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", login!.Token);
        return client;
    }

    public static async Task<string[]> ReadValidationErrorsAsync(HttpResponseMessage response)
    {
        var json = await response.Content.ReadAsStringAsync();
        using var document = JsonDocument.Parse(json);
        var root = document.RootElement;

        if (root.TryGetProperty("errors", out var errorsElement))
        {
            if (errorsElement.ValueKind == JsonValueKind.Array)
            {
                return errorsElement.Deserialize<string[]>(JsonOptions) ?? [];
            }

            if (errorsElement.ValueKind == JsonValueKind.Object)
            {
                return errorsElement.EnumerateObject()
                    .SelectMany(property => property.Value.Deserialize<string[]>(JsonOptions) ?? [])
                    .ToArray();
            }
        }

        if (root.TryGetProperty("title", out var titleElement))
        {
            return [titleElement.GetString() ?? "Erro de validação"];
        }

        return [];
    }
}
