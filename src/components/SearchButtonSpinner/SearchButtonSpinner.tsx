import React, { MouseEventHandler } from 'react';
import { Button, Spinner } from 'react-bootstrap';

interface Props {
    queryString: string;
    onClick: MouseEventHandler;
    isLoading: boolean;
    text: string;
}

const SearchButtonSpinner = (props: Props) => {
    return (
    <Button
        disabled={!props.queryString}
        variant="primary"
        onClick={props.onClick}
        type="button"
    >
        {props.isLoading ? (
        <Spinner animation="border" size="sm"/>
        ) : (
        `${props.text}`
        )}
    </Button> );
}

export default SearchButtonSpinner;