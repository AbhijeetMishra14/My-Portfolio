import { Outlet } from "react-router-dom";
import SiteHeader from "../layout/SiteHeader";
import SiteFooter from "../layout/SiteFooter";
import NebulaCanvas from "../effects/NebulaCanvas";

export default function Layout() {
  return (
    <div className="min-h-screen bg-black">
      <SiteHeader />
      <main className="relative">
        <NebulaCanvas />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,transparent_0_49%,hsl(var(--sidebar-border)/0.14)_50%,transparent_51%)] bg-[length:40px_40px]"></div>
        <div className="container relative py-12 md:py-16">
          <Outlet />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
