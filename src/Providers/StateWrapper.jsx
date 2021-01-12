import React, { useEffect } from 'react';
import { setMenu } from 'States/menuSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import "./styles.scss";

const StateWrapper = ({children}) => {
    const dispatch = useDispatch();
    const stripePromise = loadStripe("pk_test_51I8WMcEFoepYxM6pCNMtpNb0Tvh8pTLqzYMNrocMJoqBjSQ4Eo5ls4lplxrmSLTGWydlBrAkJp0a9Zgr6tKK8jTw00fquGZFlE");

    // const currentMenuState = useSelector(menuListState)
    useEffect(()=>{
        axios.get(process.env.REACT_APP_API_RESTAURANT_MENU)
            .then(res => {
                dispatch(setMenu(res.data.menu));
            })
            .catch(err => console.log(err))
    },[])
    return(
        <Elements stripe={stripePromise}>
            <div id="state-wrapper" className="StateWrapperBody">
                {children}
            </div>
        </Elements>
    );
};

export default StateWrapper;