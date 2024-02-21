import React, { useState, useContext } from 'react';
import Form, { Element, ValidationRule } from '@abymosa/develm-sg/dist/components/Form';
import { Col, Row } from '@abymosa/develm-sg/dist/components/Grid'
import Logo, { LogoType } from '@abymosa/develm-sg/dist/components/Logo'
import { Link, useNavigate } from 'react-router-dom';
import { AccountContext } from './Account';


const Login: React.FC = (props) => {

  const navigate = useNavigate();

  const initialForm = { email: '', password: '' }

  const [form, setForm] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const { authenticate } = useContext(AccountContext);

  const elements: Element[] = [
    { key: 'email', type: 'text', label: 'Email', rules: [ValidationRule.email] },
    { key: 'password', type: 'password', label: 'Password', rules: [ValidationRule.required] },
  ]

  const onSubmit = ({ email, password }: any) => {
    setErrors([]);
    setIsLoading(true);


    authenticate(email, password)
      .then((data: any) => {
        // console.log(data);
        setIsLoading(false);
        setForm(initialForm);
        navigate('/');

      })
      .catch((err: any) => {
        setErrors([err.message]);
        setIsLoading(false);
      })
  }

  return (
    <Row className='p-6'>
      <Row className='mb-4 df f-jc-center'>
        <Logo
          type={LogoType.TEXT}
          text='TRACK.IO'
          render={(t) => <Link to='/'>{t}</Link>}
        />
      </Row>
      <Row>
        <Col md6 mdOffset3 >
          <div className='df f-fd-column f-aa-center'>
            <h2 className='mb-0'>Login</h2>
            <p>Login to start using our tracker platform </p>
          </div>

          {errors.length > 0 &&
            <div className='df f-jc-center py-1'>
              {errors.map((err, i) => {
                return (
                  <div key={i} className='error'>{err}</div>
                )
              })
              }
            </div>

          }

          <div className='mt-4'>

            <Form
              isLoading={isLoading}
              blockBtn
              btnText='Login'
              btnSize='lg'
              theme='error'
              values={form}
              elements={elements}
              onSubmit={onSubmit}
              onChange={(x: any) => setForm(x)}
            />

          </div>
        </Col>

      </Row>

      {/* <Row className='mt-5 df f-jc-center'>
        <div className='df f-jc-center f-aa-center'>
          <div className='mr-2'>Already have an account? try</div>
          <Link to='/login'>login</Link>
        </div>
      </Row> */}


    </Row>
  )
};

export default Login;
