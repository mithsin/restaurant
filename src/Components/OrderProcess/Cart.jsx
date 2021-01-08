import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { orderDetailState, postNewOrder, setCartUpdate, setDeleteItem } from 'States/orderSlice';
import { AddCircle, RemoveCircle } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';
import { MuiButton } from 'Components/MUI';
import moment from 'moment';


import './styles.scss';

const Cart = ({}) => {
    let history = useHistory();
    const dispatch = useDispatch();
    const [totalAmount, setTotalAmount] = useState(0)
    const [buyerDetails, setBuyerDetails] = useState({})
    const [disableCheckout, setDisableCheckout] = useState(true)
    const cartOrderList = useSelector(orderDetailState);
    // const wsUri = process.env.REACT_APP_API_WEBSOCKETS;
    // const websocket = new WebSocket(wsUri);
    useEffect(()=>{
        cartOrderList && 
        setTotalAmount(cartOrderList.reduce((accumulator, current) => {
            return (accumulator + (parseInt(current.orderAmount) * current.price))
        }, 0));
    },[cartOrderList])
    useEffect(()=>{
        if(!buyerDetails.name || !buyerDetails.phoneNumber){ setDisableCheckout(true)} 
        if(buyerDetails.name && buyerDetails.phoneNumber) {setDisableCheckout(false)}
    },[buyerDetails])
    
    // this should happen when payment successful
        // const onMessage = (evt) => {
        //     console.log('onMessage: ', evt)
        //     evt?.data && history.push('/order-receipt')

        // }
        // websocket.onmessage = function(evt) { onMessage(evt) };

        // const handleCheckOutWebsocket = (message) => {

        //     const sendMessage = {
        //         message : "New order available", 
        //         action : "message"
        //     }
            
        //     websocket.send(JSON.stringify(sendMessage));
        // }
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//

  
    // This should be the function when payment successful
        // Dispatch order to database and redux store
        // the change page to receipt
    const onPaymentSuccessful = (param) => {
        dispatch(postNewOrder(param))
    }

    const handleCheckOut = () => {
        const param = {
            orderNumber: '',
            orderTime: moment().format('MMMM Do YYYY, h:mm:ss a'),
            fullFillTime: '',
            fullFillStatus: false,
            itemDetails: cartOrderList,
            buyerDetails: {...buyerDetails}
        }
        onPaymentSuccessful(param)
        history.push('/order-receipt')
    }


    const buyerInputChange = (event) => {
        event.preventDefault();
        setBuyerDetails({...buyerDetails, [event.target.name]: event.target.value})
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
                <TextField required name="name" id="Checkout-Name" label="Name" onChange={buyerInputChange} />
                <TextField name="address" id="Checkout-Address" label="Address" onChange={buyerInputChange} />
                <TextField required name="phoneNumber" id="Checkout-PhoneNumber" label="Phone Number" onChange={buyerInputChange} />
                <TextField name="eMail" id="Checkout-EMail" label="E-Mail" onChange={buyerInputChange} />
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
                disabled={ (disableCheckout || (cartOrderList.length < 1)) ? true : false }
                label='CHECK OUT'
                onClick={handleCheckOut}
                onKeyPress={handleCheckOut}
            />
        </div>
    );
};

export default Cart;