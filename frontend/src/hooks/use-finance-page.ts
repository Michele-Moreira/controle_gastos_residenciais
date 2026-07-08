import { useCallback, useEffect, useState, type FormEvent } from "react";

import {
	criarPessoa,
	criarTransacao,
	excluirPessoa,
	listarPessoas,
	listarTotais,
	listarTransacoes,
} from "@/lib/api";
import {
	criarPessoaFormSchema,
	criarTransacaoFormSchema,
	getZodErrorMessage,
} from "@/lib/schemas";
import type { Pessoa, TipoTransacao, TotaisResumo, Transacao } from "@/types";

export function useFinancePage() {
	const [pessoas, setPessoas] = useState<Pessoa[]>([]);
	const [transacoes, setTransacoes] = useState<Transacao[]>([]);
	const [totais, setTotais] = useState<TotaisResumo | null>(null);
	const [nome, setNome] = useState("");
	const [idade, setIdade] = useState("");
	const [descricao, setDescricao] = useState("");
	const [valor, setValor] = useState("");
	const [tipo, setTipo] = useState<TipoTransacao>("receita");
	const [pessoaId, setPessoaId] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const carregarDados = useCallback(async (isActive: () => boolean = () => true) => {
		try {
			const [pessoasResponse, transacoesResponse, totaisResponse] =
				await Promise.all([
					listarPessoas(),
					listarTransacoes(),
					listarTotais(),
				]);
			if (!isActive()) {
				return;
			}
			setPessoas(pessoasResponse);
			setTransacoes(transacoesResponse);
			setTotais(totaisResponse);
			setPessoaId((atual) => {
				if (pessoasResponse.length === 0) {
					return "";
				}
				const pessoaAtualExiste = pessoasResponse.some(
					(pessoa) => pessoa.id === atual,
				);
				return pessoaAtualExiste ? atual : pessoasResponse[0].id;
			});
		} catch (err) {
			if (!isActive()) {
				return;
			}
			setError(err instanceof Error ? err.message : "Erro ao carregar dados");
		}
	}, []);

	useEffect(() => {
		let cancelled = false;
		void carregarDados(() => !cancelled);
		return () => {
			cancelled = true;
		};
	}, [carregarDados]);

	const handleCriarPessoa = async (
		event: FormEvent<HTMLFormElement>,
	): Promise<void> => {
		event.preventDefault();
		setError("");
		setSuccess("");

		const parsed = criarPessoaFormSchema.safeParse({ nome, idade });
		if (!parsed.success) {
			setError(getZodErrorMessage(parsed.error));
			return;
		}

		try {
			await criarPessoa(parsed.data);
			setNome("");
			setIdade("");
			setSuccess("Pessoa cadastrada com sucesso!");
			await carregarDados();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Erro ao cadastrar pessoa");
		}
	};

	const handleCriarTransacao = async (
		event: FormEvent<HTMLFormElement>,
	): Promise<void> => {
		event.preventDefault();
		setError("");
		setSuccess("");

		const parsed = criarTransacaoFormSchema.safeParse({
			descricao,
			valor,
			tipo,
			pessoaId,
		});
		if (!parsed.success) {
			setError(getZodErrorMessage(parsed.error));
			return;
		}

		try {
			await criarTransacao(parsed.data);
			setDescricao("");
			setValor("");
			setSuccess("Transação cadastrada com sucesso!");
			await carregarDados();
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Erro ao cadastrar transação",
			);
		}
	};

	const handleExcluirPessoa = async (id: string): Promise<void> => {
		setError("");
		setSuccess("");

		try {
			await excluirPessoa(id);
			setSuccess("Pessoa removida com sucesso!");
			await carregarDados();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Erro ao remover pessoa");
		}
	};

	return {
		pessoas,
		transacoes,
		totais,
		nome,
		setNome,
		idade,
		setIdade,
		descricao,
		setDescricao,
		valor,
		setValor,
		tipo,
		setTipo,
		pessoaId,
		setPessoaId,
		error,
		success,
		handleCriarPessoa,
		handleCriarTransacao,
		handleExcluirPessoa,
	};
}
