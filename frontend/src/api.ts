import type { Pessoa, TotaisResumo, Transacao } from "./types";
const API_BASE_URL = "http://localhost:5000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
	const response = await fetch(`${API_BASE_URL}${path}`, {
		headers: {
			"Content-Type": "application/json",
			...(init?.headers || {}),
		},
		...init,
	});

	if (!response.ok) {
		const message = await response.text();
		throw new Error(message || "Erro na requisição");
	}

	if (response.status === 204) {
		return undefined as T;
	}

	return response.json() as Promise<T>;
}

export async function listarPessoas() {
	return request<Pessoa[]>("/pessoas");
}

export async function criarPessoa(payload: { nome: string; idade: number }) {
	return request<Pessoa>("/pessoas", {
		method: "POST",
		body: JSON.stringify(payload),
	});
}

export async function excluirPessoa(id: string) {
	return request<void>(`/pessoas/${id}`, {
		method: "DELETE",
	});
}

export async function listarTransacoes() {
	return request<Transacao[]>("/transacoes");
}

export async function criarTransacao(payload: {
	descricao: string;
	valor: number;
	tipo: string;
	pessoaId: string;
}) {
	return request<Transacao>("/transacoes", {
		method: "POST",
		body: JSON.stringify(payload),
	});
}

export async function listarTotais() {
	return request<TotaisResumo>("/totais");
}
