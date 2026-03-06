export default function LivretPublicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="min-h-dvh bg-background">
      <header className="flex h-[var(--header-height)] items-center justify-center border-b border-border">
        <h1 className="text-lg font-semibold">Livret d&apos;accueil</h1>
      </header>
      <main className="screen-padding py-6">
        <div className="flex flex-1 items-center justify-center py-20">
          <p className="text-muted-foreground">D06 — Core Screens</p>
        </div>
      </main>
    </div>
  );
}
