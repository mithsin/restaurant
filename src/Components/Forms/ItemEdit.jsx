import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MuiInputField, MuiCheckboxList, MuiCheckboxListWithCheckedInput } from 'Components/MUI';
import { SubmitButton } from 'Components/MUI/MuiComponents/MuiBtn';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AddOnBlock from 'Components/Forms/Components/AddOnBlock';
import ImageUpload from '../ImageUpload/ImageUpload';
import { setUpdateMenu } from 'States/menuSlice';

import { AddMenuItemHandleChange, SizeHandleChange, SizeInputHandleChange, toggleForLoopList } from './FormSubmitFunctions';
import {
    allergenListDefault,
    sizeListDefault,
    ItemToggles
} from './FormDefault';
import './styles.scss';

const ItemEdit = ({itemDetails, handleClose}) => {
    const {
        imgSrc,
        itemNumber,
        title,
        description,
        price,
    } = itemDetails;
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(itemDetails.itemDisable ? itemDetails.itemDisable : false);
    const [imageURL, setImageURL] = useState('');
    const [inputError, setInputError] = useState(false);
    const [toggleUploadImg, setToggleUploadImg] = useState(true);
    const [toggles, setToggles] = useState(ItemToggles);
    const [formInputs, setFormInputs] = useState({...itemDetails});
    const [allergenList, setAllergenList] = useState(itemDetails?.options?.allergens || allergenListDefault);
    const [sizeList, setSizeList] = useState(itemDetails?.options?.sizes || sizeListDefault);
    const [addOnList, setAddOnList] = useState(itemDetails?.options?.['add-on']);

    useEffect(()=>{
        if(imageURL){
            setFormInputs({
                ...formInputs,
                imgSrc: imageURL
            })
        }
    },[imageURL])
    const formInputChange = (e) => {
        if(e.target.name === 'points' && (/[^\d]/g).test(e.target.value)){
            setInputError(true)
        } else if (e.target.name === 'itemDisable'){
            setChecked(!checked);
            setFormInputs({ 
                ...formInputs,
                [e.target.name] : !checked
            })
        }else {
            setInputError(false)
            setFormInputs({ 
                ...formInputs,
                [e.target.name] : e.target.name === 'points' ? parseInt(e.target.value) : e.target.value
            })
        }
    };

    const handleSubmitEdit = () => {
        const fullUpdateMenu = (formInputs.itemDisable === undefined) ? {...formInputs, itemDisable: false} : formInputs;

        const isSizeListOn = sizeList.find(size => 
            (size.on === true) ? true : false
        )

        const isAllergenListOn = () => {
            for (var item in allergenList){
                if(allergenList[item]?.on === true) return true;
            }
        }

        // console.log('fullUpdateMenu--->: ', {
        //     ...fullUpdateMenu, 
        //     options: { 
        //         ...fullUpdateMenu?.options, 
        //         ...(isAllergenListOn() && {allergens: allergenList}),
        //         ...(isSizeListOn !== undefined && {sizes: sizeList}),
        //         ...(addOnList?.length > 0 && {
        //             ['add-on']: addOnList
        //         })
        //     }})
        dispatch(setUpdateMenu({
            ...fullUpdateMenu, 
            options: { 
                ...fullUpdateMenu?.options, 
                ...(isAllergenListOn() && {allergens: allergenList}),
                ...(isSizeListOn !== undefined && {sizes: sizeList}),
                ...(addOnList?.length > 0 && {
                    ['add-on']: addOnList
                })
            }}))
        handleClose();
    };

    // input box setting
    const inputSettings = [{
            type: "checkList",
            listTitle: "Allergens",
            list: allergenList,
            handleChange: AddMenuItemHandleChange,
            setChangeTrigger: setAllergenList,
        },{
            type: "checkList",
            listTitle: "Sizes",
            list: sizeList,
            handleChange: SizeHandleChange,
            setChangeTrigger: setSizeList,
            inputHandleChange: SizeInputHandleChange
        },{
            type: "checkList",
            listTitle: "Add-on",
            list: addOnList,
            setChangeTrigger: setAddOnList,
        },{
            type: "text",
            name: "title", 
            defaultValue: title,
            placeholder: "title"
        },{
            type: "text",
            name: "price", 
            defaultValue: price,
            placeholder: "price",
            className: inputError ? 'inputError' : ''
        },{
            type: "text",
            name: "description", 
            rows: 4,
            defaultValue: description,
            placeholder: "item description",
            className: inputError ? 'inputError' : ''
        }
    ];

    return (
        <div className="ItemEdit-Wrapper">
            <div className="Item-Details-Edit-Wrapper">
                <div className="inner-block">
                    <div className="form-container" >
                        <button onClick={()=> setToggleUploadImg(!toggleUploadImg)}>
                            {toggleUploadImg ? "upload image link" : "upload image"}
                        </button>
                        { toggleUploadImg 
                            ? <ImageUpload setImageURL={setImageURL}/>
                            : <MuiInputField
                                bgColor="#fff"
                                type="text"
                                name="imgSrc"
                                label="image link"
                                defaultValue={imgSrc}
                                onChange={(e)=> setImageURL(e.target.value)}/>}
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    checked={checked} 
                                    onChange={formInputChange} 
                                    name="itemDisable" />}
                            label="Disable"
                        />
                        {
                            <div className="Toggle-Block">
                                {toggleForLoopList(toggles, setToggles)}
                            </div>
                        }
                        {
                            inputSettings.map((inputSetting, index)=>{
                                if(inputSetting.type === "checkList"){
                                    if(toggles?.allergenToggle?.on === true && inputSetting.listTitle === "Allergens") {
                                        return (
                                            <MuiCheckboxList
                                                key={`inputsetting-${index}`}
                                                {...inputSetting}
                                                handleChange={inputSetting.handleChange}
                                                checkBoxState={inputSetting.list}
                                                setCheckBoxStateUpdate={inputSetting.setChangeTrigger}/>
                                        )
                                    }
                                    if(toggles?.sizeListToggle?.on === true && inputSetting.listTitle === "Sizes") {
                                        return (
                                            <MuiCheckboxListWithCheckedInput
                                                key={`inputsetting-${index}`}
                                                inputHandleChange={inputSetting.inputHandleChange}
                                                handleChange={inputSetting.handleChange}
                                                checkBoxState={inputSetting.list}
                                                setCheckBoxStateUpdate={inputSetting.setChangeTrigger}/>
                                        )
                                    }
                                    if(toggles?.addOnsToggle?.on === true && inputSetting.listTitle === "Add-on") {
                                        return (
                                            <AddOnBlock 
                                                addOnList={addOnList}
                                                setAddOnList={setAddOnList}
                                            /> 
                                        )
                                    }
                                }
                                if(inputSetting.type === "text"){
                                    return(
                                        <MuiInputField
                                            key={`${index}-inputsetting`}
                                            {...inputSetting}
                                            bgColor="#fff"
                                            name={inputSetting.name}
                                            label={inputSetting.placeholder}
                                            onChange={ formInputChange }/>)
                                }
                        })}
                        <SubmitButton  
                            label="SUBMIT UPDATE"
                            onClick={ handleSubmitEdit }/>
                    </div>
                </div>
            </div>
            <div className="Item-Details-Edit-Wrapper">
                <div className="Item-Details-Close">
                    <FontAwesomeIcon onClick={handleClose} icon={faTimes} style={{margin: '1rem', cursor: 'pointer'}} className="fa-2x"/>
                </div>
                <div>
                    <div className="Item-Card-Img-block">
                        <span>{itemNumber}</span>
                        <img src={imgSrc} alt={title}/>
                    </div>
                </div>
                <div className="Item-Details-Text">
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <span>${price}</span>
                </div>
            </div>
        </div>
    );
};

export default ItemEdit;