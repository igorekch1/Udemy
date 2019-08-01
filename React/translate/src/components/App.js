import React, { Component } from 'react';
import UserCreate from './UserCreate';
import LanguageContext from '../context/LanguageContext';
import ColorContext from '../context/ColorContext';

class App extends Component {
    state = {
        language: 'english'
    };

    onLanguageChange = language => this.setState({ language }); 

    render() { 
        return ( 
            <div className='ui container'>
                <div>
                    Select a language:
                    <i className='flag us' onClick={() => this.onLanguageChange('english')}/>
                    <i className='flag ru' onClick={() => this.onLanguageChange('russian')}/>
                </div>
                <ColorContext.Provider value='red'>
                    <LanguageContext.Provider value={this.state.language}>
                        <UserCreate />
                    </LanguageContext.Provider>
                </ColorContext.Provider>
            </div>
         );
    }
}
 
export default App;
