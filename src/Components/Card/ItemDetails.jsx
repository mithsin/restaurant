import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderDetailState, setCart, setCartUpdate, resetCart } from 'States/orderSlice';
import { v4 as uuid_v4 } from "uuid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MuiNumberInput } from 'Components/MUI';
import { SubmitButton } from 'Components/MUI/MuiComponents/MuiBtn';
import { MuiInputField, MuiCheckboxList, MuiCheckboxListWithCheckedInput } from 'Components/MUI';
import { AddMenuItemHandleChange, SizeHandleChange, SizeInputHandleChange, toggleForLoopList } from 'Components/Forms/FormSubmitFunctions';
import { formatArrayObjToMuiCheckboxFormat } from 'Constant/FormatArrayFunction';
import { iconFunction, handleFullUpdateAndAddToCart } from 'Constant/ConstantFunction';
import { formatUpdateObjByKeyInArray } from 'Constant/FormatObjFunction';
import './styles.scss';

const ItemDetails = ({itemDetails, handleClose, cartOrderList}) => {
    const dispatch = useDispatch();
    const {
        imgSrc,
        itemNumber,
        title,
        description,
        price,
        options,
    } = itemDetails;
    const [currentOrderAmount, setCurrentOrderAmount] = useState(1)
    const [addAddOn, setAddAddOn] = useState(
        itemDetails?.options?.['add-on']
            ? formatArrayObjToMuiCheckboxFormat(itemDetails?.options?.['add-on'])
            : []);
    const [checkoutPrice, setCheckoutPrice] = useState(price);

    useEffect(()=>{
        let updatePrice = parseInt(price * 100);
        addAddOn && addAddOn.forEach(item => {
             (item.on === true) && (updatePrice = updatePrice + parseInt(item.price * 100))
        })
        setCheckoutPrice((updatePrice * currentOrderAmount /100).toFixed(2))
    },[addAddOn, currentOrderAmount]);
    const handleAddItemToCart = async() => {
        const cartData = {
            ...itemDetails,
            cartItemNumber: uuid_v4(),
            price: (checkoutPrice/currentOrderAmount),
            orderAmount: parseInt(currentOrderAmount),
            ...(addAddOn && {addOnSelected: addAddOn.filter(item => item.on)})
        };
        dispatch(resetCart(handleFullUpdateAndAddToCart(cartData, cartOrderList)));
        handleClose();
    };

    return (
        <div className="Item-Details-Wrapper">
            <div className="Item-Details-Close">
                <FontAwesomeIcon onClick={handleClose} icon={faTimes} style={{margin: '1rem', cursor: 'pointer'}} className="fa-2x"/>
            </div>
            <div>
                <div className="Item-Card-Img-block">
                    <span>{itemNumber}</span>
                    <img src={imgSrc} alt={title}/>
                    <div style={{position: 'absolute', top: '5px', left: '5px'}}>
                        {iconFunction(options?.allergens)}
                    </div>
                </div>
            </div>
            <div className="Item-Details-Text">
                <h2>{title}</h2>
                <p>{description}</p>
                { itemDetails?.options?.['add-on'] && 
                    <MuiCheckboxList 
                        checkBoxState={addAddOn}
                        handleChange={AddMenuItemHandleChange}
                        setCheckBoxStateUpdate={setAddAddOn}/>
                }
                <h3>${checkoutPrice}</h3>
                <MuiNumberInput 
                    min="1"
                    max="50"
                    currentNumber={currentOrderAmount}
                    setCurrentNumber={setCurrentOrderAmount}
                />
                <SubmitButton 
                    label='ADD TO CART'
                    onClick={handleAddItemToCart}
                    onKeyPress={handleAddItemToCart}/>
            </div>
        </div>
    );
};

export default ItemDetails;