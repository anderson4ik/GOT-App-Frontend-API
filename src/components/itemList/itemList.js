import React, { Component } from 'react';
import Spinner from '../spinner';
// import PropTypes from 'prop-types';
import './itemList.css';

export default class ItemList extends Component {

    state = {
        itemList: null
    }

    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then( (itemList) => {
                this.setState({
                    itemList
                })
            })
    }

    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;

            const label = this.props.renderItem(item);

            return (
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={ () => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    render() {
        const {itemList} = this.state;

        if (!itemList) {
            return <Spinner/>
        }

        const items = this.renderItems(itemList);


        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}

// function ItemList({getData, onItemSelected, renderItem}) {

//     const [itemList, updateList] = useState([]);

//     useEffect(() => {
//         getData()
//         .then( (data) => {
//             updateList(data);
//         });
//     });//,[] - it say, that effect should be active only when component appears or disappears!

//     function renderItems(arr) {
//         return arr.map((item) => {
//             const {id} = item;
//             const label = renderItem(item);
            
//             return (
//                 <li 
//                     key={id}
//                     className="list-group-item"
//                     onClick={ () => onItemSelected(id)}>
//                     {label}
//                 </li>
//             )
//         })
//     }
    
//     if(!itemList) {
//         return <Spinner />
//     } 
    
//     const items = renderItems(itemList);

//     return (
//         <ul className="item-list list-group">
//             {items}
//         </ul>
//     );
// }

// export default ItemList;

/* ItemList.defaultProps = {
    onItemSelected: () => {}
} */ //we can use the default props to prevent error by not getting some props from up level element

//  ItemList.propTypes = {//checking the value that we get in props and catching error by react method "propTypes"
//      onItemSelected: PropTypes.func//checking by module prop-types
//     // getData: PropTypes.arrayOf(PropTypes.object)//property should be array of objects
// }
