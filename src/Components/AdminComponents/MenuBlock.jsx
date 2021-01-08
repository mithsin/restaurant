import React, { useState } from 'react';
import AddMenuItem from 'Components/Forms/AddMenuItem';
import ItemCardList from 'Components/Card/ItemCardList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';

const MenuBlock = ({category}) => {
    const [addItemClose, setAddItemClose] = useState(false);
    const handleAddItemToggle = () => setAddItemClose(!addItemClose);
    return(
        <React.Fragment>
            <h2>{category.title}</h2>
            <div className="Add-Category-Block">
                <FontAwesomeIcon 
                    onClick={handleAddItemToggle} 
                    icon={addItemClose ? faMinusSquare : faPlusSquare} 
                    style={{margin: '1rem', cursor: 'pointer'}} className="fa-2x"/>
                    <p>ADD NEW ITEM</p>
                {addItemClose && 
                    <AddMenuItem 
                        open={addItemClose}
                        handleToggle={() => setAddItemClose(false)}
                        thisCategory={category}/>}
            </div>
            <div className="AdminOrders-OrderList-Wrapper">
                {category?.menuList?.map((item, index)=> <ItemCardList key={`item-${index}`} item={item} buttonLabel="Edit" />)}
            </div>
        </React.Fragment>
    );
};

export default MenuBlock;