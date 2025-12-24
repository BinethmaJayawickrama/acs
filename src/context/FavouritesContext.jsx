import { createContext, useState } from "react";

export const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState([]);

  const addFavourite = (property) => {
    setFavourites((prev) =>
      prev.find((p) => p.id === property.id) ? prev : [...prev, property]
    );
  };

  const removeFavourite = (id) => {
    setFavourites((prev) => prev.filter((p) => p.id !== id));
  };

  const clearFavourites = () => setFavourites([]);

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite, clearFavourites }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}
