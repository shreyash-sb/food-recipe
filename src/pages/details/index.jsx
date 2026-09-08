import React, { useContext, useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalContext } from "../../context";
import CookingTimer from "../../components/cooking-timer";
import RecipeItem from "../../components/recipe-item";
import {
  Heart,
  Clock,
  Users,
  ChefHat,
  ExternalLink,
  Share2,
  Printer,
  Check,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Sparkles,
  Utensils,
  BookOpen,
} from "lucide-react";

export default function Details() {
  const { id } = useParams();
  const {
    recipeDetailsData,
    setRecipeDetailsData,
    handleAddToFavorite,
    isFavorite,
    addIngredientsToShoppingList,
    showToast,
    recipeList,
  } = useContext(GlobalContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [servings, setServings] = useState(4);
  const [baseServings, setBaseServings] = useState(4);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [imgError, setImgError] = useState(false);

  const favorited = isFavorite(id);

  // Fetch recipe details
  useEffect(() => {
    async function getRecipeDetails() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );
        const data = await response.json();

        if (data?.data?.recipe) {
          setRecipeDetailsData(data.data);
          const initialServings = data.data.recipe.servings || 4;
          setBaseServings(initialServings);
          setServings(initialServings);
          setCheckedIngredients({});
        } else {
          setError("Recipe details not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load recipe details.");
      } finally {
        setLoading(false);
      }
    }

    getRecipeDetails();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, setRecipeDetailsData]);

  const recipe = recipeDetailsData?.recipe;

  // Toggle checklist item
  const toggleIngredientCheck = (index) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Adjust Servings
  const adjustServings = (delta) => {
    setServings((prev) => Math.max(1, prev + delta));
  };

  // Share recipe link
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Recipe link copied to clipboard!", "success");
    }
  };

  // Print recipe
  const handlePrint = () => {
    window.print();
  };

  // Scaled ingredients calculation
  const scaledIngredients = useMemo(() => {
    if (!recipe?.ingredients) return [];
    const multiplier = servings / (baseServings || 4);

    return recipe.ingredients.map((ing, idx) => {
      let scaledQty = "";
      if (ing.quantity) {
        const calculated = ing.quantity * multiplier;
        // Format to nice decimals or fractions
        scaledQty =
          calculated % 1 === 0
            ? calculated
            : calculated < 1
            ? calculated.toFixed(2).replace(/\.?0+$/, "")
            : calculated.toFixed(1).replace(/\.?0+$/, "");
      }

      return {
        ...ing,
        scaledQuantity: scaledQty,
        index: idx,
      };
    });
  }, [recipe?.ingredients, servings, baseServings]);

  // Count checked ingredients
  const checkedCount = Object.values(checkedIngredients).filter(Boolean).length;
  const totalIngredients = scaledIngredients.length;
  const progressPercent = totalIngredients > 0 ? (checkedCount / totalIngredients) * 100 : 0;

  // Related recipes from recipeList (excluding current)
  const relatedRecipes = useMemo(() => {
    if (!recipeList || recipeList.length === 0) return [];
    return recipeList.filter((r) => r.id !== id).slice(0, 4);
  }, [recipeList, id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="h-6 w-32 rounded-xl skeleton-box mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6 h-[480px] rounded-3xl skeleton-box" />
          <div className="lg:col-span-6 space-y-6">
            <div className="h-8 w-3/4 rounded-xl skeleton-box" />
            <div className="h-4 w-1/3 rounded skeleton-box" />
            <div className="h-24 w-full rounded-2xl skeleton-box" />
            <div className="h-48 w-full rounded-2xl skeleton-box" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="max-w-xl mx-auto py-24 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-500 flex items-center justify-center mx-auto mb-4">
          <Utensils className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
          {error || "Recipe not found"}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
          The recipe details could not be retrieved from the server.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 text-white rounded-2xl font-semibold text-sm shadow-lg shadow-brand-500/25 hover:bg-brand-600 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Navigation Breadcrumbs & Back */}
      <div className="flex items-center justify-between mb-6 no-print">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to all recipes
        </Link>

        {/* Quick action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-brand-500 hover:border-brand-500 shadow-sm transition-all text-xs font-semibold flex items-center gap-1.5"
            title="Share Recipe"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
          <button
            onClick={handlePrint}
            className="p-2.5 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-brand-500 hover:border-brand-500 shadow-sm transition-all text-xs font-semibold flex items-center gap-1.5"
            title="Print Recipe"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print</span>
          </button>
        </div>
      </div>

      {/* Main Recipe Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Media & Actions & Timer */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Recipe Image Banner */}
          <div className="relative group rounded-3xl overflow-hidden shadow-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 h-[380px] sm:h-[440px]">
            {imgError ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 dark:from-slate-800 dark:to-slate-900 text-brand-500 p-6 text-center">
                <ChefHat className="w-16 h-16 mb-2 opacity-50" />
                <span className="font-bold text-lg text-slate-700 dark:text-slate-200">
                  {recipe.title}
                </span>
              </div>
            ) : (
              <img
                src={recipe.image_url}
                alt={recipe.title}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            {/* Floating Top Buttons */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={() => handleAddToFavorite(recipe)}
                className={`p-3 rounded-full backdrop-blur-md shadow-xl transition-all duration-300 active:scale-90 ${
                  favorited
                    ? "bg-rose-500 text-white shadow-rose-500/40 scale-105"
                    : "bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-white hover:text-rose-500"
                }`}
                aria-label={favorited ? "Remove favorite" : "Add to favorites"}
              >
                <Heart
                  className={`w-5 h-5 ${favorited ? "fill-white" : ""}`}
                />
              </button>
            </div>

            {/* Bottom Title on Image (Mobile friendly) */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-widest mb-1">
                <ChefHat className="w-3.5 h-3.5" />
                <span>{recipe.publisher}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold line-clamp-2 drop-shadow-md">
                {recipe.title}
              </h1>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium">Prep & Cook</span>
                <p className="text-sm font-bold text-slate-800 dark:text-white">
                  {recipe.cooking_time || 45} mins
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium">Servings</span>
                <p className="text-sm font-bold text-slate-800 dark:text-white">
                  {servings} Portions
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3 col-span-2 sm:col-span-1">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium">Ingredients</span>
                <p className="text-sm font-bold text-slate-800 dark:text-white">
                  {scaledIngredients.length} Items
                </p>
              </div>
            </div>
          </div>

          {/* Cooking Timer Tool */}
          <div className="no-print">
            <CookingTimer defaultMinutes={recipe.cooking_time || 30} />
          </div>

          {/* Original Directions & Source Link Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl space-y-4">
            <div className="flex items-center gap-2.5 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Publisher Instructions</span>
            </div>
            <h3 className="text-lg font-bold leading-snug">
              How to Cook this Recipe
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              This recipe was crafted and tested by{" "}
              <span className="font-semibold text-white">{recipe.publisher}</span>.
              Visit their original website for step-by-step cooking directions and author notes.
            </p>
            {recipe.source_url && (
              <a
                href={recipe.source_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-lg shadow-brand-500/30 transition-all duration-200 active:scale-95"
              >
                <span>Read Full Directions</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Interactive Ingredients & Servings Scaler */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Details Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
            {/* Header & Servings Scaler */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Recipe Ingredients
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Check off items as you prepare, or scale quantities for your party!
                </p>
              </div>

              {/* Servings Scaler Controls */}
              <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 pl-2">
                  Servings:
                </span>
                <div className="flex items-center gap-1.5 bg-white dark:bg-dark-card px-2 py-1 rounded-xl shadow-sm">
                  <button
                    onClick={() => adjustServings(-1)}
                    disabled={servings <= 1}
                    className="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 transition-colors"
                    title="Decrease Servings"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-extrabold text-sm text-brand-600 dark:text-brand-400 min-w-[1.5rem] text-center">
                    {servings}
                  </span>
                  <button
                    onClick={() => adjustServings(1)}
                    className="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    title="Increase Servings"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Preparation Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span>Ingredient Prep Checklist</span>
                <span className="text-brand-600 dark:text-brand-400 font-bold">
                  {checkedCount} of {totalIngredients} ready ({Math.round(progressPercent)}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-brand-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Ingredients Checklist */}
            <div className="space-y-2.5">
              {scaledIngredients.map((ingredient) => {
                const isChecked = !!checkedIngredients[ingredient.index];

                return (
                  <div
                    key={ingredient.index}
                    onClick={() => toggleIngredientCheck(ingredient.index)}
                    className={`group flex items-start gap-3.5 p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
                      isChecked
                        ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/30 dark:border-emerald-500/20"
                        : "bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800/80 border-slate-200/70 dark:border-slate-800/70 hover:border-brand-500/40"
                    }`}
                  >
                    {/* Custom Checkbox */}
                    <div
                      className={`w-5 h-5 mt-0.5 rounded-lg flex items-center justify-center border transition-all shrink-0 ${
                        isChecked
                          ? "bg-emerald-500 border-emerald-500 text-white shadow-sm"
                          : "border-slate-300 dark:border-slate-600 group-hover:border-brand-500 bg-white dark:bg-slate-800"
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>

                    {/* Quantity & Description */}
                    <div className="flex-1 text-sm leading-tight">
                      <span
                        className={`font-bold mr-1.5 ${
                          isChecked
                            ? "text-emerald-700 dark:text-emerald-400"
                            : "text-brand-600 dark:text-brand-400"
                        }`}
                      >
                        {ingredient.scaledQuantity}{" "}
                        {ingredient.unit ? `${ingredient.unit}` : ""}
                      </span>
                      <span
                        className={`font-medium ${
                          isChecked
                            ? "line-through text-slate-400 dark:text-slate-500"
                            : "text-slate-800 dark:text-slate-200"
                        }`}
                      >
                        {ingredient.description}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add All to Shopping List Button */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() =>
                  addIngredientsToShoppingList(
                    scaledIngredients.map((i) => ({
                      quantity: i.scaledQuantity,
                      unit: i.unit,
                      description: i.description,
                    })),
                    recipe.title
                  )
                }
                className="flex-1 py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-95 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add All to Shopping List</span>
              </button>

              <button
                onClick={() => handleAddToFavorite(recipe)}
                className={`py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 border transition-all active:scale-95 ${
                  favorited
                    ? "bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/25"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300"
                }`}
              >
                <Heart className={`w-4 h-4 ${favorited ? "fill-white" : ""}`} />
                <span>{favorited ? "Saved in Favorites" : "Add to Favorites"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related / Recommended Recipes Section */}
      {relatedRecipes.length > 0 && (
        <section className="mt-16 pt-12 border-t border-slate-200/80 dark:border-slate-800 no-print">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  You Might Also Like
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Explore other delicious recipes from your current search
                </p>
              </div>
            </div>
            <Link
              to="/"
              className="text-xs font-bold text-brand-500 hover:text-brand-600 transition-colors"
            >
              Explore all →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedRecipes.map((item) => (
              <RecipeItem key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}