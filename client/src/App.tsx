import React from 'react';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Pages/Home';
import Wrapper from '@abymosa/develm-sg/dist/components/Wrapper';
import { Routes, Route, Navigate } from 'react-router-dom';
import layoutWrapper from "./HOC/layoutWrapper";
import WithHeader from './HOC/WithHeader';
import { Account } from './Components/Account';
import ChangePassword from './Components/ChangePassword';

function App() {
  return (
    <Wrapper>
      <Account>
        <Routes>
          <Route path='/register' Component={Signup} />
          <Route path='/login' Component={Login} />
          <Route path='/settings' Component={ChangePassword} />
          <Route path='/' Component={layoutWrapper(WithHeader, Home)} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Account>
    </Wrapper>

  );
}

export default App;
