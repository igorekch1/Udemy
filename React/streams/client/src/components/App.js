import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import Header from './Header';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div className = 'container'>
                    <Header/>
                    <Route path='/' exact component={StreamList} />
                    <Route path='/stream/show' component={ StreamShow } />
                    <Route path='/stream/delete' component={ StreamDelete } />
                    <Route path='/stream/edit' component={ StreamEdit } />
                    <Route path='/stream/new' component={ StreamCreate } />
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;