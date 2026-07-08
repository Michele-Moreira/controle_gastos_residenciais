import { z } from "zod";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

type ProblemDetails = {
	title?: string;
	status?: number;
	errors?: string[];
};

async function parseErrorMessage(response: Response): Promise<string> {
	const contentType = response.headers.get("content-type") ?? "";

	if (contentType.includes("application/problem+json") || contentType.includes("application/json")) {
		try {
			const body = (await response.json()) as ProblemDetails & {
				errors?: Record<string, string[]>;
			};

			if (Array.isArray(body.errors)) {
				return body.errors.join(" ");
			}

			if (body.errors && typeof body.errors === "object") {
				const messages = Object.values(body.errors).flat();
				if (messages.length > 0) {
					return messages.join(" ");
				}
			}

			if (body.title) {
				return body.title;
			}
		} catch {
			// fallback para texto
		}
	}

	return response.text() || "Erro na requisição";
}

async function requestJson(path: string, init?: RequestInit): Promise<unknown> {
	const response = await fetch(`${API_BASE_URL}${path}`, {
		...init,
		headers: {
			"Content-Type": "application/json",
			...(init?.headers || {}),
		},
	});

	if (!response.ok) {
		const message = await parseErrorMessage(response);
		throw new Error(message || "Erro na requisição");
	}

	if (response.status === 204) {
		return undefined;
	}

	return response.json();
}

function validate<T>(schema: z.ZodType<T>, data: unknown, context: string): T {
	const result = schema.safeParse(data);
	if (!result.success) {
		throw new Error(
			`Resposta inválida (${context}): ${result.error.message}`,
		);
	}
	return result.data;
}

export { requestJson, validate };
