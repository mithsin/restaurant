import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setClearOrderList } from 'States/orderSlice';
import { CancelButton } from 'Components/MUI/MuiComponents/MuiBtn';
import { useHistory } from 'react-router-dom';
import './styles.scss'; 

const OrderReceipt = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const wsUri = process.env.REACT_APP_API_WEBSOCKETS;
    const websocket = new WebSocket(wsUri);
    
    // triiger websocket to send order on load, and disable button until websocket successfully update the order
    useEffect(()=>{
        websocket.onopen = (event) => {
            const sendMessage = {
                message : "New order available", 
                action : "message"
            }
            dispatch(setClearOrderList());
            websocket.send(JSON.stringify(sendMessage));
        }
    },[])

    const handleOnClick = () => {
        websocket.close();
        history.push('/')
    };

    return(
        <div className="OrderReceipt-wrapper">
            <h2>Order Receipt</h2>
            <div>
                THANK YOU AND YOUR ORDER WILL BE READY SOON
            </div>
            <CancelButton 
                label='CLOSE'
                onClick={handleOnClick}
                onKeyPress={handleOnClick}
            />
        </div>
    );
};

export default OrderReceipt;