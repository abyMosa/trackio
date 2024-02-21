import React, { useState } from 'react';
import UserPool from '../UserPool';
import Form, { Element, ValidationRule } from '@abymosa/develm-sg/dist/components/Form';
import { Col, Row } from '@abymosa/develm-sg/dist/components/Grid'
import Logo, { LogoType } from '@abymosa/develm-sg/dist/components/Logo'
import { Link } from 'react-router-dom';




const Signup: React.FC = (props) => {

  const initialForm = { email: '', password: '' }

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<string[]>([]);


  const elements: Element[] = [
    { key: 'email', type: 'text', label: 'Email', rules: [ValidationRule.email] },
    { key: 'password', type: 'password', label: 'Password', rules: [ValidationRule.required] },
  ]

  const onSubmit = (values: any) => {
    console.log(values);
    UserPool.signUp(values.email, values.password, [], [], (err, data) => {
      if (err) {
        console.log('err', err);
        setErrors([err.message])
      } else {
        setErrors([])
      }

      console.log('data', data);

    });

  }

  return (
    <Row className='p-6'>
      <Row className='mb-5 df f-jc-center'>
        <Logo
          type={LogoType.TEXT}
          text='TRACK.IO'
          render={(t) => <Link to='/'>{t}</Link>}
        />
      </Row>
      <Row>
        <Col md6 mdOffset3 >
          <div className='df f-fd-column f-aa-center mb-4'>
            <h2 className='mb-0'>Register !</h2>
            <p>Register new user to start using our tracker platform </p>
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
              blockBtn
              btnSize='lg'
              btnText='Register'
              theme='error'
              values={form}
              elements={elements}
              onSubmit={onSubmit}
              onChange={(x: any) => setForm(x)}
            />
          </div>
        </Col>

      </Row>

      <Row className='mt-5 df f-jc-center'>
        <div className='df f-jc-center f-aa-center'>
          <div className='mr-2'>Already have an account? try</div>
          <Link to='/login'>login</Link>
        </div>
      </Row>


    </Row>
  )
};

export default Signup;
