import { React, useEffect, useState } from "react"
import PlayingCard from "./PlayingCard"
import { Container, Row, Col } from "react-bootstrap"

export default function Table (props) {

    const [deck, setDeck] = useState([])
    
    useEffect(() => {
        let newDeck = []
        let suits = ["C", "D", "H", "S"]

        for (let i = 2; i <= 10; i++) {
            for (let j = 0; j < suits.length; j++) {
                newDeck.push(i + suits[j])
            }
        }
        for (let i = 0; i < suits.length; i++) {
            newDeck.push("J" + suits[i])
            newDeck.push("Q" + suits[i])
            newDeck.push("K" + suits[i])
            newDeck.push("A" + suits[i])
        }
        setDeck(newDeck)
    }, [])





    return <>
        <p>This should display a BlackJack Table {props.name}</p>
        <Container>
            <Row>
                {
                    deck.map((card, index) => {
                        return <Col xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                                <PlayingCard key={index} name={card}/>
                            </Col>
                    })
                }
            </Row>
        </Container>

    </>
}