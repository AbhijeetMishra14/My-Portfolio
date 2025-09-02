import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <section className="py-16 text-center">
      <h1 className="text-6xl font-extrabold tracking-tight">404</h1>
      <p className="mt-2 text-muted-foreground">Oops! Page not found</p>
      <a href="/" className="mt-6 inline-block rounded-md border border-white/10 px-4 py-2 text-sm font-semibold hover:border-brand">
        Return to Home
      </a>
    </section>
  );
};

export default NotFound;
