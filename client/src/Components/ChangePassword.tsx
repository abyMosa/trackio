import React, { useContext, useState } from 'react';
import { Col, Row } from '@abymosa/develm-sg/dist/components/Grid';
import Logo, { LogoType } from '@abymosa/develm-sg/dist/components/Logo';
import { Link } from 'react-router-dom';
import Form, { Element, ValidationRule } from '@abymosa/develm-sg/dist/components/Form';
import { AccountContext } from './Account';
import { CognitoUser } from 'amazon-cognito-identity-js';

const ChangePassword = (props: any) => {

  const { getSession } = useContext(AccountContext);

  const initialForm = { password: '', newPassword: '' }
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const elements: Element[] = [
    { key: 'password', type: 'password', label: 'Password', rules: [ValidationRule.required] },
    { key: 'newPassword', type: 'password', label: 'New Password', rules: [ValidationRule.required] },
  ]


  const onSubmit = (values: any) => {
    console.log(values);
    setIsLoading(true);
    setErrors([]);


    getSession().then(({ user }: { user: CognitoUser }) => {
      user.changePassword(values.password, values.newPassword, (err, results) => {
        if (err) {
          console.log('err', err);
          setErrors([err.message]);
        } else {
          console.log(results);

        }
        setIsLoading(false);
      })
    })
      .catch(() => { setIsLoading(false) })

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
            <h2 className='mb-0'>Change Password</h2>
            {/* <p>Change Password</p> */}
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
              btnText='Change Password'
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

export default ChangePassword;
