import React, { Component } from 'react'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import {handleInitialData} from "../actions/shared"
import Tomato from '../icons/tomato.png'

class Won extends Component {

    handleClick = () => {
        this.props.dispatch(handleInitialData())
    }

    render() {

        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <Card className='text-center' style={{ width: '18rem' }}>
                            <Card.Header>You've Won!</Card.Header>
                            <Card.Body>
                                <Card.Img variant="top" src={Tomato} />
                                <Card.Title>Congrats, you made it though the season! Enjoy your tomatoes!</Card.Title>
                                <Button onClick={(e) => this.handleClick()} variant="primary">Play Again</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default connect()(Won)