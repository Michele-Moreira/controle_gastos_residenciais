import { afterEach, describe, expect, it, vi } from "vitest";

import { criarPessoa, listarPessoas } from "@/lib/api";

const pessoa = {
	id: "318a5bbb-3ae4-43a2-a651-16bf151528a8",
	nome: "Maria",
	idade: 25,
};

afterEach(() => {
	vi.restoreAllMocks();
});

describe("api", () => {
	it("lança erro quando a resposta HTTP falha com ProblemDetails", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				ok: false,
				status: 500,
				headers: {
					get: () => "application/problem+json",
				},
				json: async () => ({ title: "Erro no servidor" }),
			}),
		);

		await expect(listarPessoas()).rejects.toThrow("Erro no servidor");
	});

	it("lança erro quando a resposta JSON é inválida", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				ok: true,
				status: 200,
				headers: { get: () => "application/json" },
				json: async () => [{ id: "invalido", nome: "Maria", idade: 25 }],
			}),
		);

		await expect(listarPessoas()).rejects.toThrow("Resposta inválida (listarPessoas)");
	});

	it("cria pessoa com payload válido", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				ok: true,
				status: 200,
				headers: { get: () => "application/json" },
				json: async () => pessoa,
			}),
		);

		const result = await criarPessoa({ nome: "Maria", idade: 25 });

		expect(result).toEqual(pessoa);
	});

	it("rejeita payload inválido ao criar pessoa", async () => {
		vi.stubGlobal("fetch", vi.fn());

		await expect(criarPessoa({ nome: "", idade: 25 })).rejects.toThrow(
			"Resposta inválida (criarPessoa)",
		);
		expect(fetch).not.toHaveBeenCalled();
	});
});
