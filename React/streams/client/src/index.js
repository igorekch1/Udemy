import React from 'react';
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from 'redux-thunk';
import reducers from "./reducers";
import App from './components/App';

const store = createStore(
    reducers,
    compose(
        applyMiddleware(reduxThunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

ReactDom.render(
    <Provider store = { store }>
        <App/>
    </Provider>
    , document.querySelector("#root")
);
