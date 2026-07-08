import { describe, expect, it } from "vitest";

import {
	criarPessoaFormSchema,
	criarPessoaPayloadSchema,
	criarTransacaoFormSchema,
	criarTransacaoPayloadSchema,
	pessoaSchema,
	transacaoSchema,
} from "@/lib/schemas";

describe("schemas", () => {
	it("rejeita pessoa com id inválido", () => {
		const result = pessoaSchema.safeParse({
			id: "invalido",
			nome: "Maria",
			idade: 20,
		});

		expect(result.success).toBe(false);
	});

	it("aceita transação válida", () => {
		const result = transacaoSchema.safeParse({
			id: "10ea748a-5e29-47dd-a262-635a4eb5439b",
			descricao: "Salário",
			valor: 3500,
			tipo: "receita",
			pessoaId: "318a5bbb-3ae4-43a2-a651-16bf151528a8",
		});

		expect(result.success).toBe(true);
	});

	it("rejeita transação com tipo inválido", () => {
		const result = transacaoSchema.safeParse({
			id: "10ea748a-5e29-47dd-a262-635a4eb5439b",
			descricao: "Salário",
			valor: 3500,
			tipo: "outro",
			pessoaId: "318a5bbb-3ae4-43a2-a651-16bf151528a8",
		});

		expect(result.success).toBe(false);
	});

	it("aceita payload de criação de pessoa válido", () => {
		const result = criarPessoaPayloadSchema.safeParse({
			nome: "Maria",
			idade: 25,
		});

		expect(result.success).toBe(true);
	});

	it("rejeita payload de criação de pessoa com idade fora do limite", () => {
		const result = criarPessoaPayloadSchema.safeParse({
			nome: "Maria",
			idade: 250,
		});

		expect(result.success).toBe(false);
	});

	it("aceita payload de criação de transação válido", () => {
		const result = criarTransacaoPayloadSchema.safeParse({
			descricao: "Aluguel",
			valor: 1200,
			tipo: "despesa",
			pessoaId: "318a5bbb-3ae4-43a2-a651-16bf151528a8",
		});

		expect(result.success).toBe(true);
	});

	it("rejeita formulário de pessoa com nome vazio", () => {
		const result = criarPessoaFormSchema.safeParse({
			nome: "   ",
			idade: "25",
		});

		expect(result.success).toBe(false);
	});

	it("converte formulário de transação para valores numéricos", () => {
		const result = criarTransacaoFormSchema.safeParse({
			descricao: "Salário",
			valor: "3500.50",
			tipo: "receita",
			pessoaId: "318a5bbb-3ae4-43a2-a651-16bf151528a8",
		});

		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.valor).toBe(3500.5);
		}
	});
});
