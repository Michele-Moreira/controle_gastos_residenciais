import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format-currency";
import { cn } from "@/lib/utils";
import type { TotaisPessoa } from "@/types";

type PersonTotalsSectionProps = {
	pessoas: TotaisPessoa[];
};

export function PersonTotalsSection({ pessoas }: PersonTotalsSectionProps) {
	return (
		<section className="space-y-4">
			<h2 className="terminal-prompt text-xl font-bold text-foreground">
				Totais por Pessoa
			</h2>
			{pessoas.length > 0 ? (
				<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{pessoas.map((pessoa) => (
						<li key={pessoa.pessoaId}>
							<Card className="h-full rounded-lg border-border transition-colors hover:border-primary/50">
								<CardContent className="flex flex-col gap-3 p-4">
									<p className="truncate text-sm font-bold uppercase tracking-wider text-foreground">
										{pessoa.nome}
									</p>
									<div className="space-y-1 text-sm text-muted-foreground">
										<p className="tabular-nums">
											Receitas: {formatCurrency(pessoa.totalReceitas)}
										</p>
										<p className="tabular-nums">
											Despesas: {formatCurrency(pessoa.totalDespesas)}
										</p>
									</div>
									<p
										className={cn(
											"border-t border-border pt-2 text-sm font-bold tabular-nums",
											pessoa.saldo >= 0 ? "text-primary" : "text-destructive",
										)}
									>
										Saldo: {formatCurrency(pessoa.saldo)}
									</p>
								</CardContent>
							</Card>
						</li>
					))}
				</ul>
			) : (
				<p className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
					Cadastre pessoas e transações para visualizar os totais individuais.
				</p>
			)}
		</section>
	);
}
