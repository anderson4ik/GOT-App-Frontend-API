import React, { Component } from 'react';
import gotService from '../../services/gotService';
import ItemDetails, {Field} from '../itemDetails';

export default class HousesItem extends Component {

    gotService = new gotService();

    render() {
        return (
            <ItemDetails 
            itemId={this.props.houseId}
            getItem={this.gotService.getHouse}>
                 <Field field='region' label='Region'/>
                 <Field field='words' label='Words'/>
                 <Field field='overlord' label='Overlord'/>
                 <Field field='coatOfArms' label='Coat Of Arms'/>
            </ItemDetails> 
        )
    }
}