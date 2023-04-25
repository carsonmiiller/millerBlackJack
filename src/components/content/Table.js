import { React, useEffect, useState } from "react"
import PlayingCard from "./PlayingCard"
import { Container, Row, Col, Button } from "react-bootstrap"

export default function Table (props) {
    const [deck, setDeck] = useState([])
    const [handLive, setHandLive] = useState(false)
    const [playerHand, setPlayerHand] = useState([])
    const [dealerHand, setDealerHand] = useState([])
    const [playerScore, setPlayerScore] = useState(0)

    // check if player busts
    useEffect(() => {
        // sort cards by value, aces last
        playerHand.sort((a, b) => {
            let aVal = a.substring(0, a.length - 1)
            let bVal = b.substring(0, b.length - 1)
            if (aVal === "A") return 1
            if (bVal === "A") return -1
            return parseInt(aVal) - parseInt(bVal)
        })
        let score = 0
        playerHand.forEach((card) => {
            let cardValue = card.substring(0, card.length - 1)
            if (cardValue === "J" || cardValue === "Q" || cardValue === "K")
                score += 10
            else if (cardValue !== "A")
                score += parseInt(cardValue)
            else if (score + 11 > 21)
                score += 1
            else
                score += 11
        })
        setPlayerScore(score)
        if(score > 21) {
            setHandLive(false)
        }
    }, [playerHand])
    
    // create deck
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

    const getRandomCard = () => {
        let randomIndex = Math.floor(Math.random() * deck.length)
        return deck[randomIndex]
    }

    const startHand = () => {
        setHandLive(true)
        setPlayerHand([getRandomCard(), getRandomCard()])
        setDealerHand([getRandomCard(), getRandomCard()])
    }

    const hit = () => {
        setPlayerHand([...playerHand, getRandomCard()])
    }

    const actionButtons = () => {
        if (!handLive) {
            return <Button onClick={startHand}>Deal</Button>
        } else {
            return <Row>
                <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Button onClick={hit}>Hit</Button>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Button>Stand</Button>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Button>Double Down</Button>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Button>Split</Button>
                </Col>
            </Row>
        }
    }

    const displayDealerHand = () => {
        return <Row>
            {
                // display all cards except the first one
                dealerHand.map((card, index) => {
                    if (index !== 0) {
                        return <Col><PlayingCard name={card}/></Col>
                    }
                })
            }
        </Row>
    }

    const displayPlayerHand = () => {
        return <Row>
            {
                // display all cards
                playerHand.map((card) => {
                    return <Col><PlayingCard name={card}/></Col>
                })
            }
        </Row>
    }


    return <>
        <Container>
            <p>Dealer Hand</p>
            {displayDealerHand()}
        </Container>
        <Container>
            <p>Player Hand</p>
            {displayPlayerHand()}
        </Container>
        <Container>
            {
                handLive ? <p>Score: {playerScore}</p> : <p>Busted!</p>
            }
            {actionButtons()}
        </Container>
    </>
}