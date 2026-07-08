import { act, renderHook, waitFor } from "@testing-library/react";
import type { FormEvent } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useFinancePage } from "@/hooks/use-finance-page";

const pessoa = {
	id: "318a5bbb-3ae4-43a2-a651-16bf151528a8",
	nome: "Maria",
	idade: 19,
};

const totais = {
	pessoas: [
		{
			pessoaId: pessoa.id,
			nome: pessoa.nome,
			totalReceitas: 100,
			totalDespesas: 50,
			saldo: 50,
		},
	],
	totalReceitas: 100,
	totalDespesas: 50,
	saldoLiquido: 50,
};

function createSubmitEvent(): FormEvent<HTMLFormElement> {
	return { preventDefault: vi.fn() } as unknown as FormEvent<HTMLFormElement>;
}

function stubPendingFetch() {
	vi.stubGlobal(
		"fetch",
		vi.fn(() => new Promise<Response>(() => {})),
	);
}

afterEach(() => {
	vi.restoreAllMocks();
});

describe("useFinancePage", () => {
	it("inicia com estados vazios", () => {
		stubPendingFetch();

		const { result } = renderHook(() => useFinancePage());

		expect(result.current.pessoas).toEqual([]);
		expect(result.current.transacoes).toEqual([]);
		expect(result.current.totais).toBeNull();
		expect(result.current.error).toBe("");
	});

	it("define erro quando o carregamento falha", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				ok: false,
				status: 500,
				headers: {
					get: () => "text/plain",
				},
				text: async () => "Falha no servidor",
			}),
		);

		const { result } = renderHook(() => useFinancePage());

		await waitFor(() => {
			expect(result.current.error).toBe("Falha no servidor");
		});
	});

	it("não atualiza estado após desmontagem durante o carregamento", async () => {
		let resolveFetch: (value: Response) => void = () => {};
		const fetchPromise = new Promise<Response>((resolve) => {
			resolveFetch = resolve;
		});

		vi.stubGlobal("fetch", vi.fn().mockReturnValue(fetchPromise));

		const { unmount } = renderHook(() => useFinancePage());
		unmount();

		resolveFetch({
			ok: true,
			status: 200,
			json: async () => [pessoa],
		} as Response);

		await expect(fetchPromise).resolves.toBeDefined();
	});

	it("carrega dados com sucesso", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockImplementation((url: string) => {
				if (url.endsWith("/pessoas")) {
					return Promise.resolve({
						ok: true,
						status: 200,
						json: async () => [pessoa],
					});
				}
				if (url.endsWith("/transacoes")) {
					return Promise.resolve({
						ok: true,
						status: 200,
						json: async () => [],
					});
				}
				if (url.endsWith("/totais")) {
					return Promise.resolve({
						ok: true,
						status: 200,
						json: async () => totais,
					});
				}
				return Promise.reject(new Error(`URL inesperada: ${url}`));
			}),
		);

		const { result } = renderHook(() => useFinancePage());

		await waitFor(() => {
			expect(result.current.pessoas).toHaveLength(1);
			expect(result.current.totais?.saldoLiquido).toBe(50);
		});
	});

	it("redefine pessoaId quando a pessoa selecionada é removida", async () => {
		const pessoaRemovida = {
			id: "17b7f43d-7b9f-4f7a-81dd-1343bdabf438",
			nome: "João",
			idade: 28,
		};
		const pessoaRestante = {
			id: "318a5bbb-3ae4-43a2-a651-16bf151528a8",
			nome: "Maria",
			idade: 19,
		};

		vi.stubGlobal(
			"fetch",
			vi.fn().mockImplementation((url: string) => {
				if (url.endsWith("/pessoas")) {
					return Promise.resolve({
						ok: true,
						status: 200,
						json: async () => [pessoaRestante],
					});
				}
				if (url.endsWith("/transacoes")) {
					return Promise.resolve({
						ok: true,
						status: 200,
						json: async () => [],
					});
				}
				if (url.endsWith("/totais")) {
					return Promise.resolve({
						ok: true,
						status: 200,
						json: async () => ({
							pessoas: [],
							totalReceitas: 0,
							totalDespesas: 0,
							saldoLiquido: 0,
						}),
					});
				}
				return Promise.reject(new Error(`URL inesperada: ${url}`));
			}),
		);

		const { result } = renderHook(() => useFinancePage());

		await waitFor(() => {
			expect(result.current.pessoaId).toBe(pessoaRestante.id);
		});

		expect(result.current.pessoaId).not.toBe(pessoaRemovida.id);
	});

	it("rejeita pessoa com nome vazio", async () => {
		const fetchMock = vi.fn(() => new Promise<Response>(() => {}));
		vi.stubGlobal("fetch", fetchMock);

		const { result } = renderHook(() => useFinancePage());

		act(() => {
			result.current.setNome("   ");
			result.current.setIdade("25");
		});

		await act(async () => {
			await result.current.handleCriarPessoa(createSubmitEvent());
		});

		expect(result.current.error).toBe("Nome é obrigatório");
		expect(fetchMock).not.toHaveBeenCalledWith(
			expect.any(String),
			expect.objectContaining({ method: "POST" }),
		);
	});

	it("rejeita pessoa com idade inválida", async () => {
		const fetchMock = vi.fn(() => new Promise<Response>(() => {}));
		vi.stubGlobal("fetch", fetchMock);

		const { result } = renderHook(() => useFinancePage());

		act(() => {
			result.current.setNome("Maria");
			result.current.setIdade("abc");
		});

		await act(async () => {
			await result.current.handleCriarPessoa(createSubmitEvent());
		});

		expect(result.current.error).toBe("Idade inválida");
		expect(fetchMock).not.toHaveBeenCalledWith(
			expect.any(String),
			expect.objectContaining({ method: "POST" }),
		);
	});

	it("rejeita transação com valor inválido", async () => {
		stubPendingFetch();

		const { result } = renderHook(() => useFinancePage());

		act(() => {
			result.current.setDescricao("Aluguel");
			result.current.setValor("abc");
			result.current.setTipo("despesa");
			result.current.setPessoaId(pessoa.id);
		});

		await act(async () => {
			await result.current.handleCriarTransacao(createSubmitEvent());
		});

		expect(result.current.error).toBe("Valor inválido");
	});

	it("rejeita transação sem pessoa selecionada", async () => {
		stubPendingFetch();

		const { result } = renderHook(() => useFinancePage());

		act(() => {
			result.current.setDescricao("Salário");
			result.current.setValor("100");
			result.current.setTipo("receita");
			result.current.setPessoaId("");
		});

		await act(async () => {
			await result.current.handleCriarTransacao(createSubmitEvent());
		});

		expect(result.current.error).toBe("Selecione uma pessoa válida");
	});
});
