import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

interface Props {
    isLoading: boolean;
    text: string;
}

const AuthButtonSpinner = (props: Props) => {
    return (
    <Button variant="primary" type="submit">
    {props.isLoading ? (
      <Spinner animation="border" size="sm" />
    ) : (
      `${props.text}`
    )}
  </Button> );
}

export default AuthButtonSpinner;