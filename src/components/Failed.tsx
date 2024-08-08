import React, {FC} from 'react'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import DeadPlant from 'src/icons/dead-plant.png'
import {useSeasonContext} from "src/context/SeasonContext"

const Failed: FC = () => {
    const {resetSeason} = useSeasonContext()

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Card className='text-center' style={{width: '18rem'}}>
                        <Card.Header>Game Over!</Card.Header>
                        <Card.Body>
                            <Card.Img variant="top" src={DeadPlant}/>
                            <Card.Title>Sorry, you've lost your crop.</Card.Title>
                            <Button onClick={resetSeason} variant="primary">Try Again</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Failed