export interface Pessoa {
	id: string;
	nome: string;
	idade: number;
}

export interface Transacao {
	id: string;
	descricao: string;
	valor: number;
	tipo: string;
	pessoaId: string;
}

export interface TotaisPessoa {
	pessoaId: string;
	nome: string;
	totalReceitas: number;
	totalDespesas: number;
	saldo: number;
}

export interface TotaisResumo {
	pessoas: TotaisPessoa[];
	totalReceitas: number;
	totalDespesas: number;
	saldoLiquido: number;
}
