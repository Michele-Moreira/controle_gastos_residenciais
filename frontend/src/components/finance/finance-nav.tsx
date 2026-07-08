const links = ["Pessoas", "Transações", "Totais"];

export function FinanceNav() {
	return (
		<header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
				<span className="flex items-center gap-1 text-sm font-extrabold uppercase tracking-[0.25em] text-foreground">
					<span className="text-primary">&gt;_</span>
					GASTOS
				</span>

				<nav className="hidden items-center gap-1 md:flex">
					{links.map((link) => (
						<span
							key={link}
							className="rounded-md px-3 py-1.5 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
						>
							{link}
						</span>
					))}
				</nav>
			</div>
		</header>
	);
}
