using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ControleGastos.Application.Dtos;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace ControleGastos.Infrastructure.Auth;

public interface IJwtTokenService
{
    LoginResponseDto? Authenticate(string username, string password);
    string GenerateToken(string username);
}

public sealed class JwtTokenService : IJwtTokenService
{
    private readonly JwtSettings _jwtSettings;
    private readonly AuthSettings _authSettings;

    public JwtTokenService(IOptions<JwtSettings> jwtSettings, IOptions<AuthSettings> authSettings)
    {
        _jwtSettings = jwtSettings.Value;
        _authSettings = authSettings.Value;
    }

    public LoginResponseDto? Authenticate(string username, string password)
    {
        if (username != _authSettings.Username || password != _authSettings.Password)
        {
            return null;
        }

        return new LoginResponseDto
        {
            Token = GenerateToken(username),
            ExpiresAt = DateTime.UtcNow.AddMinutes(_jwtSettings.ExpirationMinutes)
        };
    }

    public string GenerateToken(string username)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, username),
            new Claim(JwtRegisteredClaimNames.Sub, username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: _jwtSettings.Issuer,
            audience: _jwtSettings.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_jwtSettings.ExpirationMinutes),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
