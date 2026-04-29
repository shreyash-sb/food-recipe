import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";

export default function Details() {
  const { id } = useParams();
  const {
    recipeDetailsData,
    setRecipeDetailsData,
    favoritesList,
    handleAddToFavorite,
  } = useContext(GlobalContext);

  useEffect(() => {
    async function getRecipeDetails() {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await response.json();

      if (data?.data) {
        setRecipeDetailsData(data.data);
      }
    }

    getRecipeDetails();
  }, [id, setRecipeDetailsData]);

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div>
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            src={recipeDetailsData?.recipe?.image_url}
            alt="recipe"
            className="w-full h-full object-cover group-hover:scale-105 duration-300"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-sm text-cyan-700 font-medium">
          {recipeDetailsData?.recipe?.publisher}
        </span>

        <h3 className="font-bold text-2xl text-black">
          {recipeDetailsData?.recipe?.title}
        </h3>

        <button
          onClick={() => handleAddToFavorite(recipeDetailsData?.recipe)}
          className="p-3 px-8 rounded-lg text-sm uppercase font-medium mt-3 shadow-md bg-black text-white"
        >
          {favoritesList.findIndex(
            (item) => item.id === recipeDetailsData?.recipe?.id
          ) !== -1
            ? "Remove from favorites"
            : "Add to favorites"}
        </button>

        <div>
          <span className="text-2xl font-semibold text-black">
            Ingredients:
          </span>

          <ul className="flex flex-col gap-3 mt-3">
            {recipeDetailsData?.recipe?.ingredients?.map((ingredient, index) => (
              <li key={index}>
                <span className="text-black">
                  {ingredient.quantity} {ingredient.unit}{" "}
                  {ingredient.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}