import React from 'react';
import { Card } from 'react-bootstrap';

const PlayingCard = (props) => {

    return (
        // return a card with spacing around it
        
        <Card className='m-2' >
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
            </Card.Body>
        </Card>
    );
};


export default PlayingCard;