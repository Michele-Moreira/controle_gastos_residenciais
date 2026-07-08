import { describe, expect, it } from "vitest";

import { formatCurrency } from "@/lib/format-currency";

describe("formatCurrency", () => {
	it("formata valor com duas casas decimais", () => {
		expect(formatCurrency(1500)).toBe("R$ 1500.00");
		expect(formatCurrency(99.5)).toBe("R$ 99.50");
	});
});
