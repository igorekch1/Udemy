import React, { Component } from 'react';
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import "./App.css";

class App extends Component {
    constructor() {
        super();

        this.state = {
            cats: [],
            searchfieled : ''
        }
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(data => data.json())
            .then(res => this.setState({cats: res}))
    }

    onSearchChange = (event) => {
        this.setState({searchfieled: event.target.value})
    }

    render() {
        const {cats, searchfieled} = this.state;
        const filteredKitties = cats.filter(cat => {
            return cat.name.toLowerCase().includes(searchfieled.toLowerCase())
        })

        return !filteredKitties.length ?
        <h1 className="pa2 tc">Loading...</h1>: 
        (
            <div className="tc">
                <h1 className="f1">Kitties</h1>
                <SearchBox searchChange = {this.onSearchChange}/>
                <Scroll>
                    <CardList cats={filteredKitties}/>
                </Scroll>
            </div>
        )
    }
}

export default App;