using ControleGastos.Domain.Entities;
using ControleGastos.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Infrastructure.Data;

public sealed class ControleGastosDbContext : DbContext
{
    public ControleGastosDbContext(DbContextOptions<ControleGastosDbContext> options)
        : base(options)
    {
    }

    public DbSet<Pessoa> Pessoas => Set<Pessoa>();
    public DbSet<Transacao> Transacoes => Set<Transacao>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Pessoa>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Nome).HasMaxLength(200).IsRequired();
            entity.Property(x => x.Idade).IsRequired();
            entity.HasMany(x => x.Transacoes)
                .WithOne(x => x.Pessoa)
                .HasForeignKey(x => x.PessoaId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Transacao>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Descricao).HasMaxLength(500).IsRequired();
            entity.Property(x => x.Valor).HasPrecision(18, 2);
            entity.Property(x => x.Tipo)
                .HasConversion(
                    v => v.ToApiValue(),
                    v => TipoTransacaoExtensions.FromApiValue(v))
                .HasMaxLength(20)
                .IsRequired();
            entity.Property(x => x.CriadoEm).IsRequired();
            entity.HasIndex(x => x.PessoaId);
            entity.HasIndex(x => x.CriadoEm);
        });
    }
}
