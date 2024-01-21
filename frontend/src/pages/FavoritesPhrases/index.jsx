import { useContext } from "react";
import useAxios from "../../hooks/useAxios";
import userContext from "../../contexts/userContext";

import style from "./favoritesPhrases.module.scss";

export default function FavoritesPhrases() {
  const { user } = useContext(userContext);

  const favoritesData = useAxios({
    method: "GET",
    endpoint: `usersPhrases/favorites/${user?.id}`,
  });

  const phrasesData = useAxios({
    method: "GET",
    endpoint: `phrases`,
  });

  return (
    <div className={style.favoritesPhrases}>
      <h2 className={style.title}>Vous phrases favorites</h2>
      <div className={style.favoritesPhrasesContainer}>
        {favoritesData?.response?.map((favorite) => {
          const foundFavoritePhrase = phrasesData?.response?.find(
            (item) => item.id === favorite.phrase_id && favorite.is_favorite
          );
          return (
            <div
              key={favorite?.phrase_id}
              className={style.singleFavoritePhrase}
            >
              <p className={style.phrase}>{foundFavoritePhrase?.phrase}</p>
              <div className={style.authorContainer}>
                <p>
                  Auteur: <strong>{foundFavoritePhrase?.author}</strong>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
