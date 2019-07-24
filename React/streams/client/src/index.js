import React from 'react';
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers";
import App from './components/App';

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDom.render(
    <Provider store = { store }>
        <App/>
    </Provider>
    , document.querySelector("#root")
);
