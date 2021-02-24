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
        resetCart: (state, action) => {
            localStorage.setItem('inCart', JSON.stringify(action.payload));
            state.cart = action.payload;
        },
        setCart: (state, action) => {
            const initCart = action.payload;
            localStorage.setItem('inCart', JSON.stringify(initCart));
            return { ...state, cart: initCart }
        },
        setCartUpdate: (state, action) => {
            const updateCart = state.cart.map(item => {

                return ( item.cartItemNumber !== action.payload.cartItemNumber)
                    ? item 
                    : {...item, ...action.payload}
            })
            localStorage.setItem('inCart', JSON.stringify(updateCart));
            return {...state, cart: updateCart}
        },
        setDeleteItem: (state, action) => {
            const updateCart = state.cart.filter(item => item.cartItemNumber !== action.payload.cartItemNumber);
            localStorage.setItem('inCart', JSON.stringify(updateCart));
            return {...state, cart: updateCart}
        },
        setClearOrderList: (state, action) => {
            localStorage.removeItem('inCart');
            return {...state, cart: []}
        }
    },
});

export const {
    resetCart,
    setCart,
    setCartUpdate,
    setDeleteItem,
    setClearOrderList,
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
export const deleteOrder = (orderId) => dispatch => {
    const param = {
        ordId: orderId
    }
    axios.delete(process.env.REACT_APP_API_RESTAURANT_ORDER, param)
        .then(res => {
            if(res.data.status === 200){
                dispatch(setCart([]))
                localStorage.removeItem('inCart');
            }
        })
        .catch(err=> console.log('new order error: ', err))
}

export const orderDetailState = state => state.orderState.cart;
export const currentOrderNumberIs = state => state.orderState.orderNumber;

export default orderSlice.reducer;