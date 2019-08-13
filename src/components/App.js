import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import Day from './Day'
import { handleInitialData } from "../actions/shared";

class App extends Component {
  componentDidMount() {
    this.params.dispatch(handleInitialData)
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col>1 of 2</Col>
            <Col>2 of 2</Col>
          </Row>
          <Row>
            <Col>1 of 3</Col>
            <Col>2 of 3</Col>
            <Col>3 of 3</Col>
          </Row>
        </Container>
      </div>
    )
  }

}

function mapStateToProps({ days, options }) {
  return {
    days,
    options,
  }
}

export default connect(mapStateToProps)(App)
