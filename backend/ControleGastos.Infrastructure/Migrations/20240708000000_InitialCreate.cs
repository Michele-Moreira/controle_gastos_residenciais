using ControleGastos.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleGastos.Infrastructure.Migrations;

[DbContext(typeof(ControleGastosDbContext))]
[Migration("20240708000000_InitialCreate")]
public partial class InitialCreate : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "Pessoas",
            columns: table => new
            {
                Id = table.Column<Guid>(nullable: false),
                Nome = table.Column<string>(maxLength: 200, nullable: false),
                Idade = table.Column<int>(nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Pessoas", x => x.Id);
            });

        migrationBuilder.CreateTable(
            name: "Transacoes",
            columns: table => new
            {
                Id = table.Column<Guid>(nullable: false),
                Descricao = table.Column<string>(maxLength: 500, nullable: false),
                Valor = table.Column<decimal>(precision: 18, scale: 2, nullable: false),
                Tipo = table.Column<string>(maxLength: 20, nullable: false),
                PessoaId = table.Column<Guid>(nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Transacoes", x => x.Id);
                table.ForeignKey(
                    name: "FK_Transacoes_Pessoas_PessoaId",
                    column: x => x.PessoaId,
                    principalTable: "Pessoas",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateIndex(
            name: "IX_Transacoes_PessoaId",
            table: "Transacoes",
            column: "PessoaId");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(name: "Transacoes");
        migrationBuilder.DropTable(name: "Pessoas");
    }
}
