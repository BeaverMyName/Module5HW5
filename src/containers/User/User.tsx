import React from 'react'
import { Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap'
import ownTypes from '../../ioc/ownTypes'
import { observer } from 'mobx-react'
import { useInjection } from '../../ioc/ioc.react'
import UserStore from '../../stores/UserStore'
import UserCard from '../../components/UserCard'
import { useTranslation } from 'react-i18next';
import Error from '../../components/Error';
import SearchButtonSpinner from '../../components/SearchButtonSpinner';

const User = observer(() => {
  const store = useInjection<UserStore>(ownTypes.userStore);
  const { t } = useTranslation(['user']);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={4} md={6} xs>
          <InputGroup className="mb-2">
            <FormControl
              type="number"
              value={store.queryString}
              onChange={(ev)=> {store.changeQueryString(ev.target.value)}}
              isInvalid={!!store.error}
              placeholder={t('placeholder')}
            />
            <SearchButtonSpinner
              queryString={store.queryString}
              onClick={store.search}
              isLoading={store.isLoading}
              text={`${t('submit')}`}
            />
          </InputGroup>
          {!!store.error && (
            <Error error={store.error}/>
          )}
          <UserCard user={store.user} />
        </Col>
      </Row>
    </Container>
  )
});

export default User
