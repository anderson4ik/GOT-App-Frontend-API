import React, {Component} from 'react';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types';
import './randomChar.css';

export default class RandomChar extends Component {

    gotService = new gotService();
    state = {
        char: {},
        loading: true,
        error: false
    }

    //ES-9
    /* static defaultProps={//we can use the default props to prevent error by not getting some props from up level element
        interval: 3000
    } */

    componentDidMount() {
        this.updateChar();//when element RandomChar appears it call the method
        this.timerId = setInterval(this.updateChar, this.props.interval);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    getRandomNumber(min, max) {//The maximum is inclusive and the minimum is inclusive 
        min = Math.ceil(min);
        max = Math.floor(max);
        const randomNum = Math.floor(Math.random() * (max - min + 1)+ min);
        return randomNum;
    }

    onCharLoaded = (char) => {
        this.setState({ 
            char,
            loading: false
        });
    }

    onError = (error) => {
        this.setState({
            error: true,
            loading: false
        });
    }

    updateChar = () => {
        const id = this.getRandomNumber(15, 141);
        this.gotService.getCharacter(id)
           .then(this.onCharLoaded)
           .catch(this.onError);
    }

    render() {

        const {char, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> :null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

RandomChar.defaultProps = {
    interval:3000
}

RandomChar.propTypes = {//checking the value that we get in props and catching error
    interval: PropTypes.number//checking by module prop-types

    /* interval: (props, propName, componentName) => {//native checking
        const value = props[propName];
    
        if(typeof value == 'number' && !isNaN(value)) {
            return null
        }
    
        return new TypeError(`${componentName}: ${propName} must be a number!`);
    } */
}

const View = ({char}) => {

    const {name, gender, born, died, culture} = char
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}
