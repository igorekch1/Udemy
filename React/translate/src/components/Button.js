import React, { Component } from 'react';
import LanguageContext from '../context/LanguageContext';
import ColorContext from '../context/ColorContext';

class Button extends Component {
    renderButton(color) {
        console.log(color)
        return (
            <button className={`ui button ${color}`}>
                <LanguageContext.Consumer>
                    {({ language }) => language === 'english' ? 'Submit' : 'Отправить' }
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