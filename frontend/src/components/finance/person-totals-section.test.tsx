import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PersonTotalsSection } from "@/components/finance/person-totals-section";

describe("PersonTotalsSection", () => {
	it("exibe mensagem quando não há pessoas", () => {
		render(<PersonTotalsSection pessoas={[]} />);

		expect(
			screen.getByText(
				"Cadastre pessoas e transações para visualizar os totais individuais.",
			),
		).toBeInTheDocument();
	});

	it("exibe totais por pessoa", () => {
		render(
			<PersonTotalsSection
				pessoas={[
					{
						pessoaId: "318a5bbb-3ae4-43a2-a651-16bf151528a8",
						nome: "Maria",
						totalReceitas: 1000,
						totalDespesas: 300,
						saldo: 700,
					},
				]}
			/>,
		);

		expect(screen.getByText("Maria")).toBeInTheDocument();
		expect(screen.getByText("Receitas: R$ 1000.00")).toBeInTheDocument();
		expect(screen.getByText("Despesas: R$ 300.00")).toBeInTheDocument();
		expect(screen.getByText("Saldo: R$ 700.00")).toBeInTheDocument();
	});
});
