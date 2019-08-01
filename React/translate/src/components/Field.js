import React, { Component } from 'react';
import LanguageContext from '../context/LanguageContext';

class Field extends Component {
    static contextType = LanguageContext;

    render() { 
        const text = this.context === 'english' ? 'Name' : 'Имя';

        return ( 
            <div className='ui field'>
                <label>
                    <LanguageContext.Consumer>
                        {(value) => value === 'english' ? 'Name' : 'Имя'}
                    </LanguageContext.Consumer>
                </label>
                <input />
            </div>
        );
    }
}
 
export default Field;