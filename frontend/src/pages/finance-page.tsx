import { FinanceAlerts } from "@/components/finance/finance-alerts";
import { FinanceHeader } from "@/components/finance/finance-header";
import { FinanceNav } from "@/components/finance/finance-nav";
import { PersonForm } from "@/components/finance/person-form";
import { PersonTotalsSection } from "@/components/finance/person-totals-section";
import { TransactionForm } from "@/components/finance/transaction-form";
import { useFinancePage } from "@/hooks/use-finance-page";

export function FinancePage() {
	const {
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
	} = useFinancePage();

	return (
		<div className="min-h-screen overflow-x-clip bg-background">
			<FinanceNav />
			<div className="mx-auto w-full min-w-0 max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
				<FinanceHeader totais={totais} />
				<FinanceAlerts error={error} success={success} />
				<PersonTotalsSection pessoas={totais?.pessoas ?? []} />
				<main className="grid min-w-0 gap-6 lg:grid-cols-2">
					<PersonForm
						nome={nome}
						idade={idade}
						pessoas={pessoas}
						onNomeChange={setNome}
						onIdadeChange={setIdade}
						onSubmit={(event) => void handleCriarPessoa(event)}
						onExcluir={handleExcluirPessoa}
					/>
					<TransactionForm
						descricao={descricao}
						valor={valor}
						tipo={tipo}
						pessoaId={pessoaId}
						pessoas={pessoas}
						transacoes={transacoes}
						onDescricaoChange={setDescricao}
						onValorChange={setValor}
						onTipoChange={setTipo}
						onPessoaIdChange={setPessoaId}
						onSubmit={(event) => void handleCriarTransacao(event)}
					/>
				</main>
			</div>
		</div>
	);
}
