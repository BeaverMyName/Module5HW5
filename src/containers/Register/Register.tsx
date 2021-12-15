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
                    <Form 
                        onSubmit={(ev) => {
                        ev.preventDefault();
                        store.register(); 
                    }}
                    >
                        <Row>
                            <Col>
                                <FormGroup
                                    id="formFirstName"
                                    label="First name"
                                    type="text"
                                    placeholder={t('placeholder.firstName')}
                                    value={store.firstName}
                                    onChange={store.changeFirstName}
                                />
                            </Col>
                            <Col>
                                <FormGroup
                                    id="formLastName"
                                    label="Last name"
                                    type="text"
                                    placeholder={t('placeholder.lastName')}
                                    value={store.lastName}
                                    onChange={store.changeLastName}
                                />
                            </Col>
                        </Row>  
                        <FormGroup
                            id="formBasicEmail"
                            label="Email address"
                            type="email"
                            placeholder={t('placeholder.email')}
                            value={store.email}
                            onChange={store.changeEmail}
                        />
                        <FormGroup
                            id="formUsername"
                            label="Username"
                            type="text"
                            placeholder={t('placeholder.username')}
                            value={store.username}
                            onChange={store.changeUsername}
                        />
                        <Form.Group className="mb-3" controlId="FormPhoneNumber">
                            <Form.Label className="auth-label">Phone number</Form.Label>
                            <Form.Control
                                type="tel"
                                pattern='^(?:\+380)?[0-9]{9}$'
                                placeholder={t('placeholder.phone')}
                                value={store.phone}
                                onChange={(ev)=> {store.changePhoneNumber(ev.target.value)}}
                            />
                        </Form.Group>
                        <Row>
                            <Form.Label className="auth-label">Gender</Form.Label>
                            <Col>
                                <Form.Check
                                    type="radio"
                                    label="Male"
                                    name="formGenderRadios"
                                    value="Male"
                                    onChange={(ev)=> {store.changeGender(ev.target.value)}}
                                    required
                                />
                            </Col>
                            <Col>
                                <Form.Check 
                                    type="radio"
                                    label="Female"
                                    name="formGenderRadios"
                                    value="Female"
                                    onChange={(ev)=> {store.changeGender(ev.target.value)}}
                                    required
                                />
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="formBirthday">
                            <Form.Label className="auth-label">Birthday</Form.Label>
                            <Form.Control
                                type="date"
                                value={store.birthday}
                                onChange={(ev)=> {store.changeBirthday(ev.target.value)}}
                                required
                            />
                        </Form.Group>
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
                            placeholder={t('placeholder.passwordConfirmation')}
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