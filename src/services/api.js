/**
 * Centralized API service for FlavorCraft Studio.
 * Interfaces with Forkify API v2 with support for custom base URLs via environment variables.
 */

export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  "https://forkify-api.herokuapp.com/api/v2/recipes";

/**
 * Search recipes by query term (e.g. pizza, pasta, chicken)
 * @param {string} query
 * @param {AbortSignal} [signal]
 * @returns {Promise<Array>} Array of recipe items
 */
export async function searchRecipes(query, signal) {
  if (!query || !query.trim()) return [];

  const encodedQuery = encodeURIComponent(query.trim());
  const response = await fetch(`${API_BASE_URL}?search=${encodedQuery}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch recipes (Status ${response.status})`);
  }

  const data = await response.json();
  return data?.data?.recipes || [];
}

/**
 * Fetch detailed recipe information including ingredients and cooking time
 * @param {string} id - Forkify Recipe ID
 * @param {AbortSignal} [signal]
 * @returns {Promise<Object>} Detailed recipe data object
 */
export async function getRecipeDetails(id, signal) {
  if (!id) throw new Error("Recipe ID is required");

  const response = await fetch(`${API_BASE_URL}/${id}`, { signal });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch recipe details for ID: ${id} (Status ${response.status})`
    );
  }

  const data = await response.json();
  if (!data?.data?.recipe) {
    throw new Error("Recipe data not found in response");
  }

  return data.data.recipe;
}

