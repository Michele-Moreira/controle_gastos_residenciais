using System;
using ControleGastos.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleGastos.Infrastructure.Migrations;

[DbContext(typeof(ControleGastosDbContext))]
[Migration("20240709000000_AddCriadoEmToTransacao")]
public partial class AddCriadoEmToTransacao : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<DateTime>(
            name: "CriadoEm",
            table: "Transacoes",
            type: "TEXT",
            nullable: false,
            defaultValue: new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc));

        migrationBuilder.CreateIndex(
            name: "IX_Transacoes_CriadoEm",
            table: "Transacoes",
            column: "CriadoEm");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropIndex(
            name: "IX_Transacoes_CriadoEm",
            table: "Transacoes");

        migrationBuilder.DropColumn(
            name: "CriadoEm",
            table: "Transacoes");
    }
}
