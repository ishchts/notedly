import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_NOTE } from '../gql/query'
import Note from '../components/note';


const NotePage = props => {
  const id = props.match.params.id;
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error! Note not found</p>;

  return <Note note={data.note} />;
};

export default NotePage;