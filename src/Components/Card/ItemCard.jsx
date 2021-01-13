import React from 'react';
import Modal from '@material-ui/core/Modal';
import ItemDetails from 'Components/Card/ItemDetails';
import { useDispatch, useSelector } from 'react-redux';
import { orderDetailState, setCart, setCartUpdate } from 'States/orderSlice';
import { MuiButton, MuiInputField } from 'Components/MUI';
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
        const findDetailHistory = cartOrderList.find(itm => itm.itemNumber === itemNumber);
        findDetailHistory
            ? dispatch(setCartUpdate({...item, orderAmount: findDetailHistory.orderAmount + 1}))
            : dispatch(setCart(cartOrderList.concat({...item, orderAmount: 1})));
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
                <MuiButton
                    label="ADD TO CART"
                    props={{
                        color: "black",
                        bgColor: "#3f51b5",
                        boxShadow: "2px 2px 23px rgba(0, 0, 0, 0.2) inset",
                        hColor: "white",
                        hbgColor: "#6495ED"
                    }}
                    onClick={ handleAddItemToCart } />
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