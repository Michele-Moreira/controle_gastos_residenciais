import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

async function mockFinanceApi(page: Page) {
	await page.route("**/api/pessoas", async (route) => {
		if (route.request().method() === "POST") {
			await route.fulfill({
				status: 201,
				contentType: "application/json",
				body: JSON.stringify({
					id: "17b7f43d-7b9f-4f7a-81dd-1343bdabf438",
					nome: "João",
					idade: 30,
				}),
			});
			return;
		}

		await route.fulfill({
			status: 200,
			contentType: "application/json",
			body: JSON.stringify([
				{
					id: "318a5bbb-3ae4-43a2-a651-16bf151528a8",
					nome: "Maria",
					idade: 28,
				},
			]),
		});
	});

	await page.route("**/api/transacoes", async (route) => {
		await route.fulfill({
			status: 200,
			contentType: "application/json",
			body: JSON.stringify([
				{
					id: "10ea748a-5e29-47dd-a262-635a4eb5439b",
					descricao:
						"Descrição muito longa para validar truncamento em telas estreitas sem overflow",
					valor: 9999.99,
					tipo: "despesa",
					pessoaId: "318a5bbb-3ae4-43a2-a651-16bf151528a8",
				},
			]),
		});
	});

	await page.route("**/api/totais", async (route) => {
		await route.fulfill({
			status: 200,
			contentType: "application/json",
			body: JSON.stringify({
				pessoas: [
					{
						pessoaId: "318a5bbb-3ae4-43a2-a651-16bf151528a8",
						nome: "Maria",
						totalReceitas: 5000,
						totalDespesas: 1200,
						saldo: 3800,
					},
				],
				totalReceitas: 5000,
				totalDespesas: 1200,
				saldoLiquido: 3800,
			}),
		});
	});
}

const viewports = [
	{ name: "mobile", width: 375, height: 667 },
	{ name: "desktop", width: 1280, height: 800 },
] as const;

for (const viewport of viewports) {
	test(`sem overflow horizontal em ${viewport.name}`, async ({ page }) => {
		await page.setViewportSize({
			width: viewport.width,
			height: viewport.height,
		});
		await mockFinanceApi(page);
		await page.goto("/");
		await expect(page.getByRole("heading", { name: "Cadastrar Pessoa" })).toBeVisible();

		const hasOverflow = await page.evaluate(
			() => document.documentElement.scrollWidth > document.documentElement.clientWidth,
		);

		expect(hasOverflow).toBe(false);
	});
}

test("campos do formulário têm rótulos acessíveis", async ({ page }) => {
	await mockFinanceApi(page);
	await page.goto("/");

	await expect(page.getByLabel("Nome")).toBeVisible();
	await expect(page.getByLabel("Idade")).toBeVisible();
	await expect(page.getByLabel("Descrição")).toBeVisible();
	await expect(page.getByLabel("Valor")).toBeVisible();
	await expect(page.getByLabel("Tipo")).toBeVisible();
	await expect(page.getByLabel("Pessoa")).toBeVisible();
});

test("botão de exclusão expõe nome da pessoa no rótulo acessível", async ({ page }) => {
	await mockFinanceApi(page);
	await page.goto("/");

	await expect(page.getByRole("button", { name: "Excluir Maria" })).toBeVisible();
});

test("alertas de feedback usam regiões live apropriadas", async ({ page }) => {
	await mockFinanceApi(page);
	await page.goto("/");

	await page.getByLabel("Nome").fill("João");
	await page.getByLabel("Idade").fill("30");
	await page.getByRole("button", { name: "Salvar Pessoa" }).click();

	const successAlert = page.getByRole("status");
	await expect(successAlert).toBeVisible();
	await expect(successAlert).toHaveText("Pessoa cadastrada com sucesso!");
});

test("campos interativos são focáveis", async ({ page }) => {
	await mockFinanceApi(page);
	await page.goto("/");

	const nome = page.getByLabel("Nome");
	await nome.focus();
	await expect(nome).toBeFocused();
});
