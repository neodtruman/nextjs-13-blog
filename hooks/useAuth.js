'use client';

import { AuthenticationContext } from '@/app/context/auth-context';
import { useContext } from 'react';
import CONSTANTS from '@/app/constants';
import { removeCookies } from 'cookies-next';

const useAuth = () => {
  const { setAuthState } = useContext(AuthenticationContext);

  const signup = ({ email, password, name }, callback) => {
    setAuthState({
      user: null,
      error: null,
      loading: true,
    });
    const reqBody = {
      email,
      password,
      name,
    };
    fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => data.json())
      .then((response) => {
        if (response.status === CONSTANTS.RESPONSE_STATUS.OK) {
          setAuthState({
            user: response.data.user,
            error: null,
            loading: false,
          });
          if (callback) {
            callback(response);
          }
        } else {
          setAuthState({
            user: null,
            error: response.data,
            loading: false,
          });
        }
      })
      .catch(() => {
        setAuthState({
          user: null,
          error: 'Internal Server Error',
          loading: false,
        });
      });
  };

  const signin = ({ email, password }, callback) => {
    setAuthState({
      user: null,
      error: null,
      loading: true,
    });
    const reqBody = {
      email,
      password,
    };
    fetch('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => data.json())
      .then((response) => {
        console.log(response);
        if (response.status === CONSTANTS.RESPONSE_STATUS.OK) {
          setAuthState({
            user: response.data.user,
            error: null,
            loading: false,
          });
          if (callback) {
            callback();
          }
        } else {
          setAuthState({
            user: null,
            error: response.data,
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setAuthState({
          user: null,
          error: 'Internal Server Error',
          loading: false,
        });
      });
  };

  const signout = () => {
    removeCookies('next-jwt');

    setAuthState({
      user: null,
      error: null,
      loading: false,
    });
  };

  return {
    signup,
    signin,
    signout,
  };
};
export default useAuth;
