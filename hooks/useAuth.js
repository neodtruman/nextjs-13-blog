'use client';

import CONSTANTS from '@/app/constants';

const useAuth = () => {
  const signup = ({ email, password, name }, callback) => {
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
          if (callback) {
            callback(response);
          }
        }
      })
      .catch(() => {});
  };

  const signin = ({ email, password }, callback) => {
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
          if (callback) {
            callback();
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    signup,
    signin,
  };
};
export default useAuth;
