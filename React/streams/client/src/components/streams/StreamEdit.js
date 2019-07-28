import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends Component {
    componentDidMount() {
        this.props.fetchSingleStream(this.props.match.params.id);
    }
    
    onSubmit = (formValues) => this.props.editStream(this.props.match.params.id, formValues);
    
    render() {
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm 
                    initialValues = { _.pick(this.props.stream, 'title', 'description') }
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, { match }) => ({
    stream: state.streams[match.params.id] 
});

export default connect(mapStateToProps, { fetchSingleStream, editStream })(StreamEdit);