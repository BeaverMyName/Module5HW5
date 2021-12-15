import { observer } from 'mobx-react';
import React from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useInjection } from '../../ioc/ioc.react';
import ownTypes from '../../ioc/ownTypes';
import LoginStore from '../../stores/LoginStore';
import { useTranslation } from 'react-i18next';
import Error from '../../components/Error';
import AuthButtonSpinner from '../../components/AuthButtonSpinner';
import FormGroup from '../../components/AuthFormGroup';

const Login = observer(() => {
  const store = useInjection<LoginStore>(ownTypes.loginStore);
  const { t } = useTranslation(['login']);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={4} md={6} xs>
          <Form onSubmit={(ev)=>{ ev.preventDefault();
                                  store.login();
                                }}>
            <FormGroup
              id="formBasicEmail"
              label="Email address"
              type="email"
              placeholder={t('placeholder.email')}
              value={store.email}
              onChange={store.changeEmail}
            />
            <FormGroup
              id="formBasicPassword"
              label="Password"
              type="password"
              placeholder={t('placeholder.password')}
              value={store.password}
              onChange={store.changePassword}
            />
            {!!store.error && (
              <Error error={store.error}/>
            )}
            <AuthButtonSpinner isLoading={store.isLoading} text={`${t('submit')}`}/>
            {!!store.token && (
              <p className="mt-3 mb-3" style={{ color: 'green', fontSize: 14, fontWeight: 700 }}>{t('success', { token: store.token } )}</p>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  )
});

export default Login
