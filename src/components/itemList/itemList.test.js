import React from 'react';
import ItemList from './itemList';
import { mount } from 'enzyme';
import gotService from '../../services/gotService';

describe('Testing <ItemList/>', () => {
    const service = new gotService();
    const list = mount(<ItemList
                             getData={service.getAllHouses}//should return Promise
                             renderItem={({name}) => name} />);                        
    it('Click on ItemList must rerender all list in 1 instance', () => {
         list.setState({itemList: [{name: 'wow', id: 1}, {name: 'wow1', id: 2}]}) //setting custom state
         list.find('.list-group-item:first-child').simulate('click'); // to simulate click on first child of list element 
         expect(list.find('ul')).toHaveLength(1);
    });                         
});