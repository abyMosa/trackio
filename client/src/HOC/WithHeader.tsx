import React, { useContext, useEffect, useState } from 'react';
import ToolBar from '@abymosa/develm-sg/dist/components/Toolbar'
import { Container, Row } from '@abymosa/develm-sg/dist/components/Grid'
import { Link } from 'react-router-dom';
import { Logo, LogoType } from '@abymosa/develm-sg';
import { useAuth } from '../Components/AuthProvider';


const WithHeader = (props: any) => {

  const { authState, logout } = useAuth();

  return (
    <div>
      <ToolBar primary>
        <Logo
          type={LogoType.TEXT}
          text='Trackio'
          render={(text) => <Link to='/'>{text}</Link>}
        />
        <ul>
          {authState ?
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

