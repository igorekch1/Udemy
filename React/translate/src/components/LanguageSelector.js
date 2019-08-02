import React, { Component } from 'react';

class LanguageSelector extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <div>
                    Select a language:
                    <i className='flag us' onClick={() => this.props.onLanguageChange('english')}/>
                    <i className='flag ru' onClick={() => this.props.onLanguageChange('russian')}/>
                </div>
            </div>
        );
    }
}
 
export default LanguageSelector;