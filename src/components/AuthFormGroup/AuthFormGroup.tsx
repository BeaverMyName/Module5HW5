import React from 'react';
import { Form } from 'react-bootstrap';

interface Props {
    id: string,
    label: string,
    type: string,
    placeholder: string,
    value: string,
    onChange: (email: string) => void
}

const FormGroup = (props: Props) => {
    return (
        <Form.Group className="mb-3" controlId={props.id}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={(ev)=> {props.onChange(ev.target.value)}}
            />
        </Form.Group>
    )
}

export default FormGroup;