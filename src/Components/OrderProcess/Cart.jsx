import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { orderDetailState, setCart, setCartUpdate, setDeleteItem } from 'States/orderSlice';
import InputAdornment from '@material-ui/core/InputAdornment';
import { AddCircle, RemoveCircle } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';
import { MuiButton } from 'Components/MUI';


import './styles.scss';

const Cart = ({cartItemList}) => {
    let history = useHistory();
    const [totalAmount, setTotalAmount] = useState(0)
    const cartOrderList = useSelector(orderDetailState);
    const wsUri = process.env.REACT_APP_API_WEBSOCKETS;
    const websocket = new WebSocket(wsUri);
    useEffect(()=>{
        cartOrderList && 
        setTotalAmount(cartOrderList.reduce((accumulator, current) => {
            return (accumulator + (parseInt(current.orderAmount) * current.price))
        }, 0));
    },[cartOrderList])
    const onMessage = (evt) => {
        console.log('onMessage: ', evt)
        evt?.data && history.push('/payment')

    }

    websocket.onmessage = function(evt) { onMessage(evt) };

    const handleCheckOut = (message) => {

        const sendMessage = {
            message : "New order available", 
            action : "message"
        }
        
        websocket.send(JSON.stringify(sendMessage));
    }

    const CartItemList = ({ cartItemDetail }) => {
        const {
            imgSrc,
            itemNumber,
            itemDetails,
            title,
            price,
            orderAmount,
        } = cartItemDetail;
        const dispatch = useDispatch();
        const [currentOrderAmount, setCurrentOrderAmount] = useState(orderAmount)
        const updatePrice = (parseInt(orderAmount) * price).toFixed(2);

        const handleCheckoutAddUpdate = (num) => {
            if(parseInt(currentOrderAmount) < num){
                setCurrentOrderAmount(parseInt(currentOrderAmount + 1))
                dispatch(setCartUpdate({...cartItemDetail, orderAmount: parseInt(currentOrderAmount) + 1}))
            }
        }
        const handleCheckoutMinusUpdate = (num) => {
            if(parseInt(currentOrderAmount) > num){
                setCurrentOrderAmount(parseInt(currentOrderAmount) - 1)
                dispatch(setCartUpdate({...cartItemDetail, orderAmount: parseInt(currentOrderAmount) - 1}))
            }
            if (parseInt(currentOrderAmount) <= num) {
                dispatch(setDeleteItem({...cartItemDetail}))
            }
        }

        return(
            <ul className="CartItemList-block">
                <li className="CartItemList-img-block"><img src={imgSrc} alt={`${title}-img`} /></li>
                <li className="CartItemList-desc-block">
                    <span>{itemNumber}</span>
                    <span>{title}</span>
                </li>
                <li className="CartItemList-price-block">
                    <span className="InputNumberWrapper">
                        <TextField
                            id="filled-number"
                            label=""
                            type="number"
                            value={currentOrderAmount}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                endAdornment: (
                                    <span className="AddMinusIconWrapper">
                                        <AddCircle onClick={()=>handleCheckoutAddUpdate(10)} style={{color: 'green', size: '16px', cursor: 'pointer'}}/>
                                        <RemoveCircle onClick={()=>handleCheckoutMinusUpdate(1)} style={{color: 'red', size: '16px', cursor: 'pointer'}}/>
                                    </span>
                            )}}/>
                        
                    </span>
                    ${updatePrice}
                </li>
            </ul>
        )
    };

    return (
        <div className="Cart-Wrapper">
            <h1>ORDER DETAILS</h1>
            <div className="Cart-User-Info">
            <FormControl>
                <TextField required id="Checkout-Name" label="Name" />
                <TextField required id="Checkout-Address" label="Address" />
                <TextField required id="Checkout-PhoneNumber" label="Phone Number" />
                <TextField required id="Checkout-EMail" label="E-Mail" />
            </FormControl>
            </div>
            <h2 className="Cart-Items-in-cart-title">Items in Cart</h2>
            <div className="Cart-Added-Items">                
                { (cartOrderList.length < 1) 
                    ? <h2>YOU HAVE NO ADDED ITEM</h2>
                    : cartOrderList.map((item, idx)=>(
                        <CartItemList 
                            key={`${item.title}-${idx}`}
                            cartItemDetail={item} />
                    ))
                }
            </div>
            <div className="Cart-Total-Amount">
                <h4>tax: ${(totalAmount * .07).toFixed(2)}</h4>
                <h3>TOTAL: ${(totalAmount * 1.07).toFixed(2)}</h3>
            </div>
            {/* <button onClick={handleCheckOut}>CHECK OUT</button> */}
            <MuiButton 
                props={{
                    color: '#717171',
                    bgColor: '#a2e6fd',
                    hColor: "white",
                    hbgColor: "#287d9a"
                }}
                disabled={(cartOrderList.length < 1) ? true : false}
                label='CHECK OUT'
                onClick={handleCheckOut}
                onKeyPress={handleCheckOut}
            />
        </div>
    );
};

Cart.defaultProps = {
    cartItemList: [{
        imgSrc: "http://www.myichot.com/wp-content/uploads/photo-gallery/imported_from_media_libray/thumb/IMG_9180-e1479504951999.jpg",
        itemNumber: '1',
        title: 'item name',
        description: 'item description',
        price: 10.99
    },{
        imgSrc: "http://www.myichot.com/wp-content/uploads/photo-gallery/imported_from_media_libray/thumb/IMG_9180-e1479504951999.jpg",
        itemNumber: '2',
        title: 'item name',
        description: 'item description',
        price: 11.99
    },{
        imgSrc: "http://www.myichot.com/wp-content/uploads/photo-gallery/imported_from_media_libray/thumb/IMG_9180-e1479504951999.jpg",
        itemNumber: '3',
        title: 'item name',
        description: 'item description',
        price: 12.99
    }]
}

export default Cart;