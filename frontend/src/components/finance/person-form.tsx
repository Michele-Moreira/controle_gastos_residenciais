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
import type { Pessoa } from "@/types";

type PersonFormProps = {
	nome: string;
	idade: string;
	pessoas: Pessoa[];
	onNomeChange: (value: string) => void;
	onIdadeChange: (value: string) => void;
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
	onExcluir: (id: string) => void;
};

export function PersonForm({
	nome,
	idade,
	pessoas,
	onNomeChange,
	onIdadeChange,
	onSubmit,
	onExcluir,
}: PersonFormProps) {
	return (
		<Card className="min-w-0 rounded-lg border-border transition-colors hover:border-primary/40">
			<CardHeader className="flex-row items-center justify-between gap-2 space-y-0">
				<h2 className="terminal-prompt text-lg font-bold leading-none tracking-tight text-foreground">
					Cadastrar Pessoa
				</h2>
				<Badge variant="muted">{pessoas.length} cadastradas</Badge>
			</CardHeader>
			<CardContent>
				<form onSubmit={onSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="nome">Nome</Label>
						<Input
							id="nome"
							type="text"
							value={nome}
							onChange={(event) => onNomeChange(event.target.value)}
							placeholder="Nome"
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="idade">Idade</Label>
						<Input
							id="idade"
							type="number"
							min="0"
							max="200"
							value={idade}
							onChange={(event) => onIdadeChange(event.target.value)}
							placeholder="Idade"
							required
						/>
					</div>
					<Button type="submit" className="w-full">
						Salvar Pessoa
					</Button>
				</form>
			</CardContent>

			<CardContent className="border-t border-border pt-6">
				<h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
					Pessoas Cadastradas
				</h3>
				{pessoas.length > 0 ? (
					<ul className="space-y-2">
						{pessoas.map((pessoa) => (
							<li
								key={pessoa.id}
								className="flex min-w-0 items-center justify-between gap-2 rounded-md border border-border bg-muted/40 p-3 transition-colors hover:border-primary/40"
							>
								<span className="min-w-0 truncate text-sm text-foreground">
									{pessoa.nome} · {pessoa.idade} anos
								</span>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									aria-label={`Excluir ${pessoa.nome}`}
									onClick={() => void onExcluir(pessoa.id)}
									className="shrink-0 text-destructive hover:text-destructive/80"
								>									Excluir
								</Button>
							</li>
						))}
					</ul>
				) : (
					<p className="rounded-md border border-dashed border-border bg-muted/30 p-4 text-sm text-muted-foreground">
						Nenhuma pessoa cadastrada.
					</p>
				)}
			</CardContent>
		</Card>
	);
}
