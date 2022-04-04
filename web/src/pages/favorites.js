import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_MY_FAVORITES } from '../gql/query';

import NoteFeed from '../components/note-feed';

const Favorites = () => {
  const { loading, error, data } = useQuery(GET_MY_FAVORITES);

  useEffect(() => {
    document.title = 'Favorites — Notedly';
  });

  if (loading) return 'Loading...';

  if (error) return `Error! ${error.message}`;

  if (data.me.favorites.length === 0) {
    return <p>No favorites yet</p>;

  }

  return <NoteFeed notes={data.me.favorites} />;
};
export default Favorites;