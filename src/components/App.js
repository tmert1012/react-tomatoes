import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from "../actions/shared"
import LoadingBar from 'react-redux-loading'
import Header from './Header'
import Week from "./Week"

class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        const { loading } = this.props

        return (
            <div>
                <LoadingBar />
                { loading
                    ? null
                    :
                    <div>
                        <Header />
                        <Week />
                    </div>
                }
            </div>
        )
    }

}

function mapStateToProps({ loadingBar }) {
    return {
        loading: loadingBar.default === 1,
    }
}

export default connect(mapStateToProps)(App)
