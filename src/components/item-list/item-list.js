import React from 'react';
import './item-list.css';

const ItemList = (props) => {
       const {data, onItemSelected, children: renderLabel} = props;
        const items = data.map((item) => {
            const {id} = item;

            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => onItemSelected(id)}
                >
                    {renderLabel(item)}
                </li>
            )
        });
        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        )
};

export default ItemList;