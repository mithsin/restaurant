import React, { useState, useEffect } from "react";
import { SubmitButton } from 'Components/MUI/MuiComponents/MuiBtn';
import {
    Elements,
    useElements,
    useStripe
  } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
// import axios from 'axios';

const AliPayBtn = ({buyerDetails}) => {
    const stripe = useStripe();
    const stripePromise = loadStripe
    ('pk_test_51I8WMcEFoepYxM6pCNMtpNb0Tvh8pTLqzYMNrocMJoqBjSQ4Eo5ls4lplxrmSLTGWydlBrAkJp0a9Zgr6tKK8jTw00fquGZFlE');
    const elements = useElements();
    const [srcId, setSrcId] = useState('');
    const [clientId, setClientId] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [chargeAmount, setChargeAmount] = useState();


    useEffect(()=>{
        if(paymentStatus === "chargeable"){
            chargePayment(srcId);
        }
    },[paymentStatus])

    // create AliPay source
    const handleOnClickAliPay = () => {
        stripe.createSource({
            type: 'alipay',
            amount: 1099,
            currency: 'usd',
            redirect: {
              return_url: 'https://mimitale.com',
            },
          }).then(function(result) {
            // handle result.error or result.source
            console.log("result--->: ", result?.source?.redirect?.url);
            setSrcId(result?.source?.id);
            setClientId(result?.source?.client_secret);
          });
    }
    
    // Get source update status
    const handleReturnSrc = async() => {
        const paymentIntent = await stripe.retrieveSource({
            id: srcId,
            client_secret: clientId,
          });
        //   console.log('paymentIntent-->: ', paymentIntent);
        //   console.log('paymentIntent.source.status--->: ', paymentIntent?.source?.status)
          if(paymentIntent?.source?.status === "chargeable"){
                setPaymentStatus(paymentIntent?.source?.status);
                setChargeAmount(paymentIntent?.source?.amount);
          };
    };

    // Charge if status is Chargeable by useEffect
    const chargePayment = async() => {
        // return charge;
        const paymentData = {
            token: srcId,
            amount: chargeAmount,
            description: buyerDetails.toString()
        };

        const response = await fetch(`${process.env.REACT_APP_API_STRIPE_CHECKOUT}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentData),
        });

        response.json()
            .then(res => {
            if(res.statusCode === 200){
                console.log("successful--->: ", res)
            } else {
                console.log("not 200, something else is wrong--->: ", res)
            }})
            .catch(err=> err)
    };

    return(
        <Elements stripe={stripePromise}>       
            <SubmitButton 
                label='Alipay'
                onClick={handleOnClickAliPay}
            />
            <SubmitButton 
                label='Source'
                onClick={handleReturnSrc}
            />
        </Elements>
    )
};

export default AliPayBtn;

