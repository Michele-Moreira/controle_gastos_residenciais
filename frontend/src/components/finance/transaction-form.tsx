import type { FormEvent } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/lib/format-currency";
import { cn } from "@/lib/utils";
import type { Pessoa, TipoTransacao, Transacao } from "@/types";

type TransactionFormProps = {
	descricao: string;
	valor: string;
	tipo: TipoTransacao;
	pessoaId: string;
	pessoas: Pessoa[];
	transacoes: Transacao[];
	onDescricaoChange: (value: string) => void;
	onValorChange: (value: string) => void;
	onTipoChange: (value: TipoTransacao) => void;
	onPessoaIdChange: (value: string) => void;
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function TransactionForm({
	descricao,
	valor,
	tipo,
	pessoaId,
	pessoas,
	transacoes,
	onDescricaoChange,
	onValorChange,
	onTipoChange,
	onPessoaIdChange,
	onSubmit,
}: TransactionFormProps) {
	return (
		<Card className="min-w-0 rounded-lg border-border transition-colors hover:border-primary/40">
			<CardHeader className="flex-row items-center justify-between gap-2 space-y-0">
				<h2 className="terminal-prompt text-lg font-bold leading-none tracking-tight text-foreground">
					Cadastrar Transação
				</h2>
				<Badge variant="muted">{transacoes.length} registros</Badge>
			</CardHeader>
			<CardContent>
				<form onSubmit={onSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="descricao">Descrição</Label>
						<Input
							id="descricao"
							type="text"
							value={descricao}
							onChange={(event) => onDescricaoChange(event.target.value)}
							placeholder="Descrição"
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="valor">Valor</Label>
						<Input
							id="valor"
							type="number"
							step="0.01"
							min="0.01"
							value={valor}
							onChange={(event) => onValorChange(event.target.value)}
							placeholder="Valor"
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="tipo">Tipo</Label>
						<Select
							value={tipo}
							onValueChange={(value) => {
								if (value === "receita" || value === "despesa") {
									onTipoChange(value);
								}
							}}
						>
							<SelectTrigger id="tipo">
								<SelectValue placeholder="Selecione o tipo" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="receita">Receita</SelectItem>
								<SelectItem value="despesa">Despesa</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="pessoa">Pessoa</Label>
						<Select value={pessoaId} onValueChange={onPessoaIdChange}>
							<SelectTrigger id="pessoa">
								<SelectValue placeholder="Selecione uma pessoa" />
							</SelectTrigger>
							<SelectContent>
								{pessoas.map((pessoa) => (
									<SelectItem key={pessoa.id} value={pessoa.id}>
										{pessoa.nome}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<Button
						type="submit"
						className="w-full"
						disabled={!pessoas.some((pessoa) => pessoa.id === pessoaId)}
					>
						Salvar Transação
					</Button>
				</form>
			</CardContent>

			<CardContent className="min-w-0 overflow-hidden border-t border-border pt-6">
				<h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
					Últimas Transações
				</h3>
				{transacoes.length > 0 ? (
					<ul className="min-w-0 space-y-2">
						{transacoes.map((transacao) => (
							<li
								key={transacao.id}
								className={cn(
									"flex min-w-0 items-center justify-between gap-2 rounded-md border p-3 text-sm transition-colors",
									transacao.tipo === "receita"
										? "border-success/30 bg-success/10 text-success"
										: "border-destructive/30 bg-destructive/10 text-destructive",
								)}
							>
								<span className="min-w-0 truncate">
									{transacao.descricao} · {formatCurrency(transacao.valor)}
								</span>
								<span className="shrink-0 font-semibold">									{transacao.tipo === "receita" ? "+" : "-"}
								</span>
							</li>
						))}
					</ul>
				) : (
					<p className="rounded-md border border-dashed border-border bg-muted/30 p-4 text-sm text-muted-foreground">
						Nenhuma transação cadastrada.
					</p>
				)}
			</CardContent>
		</Card>
	);
}
