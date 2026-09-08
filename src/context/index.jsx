import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [activeCategory, setActiveCategory] = useState("pizza");
  const [sortBy, setSortBy] = useState("default");
  const [isShoppingOpen, setIsShoppingOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const navigate = useNavigate();

  // 1. Dark Mode State with LocalStorage
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("food_app_theme");
      if (savedTheme !== null) {
        return savedTheme === "dark";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (darkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("food_app_theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("food_app_theme", "light");
      }
    } catch (e) {
      console.error(e);
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // 2. Favorites List with LocalStorage
  const [favoritesList, setFavoritesList] = useState(() => {
    try {
      const saved = localStorage.getItem("food_app_favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("food_app_favorites", JSON.stringify(favoritesList));
    } catch (e) {
      console.error(e);
    }
  }, [favoritesList]);

  // 3. Shopping List with LocalStorage
  const [shoppingList, setShoppingList] = useState(() => {
    try {
      const saved = localStorage.getItem("food_app_shopping_list");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("food_app_shopping_list", JSON.stringify(shoppingList));
    } catch (e) {
      console.error(e);
    }
  }, [shoppingList]);

  // 4. Recent Searches with LocalStorage
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem("food_app_recent_searches");
      return saved ? JSON.parse(saved) : ["pizza", "pasta", "salad", "burger"];
    } catch {
      return ["pizza", "pasta", "salad", "burger"];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("food_app_recent_searches", JSON.stringify(recentSearches));
    } catch (e) {
      console.error(e);
    }
  }, [recentSearches]);

  // 5. Toast System
  const showToast = useCallback((message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // 6. Fetch Recipes Helper
  const fetchRecipes = useCallback(
    async (query) => {
      if (!query || !query.trim()) return;
      setLoading(true);

      try {
        const res = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query.trim()}`
        );
        const data = await res.json();

        if (data?.data?.recipes) {
          setRecipeList(data.data.recipes);
        } else {
          setRecipeList([]);
        }

        // Add to recent searches if successful
        setRecentSearches((prev) => {
          const filtered = prev.filter(
            (item) => item.toLowerCase() !== query.trim().toLowerCase()
          );
          return [query.trim().toLowerCase(), ...filtered].slice(0, 8);
        });
      } catch (err) {
        console.error("API Error:", err);
        showToast("Failed to fetch recipes. Please check your connection.", "error");
      } finally {
        setLoading(false);
      }
    },
    [showToast]
  );

  // Initial trending load on startup so the home page is never empty
  useEffect(() => {
    fetchRecipes("pizza");
  }, [fetchRecipes]);

  // Handle Search Submission
  async function handleSubmit(e, directQuery = null) {
    if (e && e.preventDefault) e.preventDefault();
    const query = directQuery !== null ? directQuery : searchParam;
    if (!query || !query.trim()) return;

    await fetchRecipes(query);
    setSearchParam("");
    navigate("/");
  }

  // Handle Category Pill Click
  function handleCategoryClick(category) {
    setActiveCategory(category);
    fetchRecipes(category);
    navigate("/");
  }

  // Handle Favorite Toggle
  function handleAddToFavorite(item) {
    if (!item || !item.id) return;

    let copy = [...favoritesList];
    const index = copy.findIndex((i) => i.id === item.id);

    if (index === -1) {
      copy.push(item);
      setFavoritesList(copy);
      showToast(`Added "${item.title}" to Favorites! ❤️`, "favorite");

      // Celebrate with confetti micro-interaction
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#f97316", "#fb923c", "#fdba74", "#10b981", "#f43f5e"],
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      copy.splice(index, 1);
      setFavoritesList(copy);
      showToast(`Removed from Favorites`, "info");
    }
  }

  function isFavorite(id) {
    return favoritesList.some((item) => item.id === id);
  }

  // 7. Shopping List Actions
  function addIngredientsToShoppingList(ingredients, recipeTitle) {
    if (!ingredients || !ingredients.length) return;

    const newItems = ingredients.map((ing) => ({
      id: `${Date.now()}-${Math.random()}`,
      quantity: ing.quantity,
      unit: ing.unit,
      description: ing.description,
      recipeTitle: recipeTitle || "Recipe",
      completed: false,
    }));

    setShoppingList((prev) => [...prev, ...newItems]);
    showToast(`Added ${ingredients.length} ingredients to Shopping List! 🛒`, "success");
    setIsShoppingOpen(true);
  }

  function addCustomShoppingItem(text) {
    if (!text.trim()) return;
    const newItem = {
      id: `${Date.now()}-${Math.random()}`,
      quantity: "",
      unit: "",
      description: text.trim(),
      recipeTitle: "Custom",
      completed: false,
    };
    setShoppingList((prev) => [newItem, ...prev]);
    showToast("Added item to shopping list", "success");
  }

  function toggleShoppingItem(id) {
    setShoppingList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function removeFromShoppingList(id) {
    setShoppingList((prev) => prev.filter((item) => item.id !== id));
  }

  function clearShoppingList() {
    setShoppingList([]);
    showToast("Cleared shopping list", "info");
  }

  function clearRecentSearches() {
    setRecentSearches([]);
  }

  function removeRecentSearch(term) {
    setRecentSearches((prev) => prev.filter((t) => t !== term));
  }

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        handleSubmit,
        loading,
        recipeList,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddToFavorite,
        isFavorite,
        favoritesList,
        darkMode,
        toggleDarkMode,
        activeCategory,
        handleCategoryClick,
        sortBy,
        setSortBy,
        shoppingList,
        isShoppingOpen,
        setIsShoppingOpen,
        addIngredientsToShoppingList,
        addCustomShoppingItem,
        toggleShoppingItem,
        removeFromShoppingList,
        clearShoppingList,
        recentSearches,
        clearRecentSearches,
        removeRecentSearch,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}