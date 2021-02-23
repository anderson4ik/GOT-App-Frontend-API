import React, { Component } from 'react';
import ItemList from '../itemList';
import gotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';
import {withRouter} from 'react-router-dom';

class CharacterPage extends Component {

    gotService = new gotService();
    state = {
        error: false
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        });
    }

    render() {

        if(this.state.error) {
            return <ErrorMessage />
        }

        return (
            <ItemList 
            onItemSelected={(itemId) => {
                this.props.history.push(itemId);
                //we can use it because of using "withRouter"
                //push - to go to specified page of book selected
            }}
            getData={this.gotService.getAllCharacters}
            renderItem={(item) => `${item.name} (${item.gender})`}/>
        )
    }
}

export default withRouter(CharacterPage);