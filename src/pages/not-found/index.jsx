import React from "react";
import { Link } from "react-router-dom";
import { UtensilsCrossed, Home, Sparkles, Heart } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Animated Icon */}
        <div className="relative mx-auto w-24 h-24 rounded-3xl bg-gradient-to-tr from-brand-500/20 to-amber-500/20 dark:from-brand-500/30 dark:to-amber-500/30 flex items-center justify-center text-brand-500 shadow-xl border border-brand-500/30">
          <UtensilsCrossed className="w-12 h-12 transform -rotate-12 animate-float" />
          <span className="absolute -top-2 -right-2 px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-500 text-white shadow-md">
            404
          </span>
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Recipe Not Found!
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Oops! The page or recipe you are looking for seems to have boiled
            over or doesn't exist on our menu.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-white font-bold text-sm shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Back to Kitchen (Home)</span>
          </Link>
          <Link
            to="/favorites"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Heart className="w-4 h-4 text-rose-500" />
            <span>Saved Favorites</span>
          </Link>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800">
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Craving something popular?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link
              to="/"
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-500/10 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
            >
              🍕 Pizza Recipes
            </Link>
            <Link
              to="/"
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-500/10 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
            >
              🍝 Pasta Dishes
            </Link>
            <Link
              to="/"
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-500/10 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
            >
              🥑 Vegan Bowls
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

