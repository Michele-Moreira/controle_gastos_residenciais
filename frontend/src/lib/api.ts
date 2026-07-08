import {
	login,
	requestJson,
	validate,
} from "@/lib/api-client";
import {
	criarPessoaPayloadSchema,
	criarTransacaoPayloadSchema,
	pessoaListSchema,
	pessoaSchema,
	totaisResumoSchema,
	transacaoListSchema,
	transacaoSchema,
	type CriarPessoaPayload,
	type CriarTransacaoPayload,
	type Pessoa,
	type TotaisResumo,
	type Transacao,
} from "@/lib/schemas";

export { login };

export async function listarPessoas(): Promise<Pessoa[]> {
	const data = await requestJson("/pessoas");
	return validate(pessoaListSchema, data, "listarPessoas");
}

export async function criarPessoa(payload: CriarPessoaPayload): Promise<Pessoa> {
	const body = validate(criarPessoaPayloadSchema, payload, "criarPessoa");
	const data = await requestJson("/pessoas", {
		method: "POST",
		body: JSON.stringify(body),
	});
	return validate(pessoaSchema, data, "criarPessoa");
}

export async function excluirPessoa(id: string): Promise<void> {
	await requestJson(`/pessoas/${id}`, { method: "DELETE" });
}

export async function listarTransacoes(): Promise<Transacao[]> {
	const data = await requestJson("/transacoes");
	return validate(transacaoListSchema, data, "listarTransacoes");
}

export async function criarTransacao(
	payload: CriarTransacaoPayload,
): Promise<Transacao> {
	const body = validate(criarTransacaoPayloadSchema, payload, "criarTransacao");
	const data = await requestJson("/transacoes", {
		method: "POST",
		body: JSON.stringify(body),
	});
	return validate(transacaoSchema, data, "criarTransacao");
}

export async function listarTotais(): Promise<TotaisResumo> {
	const data = await requestJson("/totais");
	return validate(totaisResumoSchema, data, "listarTotais");
}
