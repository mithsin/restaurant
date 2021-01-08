import React, { useEffect } from 'react';
import { setMenu } from 'States/menuSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import "./styles.scss";

const StateWrapper = ({children}) => {
    const dispatch = useDispatch();
    // const currentMenuState = useSelector(menuListState)
    useEffect(()=>{
        axios.get(process.env.REACT_APP_API_RESTAURANT_MENU)
            .then(res => {
                dispatch(setMenu(res.data.menu));
            })
            .catch(err => console.log(err))
    },[])
    return(
        <div id="state-wrapper" className="StateWrapperBody">
            {children}
        </div>
    );
};

export default StateWrapper;