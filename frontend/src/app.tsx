import { useCallback, useState } from "react";

import { LoginForm } from "@/components/auth/login-form";
import { FinancePage } from "@/pages/finance-page";
import { clearStoredToken, isAuthenticated } from "@/lib/auth";

export function App() {
	const [authenticated, setAuthenticated] = useState(isAuthenticated);

	const handleLoginSuccess = useCallback(() => {
		setAuthenticated(true);
	}, []);

	const handleLogout = useCallback(() => {
		clearStoredToken();
		setAuthenticated(false);
	}, []);

	if (!authenticated) {
		return <LoginForm onSuccess={handleLoginSuccess} />;
	}

	return <FinancePage onLogout={handleLogout} />;
}
