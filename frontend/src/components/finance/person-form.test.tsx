import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { PersonForm } from "@/components/finance/person-form";

describe("PersonForm", () => {
	it("chama onSubmit ao enviar o formulário", async () => {
		const user = userEvent.setup();
		const onSubmit = vi.fn((event) => event.preventDefault());

		render(
			<PersonForm
				nome="Maria"
				idade="25"
				pessoas={[]}
				onNomeChange={vi.fn()}
				onIdadeChange={vi.fn()}
				onSubmit={onSubmit}
				onExcluir={vi.fn()}
			/>,
		);

		await user.click(screen.getByRole("button", { name: "Salvar Pessoa" }));

		expect(onSubmit).toHaveBeenCalledTimes(1);
	});

	it("exibe pessoas cadastradas", () => {
		render(
			<PersonForm
				nome=""
				idade=""
				pessoas={[{ id: "1", nome: "João", idade: 30 }]}
				onNomeChange={vi.fn()}
				onIdadeChange={vi.fn()}
				onSubmit={vi.fn()}
				onExcluir={vi.fn()}
			/>,
		);

		expect(screen.getByText("João · 30 anos")).toBeInTheDocument();
	});

	it("expõe aria-label no botão de exclusão", () => {
		render(
			<PersonForm
				nome=""
				idade=""
				pessoas={[{ id: "1", nome: "João", idade: 30 }]}
				onNomeChange={vi.fn()}
				onIdadeChange={vi.fn()}
				onSubmit={vi.fn()}
				onExcluir={vi.fn()}
			/>,
		);

		expect(
			screen.getByRole("button", { name: "Excluir João" }),
		).toBeInTheDocument();
	});
});
