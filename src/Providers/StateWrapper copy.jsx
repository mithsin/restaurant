import React, { useEffect } from 'react';
import { menuListState, setMenu } from 'States/menuSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import "./styles.scss";

const StateWrapper = ({children}) => {
    const dispatch = useDispatch();
    const currentMenuState = useSelector(menuListState)
    useEffect(()=>{
        let menuSession = sessionStorage.getItem('menu');
        let timeSession = sessionStorage.getItem('menuTime');
        const timeForceRefresh = (new Date() - new Date(timeSession) > 600000);
        if((currentMenuState !== null && (currentMenuState?.length < 1) && !menuSession) || timeForceRefresh ){
            axios.get(process.env.REACT_APP_API_RESTAURANT_MENU)
                .then(res => {
                    sessionStorage.setItem('menu', JSON.stringify(res.data.menu));
                    sessionStorage.setItem('menuTime', new Date());
                    dispatch(setMenu(res.data.menu));
                })
                .catch(err => console.log(err))
        };
        if(currentMenuState !== null && (currentMenuState?.length < 1) && menuSession){
            dispatch(setMenu(JSON.parse(menuSession)));
        }
    },[])
    return(
        <div id="state-wrapper" className="StateWrapperBody">
            {children}
        </div>
    );
};

export default StateWrapper;