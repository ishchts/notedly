import React from 'react';
import { useQuery } from '@apollo/client';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../img/logo.svg';

import { IS_LOGGED_IN } from '../gql/query'

import ButtonAsLink from './button-as-link';

const UserState = styled.div`
 margin-left: auto;
 `;

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

const Header = (props) => {
  const { data, client } = useQuery(IS_LOGGED_IN);

  return (
    <HeaderBar>
      <img src={logo} alt="Notedly Logo" height="40" />
      <LogoText>Notedly</LogoText>
      <UserState>
        {data.isLoggedIn
          ? (
            <ButtonAsLink
              onClick={() => {
                localStorage.removeItem('token');
                client.resetStore();
                client.writeData({ data: { isLoggedIn: false } });
                props.history.push('/');
              }}
            >
              Logout
            </ButtonAsLink>
          )
          : (
            <p>
              <Link to={'/sign-in'}>Sign In</Link> or{' '}
              <Link to={'/sign-up'}>Sign Up</Link>
            </p>
          )}
      </UserState>
    </HeaderBar>
  );
};

export default withRouter(Header);