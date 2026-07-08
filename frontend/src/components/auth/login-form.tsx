import { useCallback, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/api";

type LoginFormProps = {
	onSuccess: () => void;
};

export function LoginForm({ onSuccess }: LoginFormProps) {
	const [username, setUsername] = useState("admin");
	const [password, setPassword] = useState("admin");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = useCallback(
		async (event: FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			setError("");
			setLoading(true);

			try {
				await login(username, password);
				onSuccess();
			} catch (err) {
				setError(err instanceof Error ? err.message : "Erro ao autenticar");
			} finally {
				setLoading(false);
			}
		},
		[username, password, onSuccess],
	);

	return (
		<div className="flex min-h-screen items-center justify-center bg-background px-4">
			<Card className="w-full max-w-md rounded-lg border-border shadow-glow">
				<CardHeader className="space-y-3">
					<span className="flex items-center gap-1 text-sm font-extrabold uppercase tracking-[0.25em] text-foreground">
						<span className="text-primary">&gt;_</span>
						GASTOS
					</span>
					<CardTitle className="terminal-cursor text-2xl font-bold">
						Entrar
					</CardTitle>
					<CardDescription>
						Acesse o controle de gastos residenciais com suas credenciais.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form className="space-y-4" onSubmit={(event) => void handleSubmit(event)}>
						<div className="space-y-2">
							<Label htmlFor="username">Usuário</Label>
							<Input
								id="username"
								autoComplete="username"
								value={username}
								onChange={(event) => setUsername(event.target.value)}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Senha</Label>
							<Input
								id="password"
								type="password"
								autoComplete="current-password"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
							/>
						</div>
						{error ? (
							<p className="text-sm text-destructive" role="alert">
								{error}
							</p>
						) : null}
						<Button className="w-full" type="submit" disabled={loading}>
							{loading ? "Entrando..." : "Entrar"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
