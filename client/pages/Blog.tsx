export default function Blog() {
  return (
    <section>
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Blog</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">Tutorials, tips, and breakdowns. Ask to import real posts or connect to a CMS.</p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1,2,3].map((i)=> (
          <article key={i} className="rounded-xl border border-white/10 bg-card/40 p-5 transition hover:border-brand">
            <div className="text-xs text-brand font-semibold">Electronics</div>
            <h3 className="mt-2 text-lg font-semibold">How to build thing {i}</h3>
            <p className="mt-1 text-sm text-muted-foreground">Replace with your article excerpt.</p>
          </article>
        ))}
      </div>
    </section>
  );
}
