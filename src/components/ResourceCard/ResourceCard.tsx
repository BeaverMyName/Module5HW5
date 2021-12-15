import React from 'react'
import { Card } from 'react-bootstrap'

interface Props {
    resource: {
        name: string,
        year: number,
        color: string,
        pantone_value: string
    } | null
}

const ResourceCard = (props: Props) => {
    if (!props.resource) {
        return null;
    }

    const { name, year, color, pantone_value } = props.resource;

    return (
    <Card>
        <Card.Body>
            <Card.Title>{ name } { year }</Card.Title>
            <div style={{'backgroundColor': `${color}`, 'width': '100px', 'height': '100px'}}/>
            <Card.Text>
                Color code: {color}
                <br/>
                Pantone: {pantone_value}
            </Card.Text>
        </Card.Body>
    </Card>
    );
}

export default ResourceCard;