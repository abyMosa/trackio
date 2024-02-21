import React, { useContext, useEffect, useState } from 'react';
import ToolBar from '@abymosa/develm-sg/dist/components/Toolbar'
import { Container, Row } from '@abymosa/develm-sg/dist/components/Grid'
import { Link } from 'react-router-dom';
import { Logo, LogoType } from '@abymosa/develm-sg';
import { AccountContext } from '../Components/Account';
import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';


const WithHeader = (props: any) => {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const { getSession, logout } = useContext(AccountContext);


  useEffect(() => {


    if (user) {
      return;
    }

    getSession()
      .then((x: any) => {
        // console.log('session', session);
        console.log('user', x.user);
        setUser(x.user);
        // setIsLoggedIn(true);
      })
      .catch(() => { });


  }, [user]);

  return (
    <div>
      <ToolBar primary>
        <Logo
          type={LogoType.TEXT}
          text='Trackio'
          render={(text) => <Link to='/'>{text}</Link>}
        />
        <ul>
          {user ?
            <>
              <li> <Link to='/settings' >settings</Link> </li>
              <li className='pointer' onClick={logout}> logout </li>
            </>
            :
            <>
              <li> <Link to='/login' >Login</Link> </li>
              <li> <Link to='/register' >Register</Link> </li>

            </>
          }
        </ul>

      </ToolBar>
      <Container>
        <Row>
          {props.children}
        </Row>
      </Container>
    </div>
  );
};

export default WithHeader;
function useStats(arg0: boolean): [any, any] {
  throw new Error('Function not implemented.');
}

