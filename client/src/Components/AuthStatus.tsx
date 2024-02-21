import React, { useContext, useEffect, useState } from 'react';
import { AccountContext } from './Account';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import Btn from '@abymosa/develm-sg/dist/components/Btn';

const AuthStatus = () => {

  const [status, setStatus] = useState(false);
  const { getSession, logout } = useContext(AccountContext);

  useEffect(() => {
    getSession()
      .then((session: CognitoUserSession) => {
        // console.log('session', session);
        setStatus(true);
      })
      .catch(() => { });

  }, []);

  return (
    <div>
      {status ? <Btn text='logout' onClick={() => logout()} /> : "logged out"}
    </div>
  );
};

export default AuthStatus;
