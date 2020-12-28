import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const localtStorageCart = JSON.parse(localStorage.getItem('inCart'));
const initState = {
    cart: localtStorageCart? localtStorageCart : [],
}

export const orderSlice = createSlice({
    name: 'orderState',
    initialState: initState,
    reducers: {
        setCart: (state, action) => {
            const initCart = action.payload;
            localStorage.setItem('inCart', JSON.stringify(initCart));
            return { ...state, cart: initCart }
        },
        setCartUpdate: (state, action) => {
            const updateCart = state.cart.map(item => {
                return ( item.itemNumber !== action.payload.itemNumber)
                    ? item 
                    : {...item, ...action.payload}
            })
            localStorage.setItem('inCart', JSON.stringify(updateCart));
            return {...state, cart: updateCart}
        },
        setDeleteItem: (state, action) => {
            const updateCart = state.cart.filter(item =>  item.itemNumber !== action.payload.itemNumber);
            localStorage.setItem('inCart', JSON.stringify(updateCart));
            return {...state, cart: updateCart}
        },
    },
});

export const {
    setCart,
    setCartUpdate,
    setDeleteItem,
} = orderSlice.actions;


export const getAllNotFullfilledOrders = () => dispatch =>{};
export const postNewOrder = (newOrderState) => dispatch => {
    axios.post(process.env.REACT_APP_API_RESTAURANT_ORDER, newOrderState)
        .then(res => {
            if(res.data.status === 200){
                dispatch(setCart([]))
                localStorage.removeItem('inCart');
            }
        })
        .catch(err=> console.log('new order error: ', err))
};
export const updateOrderFullFillStatus = () => dispatch => {};
export const deleteOrder = () => dispatch => {}

export const orderDetailState = state => state.orderState.cart;
export const currentOrderNumberIs = state => state.orderState.orderNumber;

export default orderSlice.reducer;