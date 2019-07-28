import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom'; 

class StreamList extends Component  {

    componentWillMount() {
        this.props.fetchStreams();
    }

    renderAdminButton = (stream) => {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
                        Edit
                    </Link>
                    <button className="ui button negative">
                        Delete
                    </button>
                </div>
            );
        }
    }

    renderCreateButton = () => {
        if (this.props.isSignedIn) {
            return (
                <div style={{textAlign: 'right'}}>
                    <Link to='/streams/new' className="ui button primary">
                        Create Stream
                    </Link>
                </div>
            );
        }
    }

    renderStreams = () => (
        this.props.streams.map(stream => (
            <div className="item" key={stream.id}>
                { this.renderAdminButton(stream) }
                <i className="large middle aligned icon camera"></i>
                <div className="content">
                    {stream.title}
                    <div className="description">{stream.description}</div>
                </div>
            </div>
        ))
    ); 

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {  this.renderStreams() }
                </div>
                { this.renderCreateButton() }
            </div>
        )
    }
}

const mapStateToProps = ({ streams, auth }) => ({
    streams: Object.values(streams),
    currentUserId: auth.userId,
    isSignedIn: auth.isSignedIn
});

export default connect(mapStateToProps, { fetchStreams })(StreamList);