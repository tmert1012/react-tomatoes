import React, { Component } from 'react'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import {handleInitialData} from "../actions/shared";

class GameOver extends Component {

    handleClick = () => {
        this.props.dispatch(handleInitialData())
    }

    render() {

        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <Card className='text-center' style={{ width: '18rem' }}>
                            <Card.Header>Game Over!</Card.Header>
                            <Card.Body>
                                <Card.Img variant="top" src={'../icons/dead-plant.png'} />
                                <Card.Title>Sorry, you've lost your crop.</Card.Title>
                                <Button onClick={(e) => this.handleClick()} variant="primary">Try Again</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default connect()(GameOver)