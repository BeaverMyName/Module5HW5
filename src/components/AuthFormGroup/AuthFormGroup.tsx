import React from 'react';
import { Form } from 'react-bootstrap';
import './style.css';

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
            <Form.Label className="auth-label">{props.label}</Form.Label>
            <Form.Control
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={(ev)=> {props.onChange(ev.target.value)}}
                required
            />
        </Form.Group>
    )
}

export default FormGroup;