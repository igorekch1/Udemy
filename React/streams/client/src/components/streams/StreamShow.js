import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchSingleStream } from "../../actions";
import flv from 'flv.js';

class StreamShow extends Component {
    constructor(props) {
        super(props);

        this.videoRef = React.createRef();
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        this.props.fetchSingleStream(id);
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    buildPlayer() {
        if (this.player || !this.props.stream) return;

        const { id } = this.props.match.params;
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    render() { 
        if (!this.props.stream) {
            return <div>Loading...</div>;
        }

        const { title, description } = this.props.stream;

        return (
            <div>
                <video ref={this.videoRef} style={{ width: '100%' }} controls={true} />
                <h1>{ title }</h1>
                <h5>{ description }</h5>
            </div>
        );
    }
}

const mapStateToProps = ( state, {match }) => ({
    stream: state.streams[match.params.id]
})

export default connect( mapStateToProps, { fetchSingleStream })(StreamShow);