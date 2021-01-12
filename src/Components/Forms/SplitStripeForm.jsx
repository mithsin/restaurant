import React, { useMemo } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postNewOrder } from 'States/orderSlice';
import { MuiButton } from 'Components/MUI';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from "@stripe/react-stripe-js";
import moment from 'moment';

import useResponsiveFontSize from "./useResponsiveFontSize";

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    [fontSize]
  );

  return options;
};

const stripeTokenHandler = async(
  token, 
  amount,
  itemDetails,
  buyerDetails,
  dispatch,
  history
) => {

  const handlePurchaseDispatch = () => {

    const param = {
        orderNumber: '',
        orderTime: moment().format('MMMM Do YYYY, h:mm:ss a'),
        fullFillTime: '',
        fullFillStatus: false,
        itemDetails: itemDetails,
        buyerDetails: {...buyerDetails}
    }
    dispatch(postNewOrder(param))
    history.push('/order-receipt') 
  }

  const paymentData = {
    token: token.id,
    amount: amount,
    description: itemDetails.toString()
  };
  // Use fetch to send the token ID and any other payment data to your server.
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  const response = await fetch('https://rxwqxzr479.execute-api.us-east-1.amazonaws.com/dev/payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(paymentData),
  });

  // Return and display the result of the charge.
  response.json()
    .then(res => {
      if(res.statusCode === 200){
        handlePurchaseDispatch();
      } else {
        console.log("not 200, something else is wrong")
      }})
    .catch(err=> err)
  // return response.json();
}

const SplitStripeForm = ({
    disableCheckout,
    itemDetails,
    buyerDetails,
    dollarAmount,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const dispatch = useDispatch();
  let history = useHistory();

  const handleSubmit = async event => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardNumberElement);
    const result = await stripe.createToken(card);
    if(result.error){
      console.log('result-err---->: ', result.error.message)
    } else {

      stripeTokenHandler(
        result.token, 
        dollarAmount, 
        itemDetails, 
        buyerDetails,
        dispatch,
        history);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Card number
        <CardNumberElement
          options={options}
          onChange={event => event}
        />
      </label>
      <label>
        Expiration date
        <CardExpiryElement
          options={options}
          onChange={event => event}
        />
      </label>
      <label>
        CVC
        <CardCvcElement
          options={options}
          onChange={event => event}
        />
      </label>
      <MuiButton 
          props={{
              color: '#717171',
              bgColor: '#a2e6fd',
              hColor: "white",
              hbgColor: "#287d9a"
          }}
          disabled={ (!stripe || disableCheckout || (itemDetails.length < 1)) ? true : false }
          label='CHECK OUT'
          type="submit"
      />
    </form>
  );
};

export default SplitStripeForm;
