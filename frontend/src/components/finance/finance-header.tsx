import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format-currency";
import { cn } from "@/lib/utils";
import type { TotaisResumo } from "@/types";

type FinanceHeaderProps = {
	totais: TotaisResumo | null;
};

type StatConfig = {
	label: string;
	value: number;
	accent: string;
};

export function FinanceHeader({ totais }: FinanceHeaderProps) {
	const stats: StatConfig[] = totais
		? [
				{
					label: "Receitas",
					value: totais.totalReceitas,
					accent: "text-success",
				},
				{
					label: "Despesas",
					value: totais.totalDespesas,
					accent: "text-destructive",
				},
				{
					label: "Saldo",
					value: totais.saldoLiquido,
					accent: "text-primary",
				},
			]
		: [];

	return (
		<header className="min-w-0 space-y-6">
			<div className="space-y-2">
				<p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
					// Controle de Gastos Residenciais
				</p>
				<h1 className="terminal-cursor text-2xl font-extrabold leading-tight break-words text-foreground md:text-4xl">
					Gerencie pessoas, receitas e despesas em um só lugar.
				</h1>
			</div>

			{totais && (
				<div className="grid gap-4 sm:grid-cols-3">
					{stats.map((stat) => (
						<Card
							key={stat.label}
							className="min-w-0 rounded-lg border-border bg-card transition-colors hover:border-primary/50"
						>
							<CardContent className="p-4">
								<p className="text-xs uppercase tracking-widest text-muted-foreground">
									{stat.label}
								</p>
								<p
									className={cn(
										"mt-1 text-2xl font-bold tabular-nums",
										stat.accent,
									)}
								>
									{formatCurrency(stat.value)}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</header>
	);
}
