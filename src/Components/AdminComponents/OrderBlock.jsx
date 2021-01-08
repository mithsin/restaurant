import React from 'react';
import { MuiButton } from 'Components/MUI';
import moment from 'moment';
import axios from 'axios';
import './styles.scss';

const OrderBlock = ({ order, currentOrders, setCurrentOrders, index}) => {
    const {
        orderNumber,
        orderTime,
        ordId,
        itemDetails,
        buyerDetails,
    } = order; 

    const handleOrderFullfill = (orderId) => {
        const param = {
            ordId: orderId,
            fullFillStatus: true,
            fullFillTime: moment().format('MMMM Do YYYY, h:mm:ss a'),
        }
        axios.put(process.env.REACT_APP_API_RESTAURANT_ORDER, param)
            .then(res=> {
                console.log(res.data)
                if(res.data.update_status === "fullfilled success"){
                    setCurrentOrders(currentOrders.filter(order => order.ordId !== ordId));
                }
            })
            .catch(err=> console.log(err))
    }
    const OrderItemList = ({itemNumber, title, orderAmount}) => (
        <div className="OrderItemListWrapper">
            <h3>{itemNumber}</h3>
            <p>{title}</p>
            <h3>X {orderAmount}</h3>
        </div>
    );

    // const BuyerDetails = ({buyerDetails}) =>{
    //     const {
    //         address,
    //         eMail,
    //         name,
    //         phoneNumber,
    //     } = buyerDetails;
    // }
    return (
        <div className="OrderBlock-wrapper">
            <h3>{index}, order-number: {orderNumber}</h3>
            <span>order time: {orderTime}</span>
            {  itemDetails?.map((item, index) => {
               return <OrderItemList key={`orderItem-${index}`} {...item}/>
            })}
            <MuiButton 
                props={{
                    color: '#717171',
                    bgColor: '#a2e6fd',
                    hColor: "white",
                    hbgColor: "#287d9a",
                    margin: "auto 0 0 0",
                }}
                label='ORDER READY'
                onClick={()=> handleOrderFullfill(ordId)}
                onKeyPress={()=> handleOrderFullfill(ordId)}
            />
        </div>
    );
};

export default OrderBlock;