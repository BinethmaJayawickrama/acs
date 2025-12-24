import { useContext } from "react";
import { FavouritesContext } from "../context/FavouritesContext";

export default function FavouriteButton({ property }) {
  const { addFavourite } = useContext(FavouritesContext);

  return <button onClick={() => addFavourite(property)}>Add to Favourites</button>;
}
