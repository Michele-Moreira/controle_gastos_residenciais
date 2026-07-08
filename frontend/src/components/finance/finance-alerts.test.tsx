import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FinanceAlerts } from "@/components/finance/finance-alerts";

describe("FinanceAlerts", () => {
	it("renderiza mensagem de erro quando informada", () => {
		render(<FinanceAlerts error="Erro ao salvar" success="" />);
		expect(screen.getByRole("alert")).toHaveTextContent("Erro ao salvar");
	});

	it("renderiza mensagem de sucesso quando informada", () => {
		render(<FinanceAlerts error="" success="Salvo com sucesso" />);
		expect(screen.getByRole("status")).toHaveTextContent("Salvo com sucesso");
	});

	it("não renderiza alertas quando mensagens estão vazias", () => {
		render(<FinanceAlerts error="" success="" />);
		expect(screen.queryByRole("alert")).not.toBeInTheDocument();
		expect(screen.queryByRole("status")).not.toBeInTheDocument();
	});});
