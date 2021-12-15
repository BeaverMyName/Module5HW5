import React from 'react';
import { observer } from 'mobx-react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useInjection } from '../../ioc/ioc.react';
import ownTypes from '../../ioc/ownTypes';
import type RegisterStore from '../../stores/RegisterStore';
import Error from '../../components/Error';
import { useTranslation } from 'react-i18next';
import AuthButtonSpinner from '../../components/AuthButtonSpinner';
import FormGroup from '../../components/AuthFormGroup/AuthFormGroup';

const Register = observer(() => {
    const store = useInjection<RegisterStore>(ownTypes.registerStore);
    const { t } = useTranslation(['register']);

    return (
        <Container>
            <Row className="justify-content-center">
                <Col lg={4} md={6} xs>
                    <Form onSubmit={(ev) => {
                        ev.preventDefault();
                        store.register();
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
                        <FormGroup
                            id="formConfirmPassword"
                            label="Password confirmation"
                            type="password"
                            placeholder={t('placeholder.password')}
                            value={store.passwordConfirmation}
                            onChange={store.changePasswordConfirmation}
                        />
                        { !!store.error && (
                            <Error error={store.error}/>
                        )}
                        <AuthButtonSpinner isLoading={store.isLoading} text={`${t('submit')}`}/>
                        {!!store.token && (
                            <p className="mt-3 mb-3" style={{color: "green", fontSize: 14, fontWeight: 700}}>{t('success', { token: store.token })}</p>
                        )}
                    </Form>
                </Col>
            </Row>
        </Container>
    )
})

export default Register;