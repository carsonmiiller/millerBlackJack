import { React, useEffect, useState } from "react"
import PlayingCard from "./PlayingCard"
import { Container, Row, Col, Button } from "react-bootstrap"

export default function Table (props) {
    const [deck, setDeck] = useState([])
    const [playerLive, setPlayerLive] = useState(false)
    const [playerHand, setPlayerHand] = useState([])
    const [dealerHand, setDealerHand] = useState([])

    // create deck
    const initDeck = () => {
        const newDeck = []
        const suits = ['♠', '♣', '♥', '♦']
        const ranks = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']

        for (let rank of ranks) {
            for (let suit of suits) {
                newDeck.push({suit, rank})
            }
        }
        
        // shuffle deck
        for (let i = newDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
        }

        setDeck(newDeck)
    }

    useEffect(() => {
        initDeck()
    }, [])

    // function to deal initial cards
    const dealInitialCards = () => {
        const card1 = deck.pop();
        const card2 = deck.pop();
        const dealerCard1 = deck.pop();
        const dealerCard2 = deck.pop();
        dealerCard1.hidden = true;

        setPlayerHand([card1, card2]);
        setDealerHand([dealerCard1, dealerCard2]);
        setPlayerLive(true);
    };      
    
    const calcScore = (hand) => {
        let value = 0;
        let hasAce = false;

        for (let card of hand) {
            if (card.rank === 'A') {
                hasAce = true;
                value += 11;
            } else if (card.rank === 'K' || card.rank === 'Q' || card.rank === 'J')
                value += 10;
            else
                value += parseInt(card.rank);
        }

        // adjust the value if the hand has an Ace and it's value needs to be reduced
        if (hasAce && value > 21) {
            value -= 10;
        }
    
        return value;
    }

    const handleHit = () => {
        const newCard = deck.pop()
        setPlayerHand(oldPlayerHand => [...oldPlayerHand, newCard])
    }

    const handleStand = () => {
        setPlayerLive(false);

        // dealer's turn
        let dealerHandCopy = [...dealerHand];

        while (calcScore(dealerHandCopy) < 17) {
            const newCard = deck.pop();
            dealerHandCopy.push(newCard);
        }

        setDealerHand(dealerHandCopy);
    };
   
    const renderDealerHand = () => {
        // Check if the first card should be hidden
        if (dealerHand.length > 0 && dealerHand[0].hidden) {
            // Create a copy of the first card with the 'hidden' property removed
            const hiddenCard = { ...dealerHand[0] };
            delete hiddenCard.hidden;
    
            // Create a new array with the hidden card replaced by the copy without 'hidden'
            const visibleHand = [hiddenCard, ...dealerHand.slice(1)];
    
            return renderCards(visibleHand);
            }
            console.log(dealerHand)
    
        return renderCards(dealerHand);
    };
   
    const renderCards = (hand) => {
        return playerHand.map((card, index) => (
            <PlayingCard key={index} hidden={card.hidden} rank={card.rank} suit={card.suit}/>
        ));
    };

    const actionButtons = () => {
        if (!playerLive) {
            return <Button onClick={dealInitialCards}>Deal</Button>
        } else {
            return <Row>
                <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Button onClick={handleHit}>Hit</Button>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Button onClick={handleStand}>Stand</Button>
                </Col>
                {/* <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Button>Double Down</Button>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Button>Split</Button>
                </Col> */}
            </Row>
        }
    }

    return <>
        <Container>
            <p>Dealer Hand</p>
            {renderDealerHand()}
            {
                calcScore(dealerHand) > 21 ?
                    <p>Busted!</p>
                    :
                    <p>Score: {calcScore(dealerHand)}</p>
            }
        </Container>
        <Container>
            <p>Player Hand</p>
            {renderCards(playerHand)}
        </Container>
        <Container>
            {
                calcScore(playerHand) > 21 ?
                    <p>Busted!</p>
                    :
                    <p>Score: {calcScore(playerHand)}</p>
            }
            {actionButtons()}
        </Container>
    </>
    

    // // Render the component
    // return (
    //     <div className="blackjack-table">
    //     <div className="dealer-hand">
    //         <h3>Dealer's Hand</h3>
    //         <div className="cards">{renderCards(dealerHand)}</div>
    //     </div>
    //    { <div className="player-hand">
    //         <h3>Player's Hand</h3>
    //         {renderPlayerHand}
    //     </div>}
    //     <div className="buttons">
    //         <button onClick={dealInitialCards}>Deal</button>
    //         <button onClick={handleHit}>Hit</button>
    //         <button onClick={handleStand}>Stand</button>
    //     </div>
    //     </div>
    // );
}