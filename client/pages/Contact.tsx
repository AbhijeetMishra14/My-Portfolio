export default function Contact() {
  return (
    <section className="max-w-2xl">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Contact</h1>
        <p className="mt-2 text-muted-foreground">Get in touch for collaborations, consulting, or questions.</p>
      </header>
      <form className="space-y-4" onSubmit={(e)=>e.preventDefault()}>
        <div className="grid gap-4 sm:grid-cols-2">
          <input className="rounded-md border border-white/10 bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand" placeholder="First name"/>
          <input className="rounded-md border border-white/10 bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand" placeholder="Last name"/>
        </div>
        <input type="email" className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand" placeholder="Email"/>
        <textarea rows={5} className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand" placeholder="Message"></textarea>
        <button className="rounded-md bg-gradient-to-r from-brand to-brand-2 px-5 py-2 text-sm font-semibold text-white shadow-[0_0_20px_hsl(var(--brand)/0.6)]">Send</button>
      </form>
    </section>
  );
}
