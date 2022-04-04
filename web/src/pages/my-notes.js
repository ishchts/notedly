import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_MY_NOTES } from '../gql/query';

import { NoteFeed } from '../components/note-feed'

const MyNotes = () => {
  const { loading, error, data } = useQuery(GET_MY_NOTES);

  useEffect(() => {
    document.title = 'My Notes — Notedly';
  });

  if (loading) return 'Loading...';

  if (error) return `Error! ${error.message}`;

  if (data.me.notes.length === 0) {
    return <p>No notes yet</p>;
  }

  return (
    <NoteFeed notes={data.me.notes} />
  )
};

export default MyNotes;