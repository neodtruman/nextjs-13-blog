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

  return {
    signup,
  };
};
export default useAuth;
