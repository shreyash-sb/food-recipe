import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { GlobalContext } from "../../context";
import {
  UtensilsCrossed,
  Search,
  Heart,
  ShoppingBag,
  Sun,
  Moon,
  X,
  History,
  Sparkles,
} from "lucide-react";

export default function Navbar() {
  const {
    searchParam,
    setSearchParam,
    handleSubmit,
    favoritesList,
    shoppingList,
    setIsShoppingOpen,
    darkMode,
    toggleDarkMode,
    recentSearches,
    removeRecentSearch,
  } = useContext(GlobalContext);

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectRecent = (term) => {
    setSearchParam(term);
    handleSubmit(null, term);
    setIsSearchFocused(false);
  };

  return (
    <header className="glass-nav sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="Food Recipe Home"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-amber-400 flex items-center justify-center text-white shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-6 h-6 transform group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                Flavor<span className="text-brand-500">Craft</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-500/90 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> Recipe Studio
              </span>
            </div>
          </Link>

          {/* Search Bar with Autocomplete/History Dropdown */}
          <div
            ref={searchContainerRef}
            className="relative flex-1 max-w-lg mx-2 hidden sm:block"
          >
            <form onSubmit={(e) => { setIsSearchFocused(false); handleSubmit(e); }}>
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  value={searchParam}
                  onChange={(e) => setSearchParam(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search 1,000,000+ recipes (e.g. pizza, pasta, tacos)..."
                  className="w-full pl-11 pr-10 py-2.5 text-sm bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-dark-card border border-slate-200 dark:border-slate-700/80 rounded-full outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all duration-200 shadow-inner"
                />
                {searchParam && (
                  <button
                    type="button"
                    onClick={() => setSearchParam("")}
                    className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </form>

            {/* Recent Searches Dropdown */}
            {isSearchFocused && recentSearches.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-card rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-3 z-50 animate-scale-in">
                <div className="flex items-center justify-between px-2 pb-2 mb-1 border-b border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5" /> Recent Searches
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 p-1">
                  {recentSearches.map((term) => (
                    <div
                      key={term}
                      className="group/item flex items-center gap-1.5 pl-3 pr-2 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-brand-500/10 dark:hover:bg-brand-500/20 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-medium cursor-pointer transition-colors border border-transparent hover:border-brand-500/30"
                    >
                      <button
                        type="button"
                        onClick={() => handleSelectRecent(term)}
                        className="text-left"
                      >
                        {term}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeRecentSearch(term);
                        }}
                        className="text-slate-400 hover:text-rose-500 transition-colors p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Navigation & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Home Link */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white"
                }`
              }
            >
              Home
            </NavLink>

            {/* Favorites Link */}
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  isActive
                    ? "bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white"
                }`
              }
            >
              <Heart
                className={`w-4 h-4 ${
                  favoritesList.length > 0 ? "text-rose-500 fill-rose-500" : ""
                }`}
              />
              <span className="hidden md:inline">Favorites</span>
              {favoritesList.length > 0 && (
                <span className="flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 text-[11px] font-extrabold bg-rose-500 text-white rounded-full shadow-sm">
                  {favoritesList.length}
                </span>
              )}
            </NavLink>

            {/* Shopping List Button */}
            <button
              onClick={() => setIsShoppingOpen(true)}
              className="relative p-2.5 sm:px-3.5 sm:py-2 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white transition-all flex items-center gap-2"
              title="Shopping Grocery List"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-500" />
              <span className="hidden md:inline">Groceries</span>
              {shoppingList.length > 0 && (
                <span className="flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 text-[11px] font-extrabold bg-emerald-500 text-white rounded-full shadow-sm">
                  {shoppingList.length}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white transition-transform active:scale-95"
              aria-label="Toggle theme"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600 hover:-rotate-12 transition-transform" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-4 sm:hidden">
          <form onSubmit={handleSubmit}>
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchParam}
                onChange={(e) => setSearchParam(e.target.value)}
                placeholder="Search recipes..."
                className="w-full pl-10 pr-9 py-2.5 text-sm bg-slate-100 dark:bg-slate-800 rounded-full outline-none focus:ring-2 focus:ring-brand-500 text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
              />
              {searchParam && (
                <button
                  type="button"
                  onClick={() => setSearchParam("")}
                  className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}