import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import FinancePage from "./pages/FinancePage";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<FinancePage />
	</StrictMode>,
);
