import React, { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";

import { GET_MY_NOTES, GET_NOTES } from '../gql/query';

import NoteForm from '../components/note-form';

const NEW_NOTE = gql`
  mutation newNote($content: String!) {
    newNote(content: $content) {
      id
      content
      createdAt
      favoriteCount
      favoriteBy {
        id
        username
      }
      author {
        username
        id
      }
    }
  }
`
const NewNote = (props) => {
  const [data, { loading, error }] = useMutation(NEW_NOTE, {
    refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
    onCompleted: data => {
      props.history.push(`note/${data.newNote.id}`);
    }
  });

  useEffect(() => {
    document.title = 'New Note — Notedly';
  }, [])

  return (
    <React.Fragment>
      {loading && <p>Loading...</p>}
      {error && <p>Error saving the note</p>}
      <NoteForm action={data} />
    </React.Fragment>
  );
}

export default NewNote;