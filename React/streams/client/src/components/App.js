import React from 'react';
import './App.css';
import { Router, Route } from 'react-router-dom';
import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import Header from './Header';
import history from '../history';

const App = () => (
    <div>
        <Router history = {history}>
            <div className = 'container'>
                <Header/>
                <Route path='/' exact component={StreamList} />
                <Route path='/streams/show' component={ StreamShow } />
                <Route path='/streams/delete' component={ StreamDelete } />
                <Route path='/streams/edit/:id' component={ StreamEdit } />
                <Route path='/streams/new' component={ StreamCreate } />
            </div>
        </Router>
    </div>
);

export default App;