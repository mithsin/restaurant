import React from 'react';
import { SubmitButton } from 'Components/MUI/MuiComponents/MuiBtn';
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
            fullFillTime: new Date(),
            // fullFillTime: moment().format('MMMM Do YYYY, h:mm:ss a'),
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

    return (
        <div className="OrderBlock-wrapper">
            <h3>{index}, order-number: {orderNumber}</h3>
            <span>order time: {moment(orderTime).format('MMMM Do YYYY, h:mm:ss a')}</span>
            {  itemDetails?.map((item, index) => {
               return <OrderItemList key={`orderItem-${index}`} {...item}/>
            })}
            <SubmitButton 
                props={{margin: 'auto 0 0 0'}}
                label='ORDER READY'
                onClick={()=> handleOrderFullfill(ordId)}
                onKeyPress={()=> handleOrderFullfill(ordId)}
            />
        </div>
    );
};

export default OrderBlock;