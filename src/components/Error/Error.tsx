import React from 'react';

interface Props {
    error: string
}

const Error = (props: Props) => {
    if (!props) {
        return null;
    }

    return <p style={{color: 'red', fontSize: 14}}>{props.error}</p>;
}

export default Error;
