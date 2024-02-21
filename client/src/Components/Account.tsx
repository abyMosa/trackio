import React, { createContext } from 'react';
import { CognitoUser, AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js'
import Pool from '../UserPool';

const AccountContext = createContext<any>({});

const Account = (props: any) => {

  const getSession = () => {
    return new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession(async (err: Error, session: CognitoUserSession | null) => {
          if (err) {
            reject(err);
          } else {
            const attributes: Record<string, string> = await new Promise((resolve, reject) => {
              user.getUserAttributes((err, attributes) => {
                if (err || attributes === undefined) {
                  reject(err);
                } else {
                  const results: Record<string, string> = {};
                  for (let attr of attributes) {
                    const { Name, Value } = attr;
                    results[Name] = Value;
                  }
                  resolve(results);
                }
              });
            });

            resolve({ user, ...session, ...attributes })
          }
        })
      } else {
        reject();
      }
    });
  }

  const authenticate = async (Username: string, Password: string) => {

    return new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool })
      const authDetails = new AuthenticationDetails({ Username, Password })

      user.authenticateUser(authDetails, {
        onSuccess: data => resolve(data),
        onFailure: err => reject(err),
        newPasswordRequired: data => resolve(data)
      });

    })
  }

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
    }
  }

  return (
    <AccountContext.Provider value={{ authenticate, getSession, logout }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
