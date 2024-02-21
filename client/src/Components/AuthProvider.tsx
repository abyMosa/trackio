import React, { createContext, useContext, useEffect, useState } from 'react';
import { CognitoUser, AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js'
import Pool from '../UserPool';


type AuthState = Authenticated | null;

interface Authenticated {
  user: CognitoUser,
  attributes: Record<string, string>,
  session: CognitoUserSession | null
}


const AuthContext = createContext<any>({});


const useAuth = () => {
  return useContext(AuthContext);
}

const AuthProvider = (props: any) => {

  const [authState, setAuthState] = useState<AuthState>(null);

  useEffect(() => {
    getSession()
      .then((x) => setAuthState(x))
      .catch((_) => setAuthState(null))
  }, []);

  const getUserAttrs = async (user: CognitoUser) => {
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
    return attributes;
  }


  const getSession = (): Promise<Authenticated> => {
    return new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession(async (err: Error, session: CognitoUserSession | null) => {
          if (err) {
            reject(err);
          } else {
            const attributes = await getUserAttrs(user);
            resolve({ user, session, attributes })
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
        onSuccess: async (session: CognitoUserSession) => {
          const attributes = await getUserAttrs(user);

          setAuthState({ user, session, attributes })
          resolve(session);
        },
        onFailure: err => reject(err),
        newPasswordRequired: data => resolve(data)
      });

    })
  }

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
      setAuthState(null);
    }
  }

  return (
    <AuthContext.Provider value={{ authenticate, getSession, logout, authState: authState }}>
      {props.children}
    </AuthContext.Provider>
  );
};



export { AuthProvider, useAuth, AuthContext };
