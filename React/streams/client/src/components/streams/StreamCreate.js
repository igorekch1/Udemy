import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';

class StreamCreate extends Component {

    onSubmit = (formValues) => this.props.createStream(formValues);

    render() { 
        return ( 
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
                <Field name='title' component={renderInput} label='Enter title'/>
                <Field name='description' component={renderInput} label='Enter description'/>
                <button className='ui button primary'>Submit</button>
            </form>
        );
    }
}

const renderError = ({ error, touched }) => {
    if (error && touched) {
        return (
            <div className='ui error message'>
                <div className='header'>{ error }</div>
            </div>
        );
    }
}

const renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

    return (
        <div className={ className }>
            <label>{ label }</label>
            {/* TODO { ...input } */}
            <input type='text' autoComplete='off'/>
            { renderError(meta) }
        </div>
    );
}

const validate = (formValues) => {
    const errors = {};
    
    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }
    
    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }  
    
    return errors;
}

const formWrapped = reduxForm({
    form: 'streamCreate',
    validate
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);