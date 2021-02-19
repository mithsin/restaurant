import React from 'react';
import Modal from '@material-ui/core/Modal';
import ItemDetails from 'Components/Card/ItemDetails';
import { v4 as uuid_v4 } from "uuid";
import { useDispatch, useSelector } from 'react-redux';
import { orderDetailState, resetCart } from 'States/orderSlice';
import { SubmitButton } from 'Components/MUI/MuiComponents/MuiBtn';
import { handleFullUpdateAndAddToCart } from 'Constant/ConstantFunction';
import './styles.scss';

// const rand = () => {
//   return Math.round(Math.random() * 20) - 10;
// }

const ItemCard = ({ item }) => {
    const { 
        imgSrc,
        itemNumber,
        title,
        price,
    } = item;
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const cartOrderList = useSelector(orderDetailState);
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleAddItemToCart = () => {
        const cartData = {
            ...item,
            cartItemNumber: uuid_v4(),
            price: price,
            orderAmount: 1,
            addOnSelected: []
        };
        dispatch(resetCart(handleFullUpdateAndAddToCart(cartData, cartOrderList)));
        handleClose();
    };

    return(
        <div className="Item-Card-Wrapper">
            <div className="Item-Card-Img-block" onClick={handleOpen}>
                <span>{itemNumber}</span>
                <img src={imgSrc} alt={title}/>
            </div>
            <div className="Item-Card-Text" onClick={handleOpen}>
                <h2>{title}</h2>
                <span>${price}</span>
                {/* <button type="button" onClick={handleOpen}>Detail</button> */}
            </div>
            <div>
                <SubmitButton 
                    label="ADD TO CART"
                    onClick={ handleAddItemToCart }
                />
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <ItemDetails 
                    itemDetails={item}
                    cartOrderList={cartOrderList}
                    handleClose={handleClose}/>
            </Modal>
        </div>
    );
};

export default ItemCard;