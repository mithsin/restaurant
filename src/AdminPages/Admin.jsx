import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { userLogout } from 'States/userSlice';
import { CancelButton } from 'Components/MUI/MuiComponents/MuiBtn';
import AdminOrders from './AdminOrders';
import AdminMenu from './AdminMenu';
import MuiTabs from 'Components/MUI/MuiTabs';
import axios from 'axios';

const Admin = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [currentOrders, setCurrentOrders] = useState([]);
    const wsUri = process.env.REACT_APP_API_WEBSOCKETS;
    const websocket = new WebSocket(`${wsUri}?ID=admin`);
    const [notify, closeNotify] = useState(false);
    const [notice, setNotice] = useState()
    useEffect(()=>{
            axios.get(process.env.REACT_APP_API_RESTAURANT_ORDER)
                .then(res => {
                    setCurrentOrders(res.data.orders)
                })
                .catch(err => console.log(err))
    },[]);
    useEffect(()=>{
        if(notice){
            axios.get(process.env.REACT_APP_API_RESTAURANT_ORDER)
                .then(res => {
                    closeNotify(true)
                    setCurrentOrders(res.data.orders)
                })
                .catch(err => console.log(err))
        }
    },[notice]);

    websocket.onmessage = (evt) => { 
        setNotice(evt.data)
    };

    const tabArray = [{
        title: "ORDERS",
        page: <AdminOrders 
                setNotice={setNotice}
                notice={notice}
                notify={notify}
                closeNotify={()=>closeNotify(false)}
                currentOrders={currentOrders}
                setCurrentOrders={setCurrentOrders}/>
    },{
        title: "MENU",
        page: <AdminMenu />
    }];

    return(
        <div style={{
            maxWidth: '1440px',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
        }}>
            <div style={{
                maxWidth: '1440px',
                margin: 'auto',
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
            }}>
                <h1>ADMIN DASHBOARD</h1>
                <span style={{
                    width: '100px',
                }}>
                    <CancelButton 
                        label='Logout'
                        onClick={()=> dispatch(userLogout({history}))}
                    />
                </span>
            </div>
            <MuiTabs tabArray={tabArray} />
            
        </div>
    )
};

export default Admin;