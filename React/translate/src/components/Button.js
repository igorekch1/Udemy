import React, { Component } from 'react';
import LanguageContext from '../context/LanguageContext';
import ColorContext from '../context/ColorContext';

class Button extends Component {
    renderButton(color) {
        return (
            <button className={`ui button ${color}`}>
                <LanguageContext.Consumer>
                    {(value) => value === 'english' ? 'Submit' : 'Отправить'}
                </LanguageContext.Consumer>
            </button>
        );
    }

    render() { 
        return (
            <ColorContext.Consumer>
                { color => this.renderButton(color) }
            </ColorContext.Consumer>
        );
    }
}
 
export default Button;