namespace ControleGastos.Infrastructure.Auth;

public sealed class AuthSettings
{
    public const string SectionName = "Auth";

    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
