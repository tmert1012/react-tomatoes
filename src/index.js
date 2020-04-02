import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import middleware from './middleware'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(middleware))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)

