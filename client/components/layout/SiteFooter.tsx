import { Github, Instagram, Phone, Mail } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="container py-10 grid gap-8 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F7c2c842d462c4980be025beefe58c5ff%2F0f9e777d345b4c1fb0d55a0a66c6c64c?format=webp&width=200"
              alt="Abhijeet Mishra"
              className="h-8 w-8 rounded-full object-cover ring-1 ring-white/10"
            />
            <span className="font-semibold">Abhijeet Mishra</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            <span className="font-semibold text-foreground">MERN developer</span> • 5+ years • <span className="font-semibold text-foreground">Upwork</span> freelancer. Shipping <span className="font-semibold text-foreground">Jarvis</span>, <span className="font-semibold text-foreground">Nivaashub</span>, <span className="font-semibold text-foreground">AafnoShop</span> — based in Kathmandu, Nepal.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">Connect</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="https://github.com/AbhijeetMishra14" target="_blank" rel="noreferrer" className="hover:text-foreground text-muted-foreground inline-flex items-center gap-2">
                <Github className="h-4 w-4"/> GitHub
              </a>
            </li>
            <li>
              <a href="https://instagram.com/itsabhi0770" target="_blank" rel="noreferrer" className="hover:text-foreground text-muted-foreground inline-flex items-center gap-2">
                <Instagram className="h-4 w-4"/> Instagram
              </a>
            </li>
            <li>
              <a href="tel:+9779821765304" className="hover:text-foreground text-muted-foreground inline-flex items-center gap-2">
                <Phone className="h-4 w-4"/> +977 9821765304
              </a>
            </li>
            <li>
              <a href="mailto:abhijeetmishralyff@gmail.com" className="hover:text-foreground text-muted-foreground inline-flex items-center gap-2">
                <Mail className="h-4 w-4"/> abhijeetmishralyff@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Abhijeet Mishra. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
