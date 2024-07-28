import React, {FC} from 'react'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import Tomato from '../icons/tomato.png'
import {useSeasonContext} from "../context/SeasonContext"

const Won: FC = () => {
    const {resetSeason} = useSeasonContext()

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Card className='text-center' style={{width: '18rem'}}>
                        <Card.Header>You've Won!</Card.Header>
                        <Card.Body>
                            <Card.Img variant="top" src={Tomato}/>
                            <Card.Title>Congrats, you made it though the season! Enjoy your tomatoes!</Card.Title>
                            <Button onClick={resetSeason} variant="primary">Play Again</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Won