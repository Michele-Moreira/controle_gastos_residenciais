import { useEffect, useState, type FormEvent } from "react";
import "./App.css";
import {
	criarPessoa,
	criarTransacao,
	excluirPessoa,
	listarPessoas,
	listarTotais,
	listarTransacoes,
} from "./api";
import type { Pessoa, TotaisResumo, Transacao } from "./types";

function App() {
	const [pessoas, setPessoas] = useState<Pessoa[]>([]);
	const [transacoes, setTransacoes] = useState<Transacao[]>([]);
	const [totais, setTotais] = useState<TotaisResumo | null>(null);
	const [nome, setNome] = useState("");
	const [idade, setIdade] = useState("");
	const [descricao, setDescricao] = useState("");
	const [valor, setValor] = useState("");
	const [tipo, setTipo] = useState("receita");
	const [pessoaId, setPessoaId] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const carregarDados = async () => {
		try {
			const [pessoasResponse, transacoesResponse, totaisResponse] =
				await Promise.all([
					listarPessoas(),
					listarTransacoes(),
					listarTotais(),
				]);
			setPessoas(pessoasResponse);
			setTransacoes(transacoesResponse);
			setTotais(totaisResponse);
			if (pessoasResponse.length > 0 && !pessoaId) {
				setPessoaId(pessoasResponse[0].id);
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Erro ao carregar dados");
		}
	};

	useEffect(() => {
		carregarDados();
	}, []);

	const handleCriarPessoa = async (event: FormEvent) => {
		event.preventDefault();
		setError("");
		setSuccess("");

		try {
			await criarPessoa({ nome, idade: Number(idade) });
			setNome("");
			setIdade("");
			setSuccess("Pessoa cadastrada com sucesso!");
			await carregarDados();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Erro ao cadastrar pessoa");
		}
	};

	const handleCriarTransacao = async (event: FormEvent) => {
		event.preventDefault();
		setError("");
		setSuccess("");

		try {
			await criarTransacao({
				descricao,
				valor: Number(valor),
				tipo,
				pessoaId,
			});
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

	const handleExcluirPessoa = async (id: string) => {
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

	return (
		<div className="app-shell">
			<header className="hero-card">
				<div>
					<p className="eyebrow">Controle de gastos residenciais</p>
					<h1>Gerencie pessoas, receitas e despesas em um só lugar.</h1>
				</div>
				<div className="summary-card">
					<h2>Resumo</h2>
					<p>Receitas: R$ {totais?.totalReceitas.toFixed(2) ?? "0.00"}</p>
					<p>Despesas: R$ {totais?.totalDespesas.toFixed(2) ?? "0.00"}</p>
					<p>Saldo: R$ {totais?.saldoLiquido.toFixed(2) ?? "0.00"}</p>
				</div>
			</header>

			{error ? <div className="alert error">{error}</div> : null}
			{success ? <div className="alert success">{success}</div> : null}

			<main className="grid">
				<section className="panel">
					<h2>Cadastrar pessoa</h2>
					<form onSubmit={handleCriarPessoa} className="form-stack">
						<input
							value={nome}
							onChange={(e) => setNome(e.target.value)}
							placeholder="Nome"
							required
						/>
						<input
							value={idade}
							onChange={(e) => setIdade(e.target.value)}
							placeholder="Idade"
							type="number"
							min="0"
							required
						/>
						<button type="submit">Salvar pessoa</button>
					</form>

					<h3>Pessoas cadastradas</h3>
					<ul className="list">
						{pessoas.map((pessoa) => (
							<li key={pessoa.id}>
								<span>
									{pessoa.nome} · {pessoa.idade} anos
								</span>
								<button
									type="button"
									onClick={() => handleExcluirPessoa(pessoa.id)}
								>
									Excluir
								</button>
							</li>
						))}
					</ul>
				</section>

				<section className="panel">
					<h2>Cadastrar transação</h2>
					<form onSubmit={handleCriarTransacao} className="form-stack">
						<input
							value={descricao}
							onChange={(e) => setDescricao(e.target.value)}
							placeholder="Descrição"
							required
						/>
						<input
							value={valor}
							onChange={(e) => setValor(e.target.value)}
							placeholder="Valor"
							type="number"
							step="0.01"
							min="0.01"
							required
						/>
						<select value={tipo} onChange={(e) => setTipo(e.target.value)}>
							<option value="receita">Receita</option>
							<option value="despesa">Despesa</option>
						</select>
						<select
							value={pessoaId}
							onChange={(e) => setPessoaId(e.target.value)}
							required
						>
							{pessoas.map((pessoa) => (
								<option key={pessoa.id} value={pessoa.id}>
									{pessoa.nome}
								</option>
							))}
						</select>
						<button type="submit">Salvar transação</button>
					</form>

					<h3>Últimas transações</h3>
					<ul className="list">
						{transacoes.map((transacao) => (
							<li key={transacao.id}>
								<span>
									{transacao.descricao} · R$ {transacao.valor.toFixed(2)} ·{" "}
									{transacao.tipo}
								</span>
							</li>
						))}
					</ul>
				</section>
			</main>
		</div>
	);
}

export default App;
