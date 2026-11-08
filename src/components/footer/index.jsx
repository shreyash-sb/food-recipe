import React from "react";
import { Link } from "react-router-dom";
import { Heart, UtensilsCrossed, Sparkles } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-dark-card/50 backdrop-blur-md py-10 px-4 sm:px-6 lg:px-8 mt-auto no-print transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        {/* Brand */}
        <div className="flex flex-col items-center sm:items-start gap-1">
          <Link
            to="/"
            className="flex items-center gap-2 group"
            aria-label="FlavorCraft Home"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-amber-400 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-slate-800 dark:text-white">
              Flavor<span className="text-brand-500">Craft</span> Studio
            </span>
          </Link>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-brand-500" />
            Smart Recipe Discovery & Culinary Companion
          </p>
        </div>

        {/* Center Tagline */}
        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
          Crafted with{" "}
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline-block animate-pulse" />{" "}
          for passionate home chefs & food lovers.
        </p>

        {/* Quick info & copyright */}
        <div className="flex flex-col items-center sm:items-end text-xs text-slate-400 dark:text-slate-500">
          <span>Powered by Forkify API & React</span>
          <span className="text-[11px] mt-0.5">
            &copy; {currentYear} FlavorCraft Studio. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

