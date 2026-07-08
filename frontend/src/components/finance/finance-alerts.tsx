import { Alert, AlertDescription } from "@/components/ui/alert";

type FinanceAlertsProps = {
	error: string;
	success: string;
};

export function FinanceAlerts({ error, success }: FinanceAlertsProps) {
	return (
		<>
			{error && (
				<Alert
					variant="destructive"
					role="alert"
					className="border-destructive/50 bg-destructive/10"
				>
					<AlertDescription className="font-medium">
						<span className="text-destructive/70">[erro]</span> {error}
					</AlertDescription>
				</Alert>
			)}
			{success && (
				<Alert
					role="status"
					className="border-success/50 bg-success/10 text-success"
				>
					<AlertDescription className="font-medium">
						<span className="text-success/70">[ok]</span> {success}
					</AlertDescription>
				</Alert>
			)}
		</>
	);
}
