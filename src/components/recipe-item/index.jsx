import { Link } from "react-router-dom";

export default function RecipeItem({ item }) {
  return (
    <div className="flex flex-col w-80 p-5 bg-white shadow-xl gap-5 rounded-2xl">
      <div className="h-40 overflow-hidden rounded-xl">
        <img
          src={item?.image_url}
          alt="recipe"
          className="w-full h-full object-cover"
        />
      </div>

      <span className="text-sm text-cyan-700">
        {item?.publisher}
      </span>

      <h3 className="font-bold text-xl text-black">
        {item?.title}
      </h3>

      <Link
        to={`/recipe-item/${item?.id}`}
        className="p-3 text-center rounded-lg bg-black text-white"
      >
        Recipe Details
      </Link>
    </div>
  );
}