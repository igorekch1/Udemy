import React, { Component } from 'react';
import LanguageContext from '../context/LanguageContext';

class LanguageSelector extends Component {
    static contextType = LanguageContext;

    render() {
        console.log(this.context); 
        return ( 
            <div>
                <div>
                    Select a language:
                    <i className='flag us' onClick={() => this.context.onLanguageChange('english')}/>
                    <i className='flag ru' onClick={() => this.context.onLanguageChange('russian')}/>
                </div>
            </div>
        );
    }
}
 
export default LanguageSelector;