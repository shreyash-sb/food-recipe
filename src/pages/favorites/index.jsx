import React, { useContext, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import RecipeItem from "../../components/recipe-item";
import { GlobalContext } from "../../context";
import {
  Heart,
  Search,
  Download,
  ArrowRight,
  UtensilsCrossed,
} from "lucide-react";

export default function Favorites() {
  const { favoritesList, showToast } = useContext(GlobalContext);
  const [filterText, setFilterText] = useState("");

  const filteredFavorites = useMemo(() => {
    if (!filterText.trim()) return favoritesList;
    const term = filterText.toLowerCase();
    return favoritesList.filter(
      (item) =>
        (item.title && item.title.toLowerCase().includes(term)) ||
        (item.publisher && item.publisher.toLowerCase().includes(term))
    );
  }, [favoritesList, filterText]);

  // Export Favorites as JSON / text file
  const handleExport = () => {
    if (favoritesList.length === 0) return;
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(favoritesList, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "my_favorite_recipes.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Exported favorites to JSON file! 📄", "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[80vh] animate-fade-in">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-500 shadow-sm">
            <Heart className="w-7 h-7 fill-rose-500" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Favorite Recipes
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {favoritesList.length === 0
                ? "No saved recipes yet"
                : `${favoritesList.length} saved delicious recipes`}
            </p>
          </div>
        </div>

        {/* Search within favorites & Export actions */}
        {favoritesList.length > 0 && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Filter Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="Filter saved recipes..."
                className="w-full sm:w-64 pl-10 pr-4 py-2 text-xs sm:text-sm bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-brand-500 text-slate-800 dark:text-slate-100 shadow-sm"
              />
            </div>

            {/* Export Button */}
            <button
              onClick={handleExport}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              title="Download backup of favorites"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        )}
      </div>

      {/* Grid of Saved Favorites */}
      {favoritesList.length > 0 ? (
        filteredFavorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-8">
            {filteredFavorites.map((item) => (
              <RecipeItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-slate-600 dark:text-slate-300 font-semibold mb-2">
              No saved recipes match "{filterText}"
            </p>
            <button
              onClick={() => setFilterText("")}
              className="text-xs font-bold text-brand-500 hover:underline"
            >
              Clear filter
            </button>
          </div>
        )
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center max-w-md mx-auto">
          <div className="w-24 h-24 rounded-full bg-rose-50 dark:bg-rose-950/30 text-rose-400 flex items-center justify-center mb-6 shadow-inner animate-float">
            <Heart className="w-12 h-12" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Your Recipe Box is Empty
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed">
            Click the heart icon on any recipe to save it here for quick access anytime, even after closing the browser!
          </p>
          <Link
            to="/"
            className="px-6 py-3.5 bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-brand-500/25 flex items-center gap-2 active:scale-95 transition-all"
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Discover Recipes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}