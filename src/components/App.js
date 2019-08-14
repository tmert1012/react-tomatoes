import React, { Component } from 'react'
import { CardDeck } from 'react-bootstrap'
import { connect } from 'react-redux'
import Day from './Day'
import { handleInitialData } from "../actions/shared";
import LoadingBar from 'react-redux-loading'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { days, loading } = this.props

    return (
        <div>
          <LoadingBar />
          <CardDeck>
            { loading
                ? null
                : Object.keys(days).map((key) => (
                      <Day day={days[key]} key={key} />
                  ))
            }
          </CardDeck>
        </div>
    )
  }

}

function mapStateToProps({ days, loadingBar }) {
  return {
    days,
    loading: loadingBar.default === 1,
  }
}

export default connect(mapStateToProps)(App)
