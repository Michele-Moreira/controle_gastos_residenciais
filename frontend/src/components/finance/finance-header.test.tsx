import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FinanceHeader } from "@/components/finance/finance-header";

const totais = {
	pessoas: [],
	totalReceitas: 1000,
	totalDespesas: 400,
	saldoLiquido: 600,
};

describe("FinanceHeader", () => {
	it("renderiza o título principal", () => {
		render(<FinanceHeader totais={null} />);

		expect(
			screen.getByRole("heading", {
				name: "Gerencie pessoas, receitas e despesas em um só lugar.",
			}),
		).toBeInTheDocument();
	});

	it("exibe totais quando informados", () => {
		render(<FinanceHeader totais={totais} />);

		expect(screen.getByText("R$ 1000.00")).toBeInTheDocument();
		expect(screen.getByText("R$ 400.00")).toBeInTheDocument();
		expect(screen.getByText("R$ 600.00")).toBeInTheDocument();
	});

	it("não exibe cards de totais quando totais é null", () => {
		render(<FinanceHeader totais={null} />);

		expect(screen.queryByText("Receitas")).not.toBeInTheDocument();
		expect(screen.queryByText("Despesas")).not.toBeInTheDocument();
		expect(screen.queryByText("Saldo")).not.toBeInTheDocument();
	});
});
