import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderDetailState, setCartUpdate, setDeleteItem } from 'States/orderSlice';
import { AddCircle, RemoveCircle } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';
import SplitStripeForm from 'Components/Forms/SplitStripeForm';
import './styles.scss';

const Cart = ({}) => { 
    const [totalAmount, setTotalAmount] = useState(0)
    const [buyerDetails, setBuyerDetails] = useState({})
    const [disableCheckout, setDisableCheckout] = useState(true)
    const [haveError, setHaveError] = useState('')
    const cartOrderList = useSelector(orderDetailState);
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
    
    const dollarAndTax = (a) => {return parseInt((a * 1.07 * 100).toFixed(2))};
    const buyerInputChange = (event) => {
        event.preventDefault();
        setBuyerDetails({...buyerDetails, [event.target.name]: event.target.value})
    }

    const CartItemList = ({ cartItemDetail }) => {
        const {
            imgSrc,
            itemNumber,
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

            {haveError && <p style={{color: 'red'}}>{haveError}</p>}
            <div className="Cart-User-Info">
                <FormControl>
                    <TextField required name="name" id="Checkout-Name" label="Name" onChange={buyerInputChange} />
                    <TextField name="address" id="Checkout-Address" label="Address" onChange={buyerInputChange} />
                    <TextField required name="phoneNumber" id="Checkout-PhoneNumber" label="Phone Number" onChange={buyerInputChange} />
                    <TextField name="eMail" id="Checkout-EMail" label="E-Mail" onChange={buyerInputChange} />
                </FormControl>
                <SplitStripeForm 
                    disableCheckout={ disableCheckout }
                    itemDetails={ cartOrderList }
                    buyerDetails={ buyerDetails }
                    dollarAmount={ dollarAndTax(totalAmount) }
                    setHaveError={ setHaveError }
                />
            </div>
        </div>
    );
};

export default Cart;