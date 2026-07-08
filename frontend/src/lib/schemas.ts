import { z } from "zod";

export const tipoTransacaoSchema = z.enum(["receita", "despesa"]);

export const pessoaSchema = z.object({
	id: z.string().uuid(),
	nome: z.string(),
	idade: z.number(),
});

export const transacaoSchema = z.object({
	id: z.string().uuid(),
	descricao: z.string(),
	valor: z.number(),
	tipo: tipoTransacaoSchema,
	pessoaId: z.string().uuid(),
});

export const totaisPessoaSchema = z.object({
	pessoaId: z.string().uuid(),
	nome: z.string(),
	totalReceitas: z.number(),
	totalDespesas: z.number(),
	saldo: z.number(),
});

export const totaisResumoSchema = z.object({
	pessoas: z.array(totaisPessoaSchema),
	totalReceitas: z.number(),
	totalDespesas: z.number(),
	saldoLiquido: z.number(),
});

export const pessoaListSchema = z.array(pessoaSchema);
export const transacaoListSchema = z.array(transacaoSchema);

export type Pessoa = z.infer<typeof pessoaSchema>;
export type Transacao = z.infer<typeof transacaoSchema>;
export type TotaisPessoa = z.infer<typeof totaisPessoaSchema>;
export type TotaisResumo = z.infer<typeof totaisResumoSchema>;
export type TipoTransacao = z.infer<typeof tipoTransacaoSchema>;

export const criarPessoaPayloadSchema = z.object({
	nome: z.string().min(1),
	idade: z.number().int().min(0).max(200),
});

export const criarTransacaoPayloadSchema = z.object({
	descricao: z.string().min(1),
	valor: z.number().positive(),
	tipo: tipoTransacaoSchema,
	pessoaId: z.string().uuid(),
});

export type CriarPessoaPayload = z.infer<typeof criarPessoaPayloadSchema>;
export type CriarTransacaoPayload = z.infer<typeof criarTransacaoPayloadSchema>;

export const criarPessoaFormSchema = z.object({
	nome: z.string().trim().min(1, "Nome é obrigatório"),
	idade: z
		.string()
		.trim()
		.min(1, "Idade é obrigatória")
		.pipe(
			z.coerce
				.number({ invalid_type_error: "Idade inválida" })
				.int("Idade deve ser um número inteiro")
				.min(0, "Idade deve ser entre 0 e 200")
				.max(200, "Idade deve ser entre 0 e 200"),
		),
});

export const criarTransacaoFormSchema = z.object({
	descricao: z.string().trim().min(1, "Descrição é obrigatória"),
	valor: z
		.string()
		.trim()
		.min(1, "Valor é obrigatório")
		.pipe(
			z.coerce
				.number({ invalid_type_error: "Valor inválido" })
				.positive("Valor deve ser maior que zero"),
		),
	tipo: tipoTransacaoSchema,
	pessoaId: z.string().uuid("Selecione uma pessoa válida"),
});

export function getZodErrorMessage(error: z.ZodError): string {
	return error.issues[0]?.message ?? "Dados inválidos";
}
