import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 800);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-all duration-800 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      {/* Left wing */}
      <div className={`absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-brand/20 to-transparent transform transition-transform duration-700 ${isClosing ? '-translate-x-full' : 'translate-x-0'}`} />
      
      {/* Right wing */}
      <div className={`absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-brand-2/20 to-transparent transform transition-transform duration-700 ${isClosing ? 'translate-x-full' : 'translate-x-0'}`} />

      <div className="relative w-40 h-40 z-10">
        {/* Outer rotating circle */}
        <div className={`absolute inset-0 rounded-full border-4 border-transparent border-t-brand border-r-brand-2 ${isClosing ? '' : 'animate-spin'}`} style={{ animationDuration: "3s" }} />

        {/* Middle rotating circle (reverse) */}
        <div className={`absolute inset-4 rounded-full border-3 border-transparent border-b-brand border-l-brand-2 ${isClosing ? '' : 'animate-spin'}`} style={{ animationDuration: "4s", animationDirection: "reverse" }} />

        {/* Inner rotating circle */}
        <div className={`absolute inset-8 rounded-full border-2 border-transparent border-t-brand-2 border-r-brand ${isClosing ? '' : 'animate-spin'}`} style={{ animationDuration: "2.5s" }} />

        {/* Center logo/text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`text-2xl font-extrabold bg-gradient-to-r from-brand via-white to-brand-2 bg-clip-text text-transparent transition-all duration-700 ${isClosing ? 'scale-150 opacity-0' : 'scale-100 opacity-100 animate-pulse'}`}>
              AM
            </div>
            <div className={`text-xs text-muted-foreground mt-2 transition-all duration-700 ${isClosing ? 'opacity-0' : 'opacity-100 animate-bounce'}`}>Loading</div>
          </div>
        </div>

        {/* Pulsing glow */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-brand to-brand-2 opacity-20 ${isClosing ? 'opacity-0' : 'animate-pulse'}`} style={{ filter: "blur(20px)" }} />
      </div>

      {/* Loading dots animation */}
      <div className={`absolute bottom-20 flex gap-2 transition-all duration-700 ${isClosing ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}>
        <div className="w-3 h-3 rounded-full bg-brand animate-bounce" style={{ animationDelay: "0s" }} />
        <div className="w-3 h-3 rounded-full bg-brand-2 animate-bounce" style={{ animationDelay: "0.2s" }} />
        <div className="w-3 h-3 rounded-full bg-brand animate-bounce" style={{ animationDelay: "0.4s" }} />
      </div>
    </div>
  );
}
