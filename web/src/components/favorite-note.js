import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { TOGGLE_FAVORITE } from '../gql/mutation';
import { GET_MY_FAVORITES } from '../gql/query';

import ButtonAsLink from './button-as-link';

const FavoriteNote = props => {
  const [count, setCount] = useState(props.favoriteCount);
  const [favorite, setFavorite] = useState(
    props.me.favorites.filter(note => note.id === props.noteId).length > 0
  );

  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    variables: {
      id: props.noteId
    },
    refetchQueries: [{ query: GET_MY_FAVORITES }]
  });

  return (
    <React.Fragment>
      {favorite ? (
        <ButtonAsLink
          onClick={() => {
            setFavorite(false);
            setCount(count - 1);
          }}
        >
          Remove Favorite
        </ButtonAsLink>
        ) : (
          <ButtonAsLink
            onClick={() => {
              setFavorite(true);
              setCount(count + 1);
            }}
          >
            Add Favorite
          </ButtonAsLink>
        )}
      :
      {count}
    </React.Fragment>
  )
};
export default FavoriteNote;