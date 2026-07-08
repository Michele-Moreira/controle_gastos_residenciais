import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.addInitScript(() => {
		localStorage.setItem("controle_gastos_token", "e2e-test-token");
	});
});

test("carrega a página de finanças", async ({ page }) => {
	await page.goto("/");

	await expect(
		page.getByRole("heading", {
			name: "Gerencie pessoas, receitas e despesas em um só lugar.",
		}),
	).toBeVisible();
	await expect(page.getByRole("heading", { name: "Cadastrar Pessoa" })).toBeVisible();
	await expect(
		page.getByRole("heading", { name: "Cadastrar Transação" }),
	).toBeVisible();
});

test("cadastra pessoa e exibe na lista", async ({ page }) => {
	const pessoaCriada = {
		id: "318a5bbb-3ae4-43a2-a651-16bf151528a8",
		nome: "Teste E2E",
		idade: 30,
	};

	await page.route("**/api/pessoas", async (route) => {
		if (route.request().method() === "GET") {
			await route.fulfill({
				status: 200,
				contentType: "application/json",
				body: JSON.stringify([]),
			});
			return;
		}

		if (route.request().method() === "POST") {
			await route.fulfill({
				status: 201,
				contentType: "application/json",
				body: JSON.stringify(pessoaCriada),
			});
			return;
		}

		await route.continue();
	});

	await page.route("**/api/transacoes", async (route) => {
		await route.fulfill({
			status: 200,
			contentType: "application/json",
			body: JSON.stringify([]),
		});
	});

	await page.route("**/api/totais", async (route) => {
		await route.fulfill({
			status: 200,
			contentType: "application/json",
			body: JSON.stringify({
				pessoas: [],
				totalReceitas: 0,
				totalDespesas: 0,
				saldoLiquido: 0,
			}),
		});
	});

	await page.goto("/");

	await page.getByLabel("Nome").fill("Teste E2E");
	await page.getByLabel("Idade").fill("30");
	await page.getByRole("button", { name: "Salvar Pessoa" }).click();

	await expect(page.getByText("Pessoa cadastrada com sucesso!")).toBeVisible();

	await page.unroute("**/api/pessoas");
	await page.route("**/api/pessoas", async (route) => {
		await route.fulfill({
			status: 200,
			contentType: "application/json",
			body: JSON.stringify([pessoaCriada]),
		});
	});

	await page.reload();

	await expect(page.getByText("Teste E2E · 30 anos")).toBeVisible();
});

test("exibe layout principal em viewport mobile", async ({ page }) => {
	await page.setViewportSize({ width: 375, height: 667 });

	await page.route("**/api/pessoas", async (route) => {
		await route.fulfill({
			status: 200,
			contentType: "application/json",
			body: JSON.stringify([]),
		});
	});

	await page.route("**/api/transacoes", async (route) => {
		await route.fulfill({
			status: 200,
			contentType: "application/json",
			body: JSON.stringify([]),
		});
	});

	await page.route("**/api/totais", async (route) => {
		await route.fulfill({
			status: 200,
			contentType: "application/json",
			body: JSON.stringify({
				pessoas: [],
				totalReceitas: 0,
				totalDespesas: 0,
				saldoLiquido: 0,
			}),
		});
	});

	await page.goto("/");

	await expect(
		page.getByRole("heading", { name: "Cadastrar Pessoa" }),
	).toBeVisible();
	await expect(
		page.getByRole("heading", { name: "Cadastrar Transação" }),
	).toBeVisible();
	await expect(page.getByRole("button", { name: "Salvar Pessoa" })).toBeVisible();
});
