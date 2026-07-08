using ControleGastos.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ControleGastos.Infrastructure.Migrations;

[DbContext(typeof(ControleGastosDbContext))]
partial class ControleGastosDbContextModelSnapshot : ModelSnapshot
{
    protected override void BuildModel(ModelBuilder modelBuilder)
    {
#pragma warning disable 612, 618
        modelBuilder.HasAnnotation("ProductVersion", "8.0.11");

        modelBuilder.Entity("ControleGastos.Domain.Entities.Pessoa", b =>
            {
                b.Property<Guid>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("TEXT");

                b.Property<int>("Idade")
                    .HasColumnType("INTEGER");

                b.Property<string>("Nome")
                    .IsRequired()
                    .HasMaxLength(200)
                    .HasColumnType("TEXT");

                b.HasKey("Id");

                b.ToTable("Pessoas");
            });

        modelBuilder.Entity("ControleGastos.Domain.Entities.Transacao", b =>
            {
                b.Property<Guid>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("TEXT");

                b.Property<DateTime>("CriadoEm")
                    .HasColumnType("TEXT");

                b.Property<string>("Descricao")
                    .IsRequired()
                    .HasMaxLength(500)
                    .HasColumnType("TEXT");

                b.Property<Guid>("PessoaId")
                    .HasColumnType("TEXT");

                b.Property<string>("Tipo")
                    .IsRequired()
                    .HasMaxLength(20)
                    .HasColumnType("TEXT");

                b.Property<decimal>("Valor")
                    .HasPrecision(18, 2)
                    .HasColumnType("TEXT");

                b.HasKey("Id");

                b.HasIndex("CriadoEm");

                b.HasIndex("PessoaId");

                b.ToTable("Transacoes");
            });

        modelBuilder.Entity("ControleGastos.Domain.Entities.Transacao", b =>
            {
                b.HasOne("ControleGastos.Domain.Entities.Pessoa", "Pessoa")
                    .WithMany("Transacoes")
                    .HasForeignKey("PessoaId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Pessoa");
            });

        modelBuilder.Entity("ControleGastos.Domain.Entities.Pessoa", b =>
            {
                b.Navigation("Transacoes");
            });
#pragma warning restore 612, 618
    }
}
