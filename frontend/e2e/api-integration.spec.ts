import { expect, test } from "@playwright/test";

test.describe("integração com API real", () => {
	test.skip(!process.env.E2E_REAL_API, "Requer backend real (E2E_REAL_API=1)");

	test("login e cadastro de pessoa contra API real", async ({ page }) => {
		await page.goto("/");

		await page.getByLabel("Usuário").fill("admin");
		await page.getByLabel("Senha").fill("admin");
		await page.getByRole("button", { name: "Entrar" }).click();

		await expect(
			page.getByRole("heading", { name: "Cadastrar Pessoa" }),
		).toBeVisible();

		const nome = `E2E Real ${Date.now()}`;
		await page.getByLabel("Nome").fill(nome);
		await page.getByLabel("Idade").fill("28");
		await page.getByRole("button", { name: "Salvar Pessoa" }).click();

		await expect(page.getByText("Pessoa cadastrada com sucesso!")).toBeVisible();
		await expect(page.getByText(`${nome} · 28 anos`)).toBeVisible();
	});
});
