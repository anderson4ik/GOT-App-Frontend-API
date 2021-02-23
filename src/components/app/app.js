import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import gotService from '../../services/gotService';
import {BooksItem, CharacterPage, CharactersItem, HousePage, BookPage, HousesItem} from '../pages';
import ErrorMessage from '../errorMessage';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './app.css';

export default class App extends Component {
    constructor(){
        super();
        this.state = {
            showRandomChar: true,
            error: false
        }

        this.toggleRandomChar = this.toggleRandomChar.bind(this);
    }

    gotService = new gotService();

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }


    toggleRandomChar() {
       this.setState({
         showRandomChar: !this.state.showRandomChar
       });
   }

   

    render() {

        if(this.state.error) {
            return <ErrorMessage />
        }

        const char = this.state.showRandomChar ? <RandomChar interval={3000}/> : null;

        return (
            <Router>
                <div className='app'> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {char}
                                <button 
                                    className="toggle-btn"
                                    onClick={this.toggleRandomChar}>
                                    Toggle random character
                                </button>
                            </Col>
                        </Row>
                            <Route path='/characters' exact component={CharacterPage}/>
                            <Route path='/characters/:id' render={
                                ({match}) => {//location, history - objects we can get from Route
                                    const {id} = match.params;//params:{id: "3"}
                            return <CharactersItem charId={id}/>
                            }
                            }/>

                            <Route path='/houses' exact component={HousePage}/>
                            <Route path='/houses/:id' render={
                                ({match}) => {//location, history - objects we can get from Route
                                    const {id} = match.params;//params:{id: "3"}
                            return <HousesItem houseId={id}/>
                            }
                            }/>

                            <Route path='/books' exact component={BookPage}/>
                            <Route path='/books/:id' render={
                                ({match}) => {//location, history - objects we can get from Route
                                    const {id} = match.params;//params:{id: "3"}
                            return <BooksItem bookId={id}/>
                            }
                            }/>
                    </Container>
                </div>
            </Router>
        );
    }
};