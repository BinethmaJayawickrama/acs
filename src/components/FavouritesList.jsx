import { useContext } from "react";
import { FavouritesContext } from "../context/FavouritesContext";

export default function FavouritesList() {
  const { favourites, removeFavourite, clearFavourites } =
    useContext(FavouritesContext);

  return (
    <div>
      <h3>Favourites</h3>

      {favourites.map((p) => (
        <div key={p.id}>
          <p>{p.shortDescription}</p>
          <button onClick={() => removeFavourite(p.id)}>Remove</button>
        </div>
      ))}

      {favourites.length > 0 && <button onClick={clearFavourites}>Clear All</button>}
    </div>
  );
}
