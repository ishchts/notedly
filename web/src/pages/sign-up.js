import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/user-form';


const SIGNUP_USER = gql`
 mutation signUp($email: String!, $username: String!, $password: String!) {
 signUp(email: $email, username: $username, password: $password)
 }
 `;

const SignUp = props => {
  const client = useApolloClient();

  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signUp);
      client.writeData({ data: { isLoggedIn: true } });
      props.history.push('/');
    }
  });


  useEffect(() => {
    // Обновляем заголовок документа
    document.title = 'Sign Up — Notedly';
  });

  return (
    <React.Fragment>
      <UserForm action={signUp} formType="signup" />
      {loading && <p>Loading...</p>}
      {error && <p>Error creating an account!</p>}
    </React.Fragment>
  )
};
export default SignUp;