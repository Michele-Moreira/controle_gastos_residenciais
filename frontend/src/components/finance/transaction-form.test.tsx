import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { TransactionForm } from "@/components/finance/transaction-form";

const pessoa = {
	id: "318a5bbb-3ae4-43a2-a651-16bf151528a8",
	nome: "Maria",
	idade: 25,
};

const transacao = {
	id: "10ea748a-5e29-47dd-a262-635a4eb5439b",
	descricao: "Salário",
	valor: 1500,
	tipo: "receita" as const,
	pessoaId: pessoa.id,
};

describe("TransactionForm", () => {
	it("chama onSubmit ao enviar o formulário", async () => {
		const user = userEvent.setup();
		const onSubmit = vi.fn((event) => event.preventDefault());

		render(
			<TransactionForm
				descricao="Aluguel"
				valor="500"
				tipo="despesa"
				pessoaId={pessoa.id}
				pessoas={[pessoa]}
				transacoes={[]}
				onDescricaoChange={vi.fn()}
				onValorChange={vi.fn()}
				onTipoChange={vi.fn()}
				onPessoaIdChange={vi.fn()}
				onSubmit={onSubmit}
			/>,
		);

		await user.click(screen.getByRole("button", { name: "Salvar Transação" }));

		expect(onSubmit).toHaveBeenCalledTimes(1);
	});

	it("desabilita envio quando nenhuma pessoa está selecionada", () => {
		render(
			<TransactionForm
				descricao="Aluguel"
				valor="500"
				tipo="despesa"
				pessoaId=""
				pessoas={[pessoa]}
				transacoes={[]}
				onDescricaoChange={vi.fn()}
				onValorChange={vi.fn()}
				onTipoChange={vi.fn()}
				onPessoaIdChange={vi.fn()}
				onSubmit={vi.fn()}
			/>,
		);

		expect(screen.getByRole("button", { name: "Salvar Transação" })).toBeDisabled();
	});

	it("exibe transações cadastradas", () => {
		render(
			<TransactionForm
				descricao=""
				valor=""
				tipo="receita"
				pessoaId={pessoa.id}
				pessoas={[pessoa]}
				transacoes={[transacao]}
				onDescricaoChange={vi.fn()}
				onValorChange={vi.fn()}
				onTipoChange={vi.fn()}
				onPessoaIdChange={vi.fn()}
				onSubmit={vi.fn()}
			/>,
		);

		expect(screen.getByText("Salário · R$ 1500.00")).toBeInTheDocument();
	});
});
