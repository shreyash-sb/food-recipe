import React, { useContext, useMemo } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-item";
import {
  Sparkles,
  Flame,
  ArrowUpDown,
  Search,
  RotateCcw,
  ChefHat,
  TrendingUp,
} from "lucide-react";

const CATEGORIES = [
  { id: "pizza", label: "Pizza", emoji: "🍕" },
  { id: "pasta", label: "Pasta", emoji: "🍝" },
  { id: "burger", label: "Burgers", emoji: "🍔" },
  { id: "salad", label: "Salads", emoji: "🥗" },
  { id: "dessert", label: "Desserts", emoji: "🍰" },
  { id: "sushi", label: "Sushi", emoji: "🍣" },
  { id: "tacos", label: "Mexican", emoji: "🌮" },
  { id: "vegan", label: "Vegan", emoji: "🥑" },
  { id: "curry", label: "Curry", emoji: "🥘" },
  { id: "soup", label: "Soups", emoji: "🍲" },
  { id: "steak", label: "Steak", emoji: "🥩" },
  { id: "breakfast", label: "Breakfast", emoji: "🥞" },
  { id: "chicken", label: "Chicken", emoji: "🍗" },
  { id: "chocolate", label: "Chocolate", emoji: "🍫" },
];

export default function Home() {
  const {
    recipeList,
    loading,
    activeCategory,
    handleCategoryClick,
    searchParam,
    setSearchParam,
    handleSubmit,
    sortBy,
    setSortBy,
  } = useContext(GlobalContext);

  // Sorted list based on sortBy selector
  const sortedRecipes = useMemo(() => {
    if (!recipeList || recipeList.length === 0) return [];
    let list = [...recipeList];

    if (sortBy === "title-asc") {
      list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else if (sortBy === "title-desc") {
      list.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
    } else if (sortBy === "publisher-asc") {
      list.sort((a, b) => (a.publisher || "").localeCompare(b.publisher || ""));
    }
    return list;
  }, [recipeList, sortBy]);

  return (
    <div className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Decorative background blurs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/15 dark:bg-brand-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Gourmet & Home Recipes
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Discover & Cook <br />
            <span className="bg-gradient-to-r from-brand-600 via-amber-500 to-rose-500 bg-clip-text text-transparent">
              Culinary Masterpieces
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Search over 1,000,000+ top-rated recipes, scale ingredients effortlessly for any party size, and generate instant grocery lists.
          </p>

          {/* Hero Search Box */}
          <div className="pt-2 max-w-xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="flex items-center p-1.5 bg-white dark:bg-dark-card rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 transition-all focus-within:ring-2 focus-within:ring-brand-500"
            >
              <div className="pl-4 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchParam}
                onChange={(e) => setSearchParam(e.target.value)}
                placeholder="What are you craving today? (e.g. lasagna, tacos...)"
                className="w-full px-3 py-2 text-sm sm:text-base bg-transparent border-none outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-white font-bold text-sm shadow-md shadow-brand-500/25 active:scale-95 transition-all"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-3 px-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <Flame className="w-4 h-4 text-brand-500" />
            <span>Popular Categories</span>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-3 pt-1 scrollbar-none px-1">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 border ${
                    isActive
                      ? "bg-brand-500 text-white border-brand-500 shadow-lg shadow-brand-500/25 scale-105"
                      : "bg-white dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:border-brand-500/50 hover:bg-brand-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <span className="text-base">{cat.emoji}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Recipe Feed Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        {/* Results Header & Sort Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white capitalize">
                {activeCategory ? `${activeCategory} Recipes` : "Search Results"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {loading ? "Searching..." : `${sortedRecipes.length} recipes found`}
              </p>
            </div>
          </div>

          {/* Sort By Filter */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="sort-by-select"
              className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5"
            >
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
            </label>
            <select
              id="sort-by-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-brand-500 cursor-pointer shadow-sm"
            >
              <option value="default">Relevance (Default)</option>
              <option value="title-asc">Recipe Title (A - Z)</option>
              <option value="title-desc">Recipe Title (Z - A)</option>
              <option value="publisher-asc">Publisher (A - Z)</option>
            </select>
          </div>
        </div>

        {/* Recipes Grid / Skeleton Loading / Empty State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col bg-white dark:bg-dark-card border border-slate-200/60 dark:border-slate-800 rounded-3xl overflow-hidden p-0 shadow-sm"
              >
                <div className="h-52 skeleton-box" />
                <div className="p-5 space-y-3">
                  <div className="h-3 w-1/3 rounded skeleton-box" />
                  <div className="h-5 w-4/5 rounded skeleton-box" />
                  <div className="h-9 w-full rounded-2xl skeleton-box mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : sortedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-8 animate-fade-in">
            {sortedRecipes.map((item) => (
              <RecipeItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-20 h-20 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-500 flex items-center justify-center mb-5 shadow-inner">
              <ChefHat className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
              No Recipes Found
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mb-6 leading-relaxed">
              We couldn't find any recipes matching your query. Try searching for common terms like "pizza", "curry", "pasta", or explore our popular categories!
            </p>
            <button
              onClick={() => handleCategoryClick("pizza")}
              className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm rounded-2xl shadow-lg shadow-brand-500/25 flex items-center gap-2 active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Reset to Popular Recipes
            </button>
          </div>
        )}
      </section>
    </div>
  );
}