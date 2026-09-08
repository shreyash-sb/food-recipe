import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context";
import { Heart, Clock, ChefHat, ArrowRight, Utensils } from "lucide-react";

export default function RecipeItem({ item }) {
  const { handleAddToFavorite, isFavorite } = useContext(GlobalContext);
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const favorited = isFavorite(item?.id);

  // Approximate cooking time if not provided in search list
  const estimatedTime = item?.cooking_time || 35;

  return (
    <div className="group relative flex flex-col w-full bg-white dark:bg-dark-card border border-slate-200/80 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-brand-500/10 hover:-translate-y-1.5 transition-all duration-300">
      {/* Image Container */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 skeleton-box" />
        )}

        {imgError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 dark:from-slate-800 dark:to-slate-900 text-brand-500 p-4 text-center">
            <Utensils className="w-10 h-10 mb-2 opacity-60" />
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {item?.title}
            </span>
          </div>
        ) : (
          <img
            src={item?.image_url}
            alt={item?.title}
            onError={() => setImgError(true)}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Floating Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToFavorite(item);
          }}
          className={`absolute top-3.5 right-3.5 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 active:scale-90 shadow-lg ${
            favorited
              ? "bg-rose-500 text-white shadow-rose-500/30 scale-105"
              : "bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-900 hover:text-rose-500"
          }`}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-300 ${
              favorited ? "fill-white scale-110" : "group-hover:scale-110"
            }`}
          />
        </button>

        {/* Time estimate badge */}
        <div className="absolute bottom-3.5 left-3.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-sm">
          <Clock className="w-3 h-3 text-amber-400" />
          <span>{estimatedTime} mins</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Publisher Tag */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
          <ChefHat className="w-3.5 h-3.5" />
          <span className="truncate">{item?.publisher}</span>
        </div>

        {/* Recipe Title */}
        <h3
          className="font-bold text-base text-slate-800 dark:text-white line-clamp-2 leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors"
          title={item?.title}
        >
          {item?.title}
        </h3>

        {/* View Details Action Link */}
        <div className="mt-auto pt-2">
          <Link
            to={`/recipe-item/${item?.id}`}
            className="w-full py-2.5 px-4 rounded-2xl bg-slate-100 hover:bg-brand-500 dark:bg-slate-800 dark:hover:bg-brand-500 text-slate-800 dark:text-slate-200 hover:text-white dark:hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all duration-200 group/btn shadow-sm"
          >
            <span>View Recipe</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}