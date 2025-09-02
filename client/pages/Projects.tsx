export default function Projects() {
  return (
    <section>
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Projects</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">Showcase of builds and experiments. Ask to populate this page with your real projects and case studies.</p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1,2,3,4,5,6].map((i)=> (
          <article key={i} className="group relative overflow-hidden rounded-xl border border-white/10 bg-card/40 p-4 transition hover:border-brand">
            <div className="aspect-video rounded-lg bg-gradient-to-br from-brand/20 to-brand-2/20" />
            <h3 className="mt-4 font-semibold">Project {i}</h3>
            <p className="text-sm text-muted-foreground">Add your project details here.</p>
          </article>
        ))}
      </div>
    </section>
  );
}
