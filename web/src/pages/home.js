import React from 'react';
import { useQuery } from "@apollo/client";

import {GET_NOTES} from "../gql/query";

import NoteFeed from '../components/note-feed';
import Button from '../components/button';

const Home = () => {
  const  { data, loading, error, fetchMore } = useQuery(GET_NOTES)
  if (loading) return <p>Loading...</p>;
  console.log('error', error)
  if (error) return <p>Error!</p>;
  console.log('data', data)

  return (
    <React.Fragment>
      <NoteFeed notes={data.noteFeed.notes} />
      {data.noteFeed.hasNextPage && (
        <Button
          onClick={() => {
            fetchMore({
              variables: {
                cursor: data.noteFeed.cursor
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                console.log('previousResult', previousResult)
                console.log('fetchMoreResult', fetchMoreResult)
                return {
                  noteFeed: {
                    cursor: fetchMoreResult.noteFeed.cursor,
                    hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                    notes: [
                      ...previousResult.noteFeed.notes,
                      ...fetchMoreResult.noteFeed.notes
                    ],
                    __typename: 'noteFeed'
                  }
                }
              }
            })
        }}
        >Load more</Button>
      )}
    </React.Fragment>
  )
};

export default Home;