import { defineConfig, devices } from "@playwright/test";

const useRealApi = !!process.env.E2E_REAL_API;

const webServer = useRealApi
	? [
			{
				command:
					"dotnet run --project ControleGastos.Api/ControleGastos.Api.csproj --urls http://localhost:5000",
				cwd: "../backend",
				url: "http://localhost:5000/health",
				reuseExistingServer: !process.env.CI,
				timeout: 120_000,
			},
			{
				command: "pnpm run dev",
				url: "http://localhost:5173",
				reuseExistingServer: !process.env.CI,
			},
		]
	: {
			command: "pnpm run dev",
			url: "http://localhost:5173",
			reuseExistingServer: !process.env.CI,
		};

export default defineConfig({
	testDir: "./e2e",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: "list",
	use: {
		baseURL: "http://localhost:5173",
		trace: "on-first-retry",
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
			testIgnore: useRealApi ? [] : ["**/api-integration.spec.ts"],
		},
	],
	webServer,
});
