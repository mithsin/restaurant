import React from 'react';
import Modal from '@material-ui/core/Modal';
import ItemDetails from 'Components/Card/ItemDetails';
import { useDispatch, useSelector } from 'react-redux';
import { orderDetailState, setCart, setCartUpdate } from 'States/orderSlice';
import { SubmitButton } from 'Components/MUI/MuiComponents/MuiBtn';
import './styles.scss';

const ItemCardWithDetailQuickAdd = ({ item }) => {
    const { 
        itemNumber,
        description,
        title,
        imgSrc,
        price,
        itemDisable,
        other,
        commentId
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
            </div>
            <div>
                <p>

                </p>
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

export default ItemCardWithDetailQuickAdd;