import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { menuListState, setAddNewMenuCategory } from 'States/menuSlice';
import { MuiInputField, MuiCheckboxList, MuiCheckboxListWithCheckedInput } from 'Components/MUI';
import { SubmitButton } from 'Components/MUI/MuiComponents/MuiBtn';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ImageUpload from 'Components/ImageUpload/ImageUpload';
import Modal from '@material-ui/core/Modal';
import './styles.scss';
import {
    allergenListDefault,
    sizeListDefault,
    initItemState,
    ItemToggles
} from './FormDefault';
import { AddMenuItemHandleChange, SizeHandleChange, SizeInputHandleChange, toggleForLoopList } from './FormSubmitFunctions';
import AddOnBlock from 'Components/Forms/Components/AddOnBlock';

const AddMenuItem = ({thisCategory, open, handleToggle}) => {
    const dispatch = useDispatch();
    const  menuState= useSelector(menuListState);
    const [imageURL, setImageURL] = useState('');
    const [inputError, setInputError] = useState(false);
    const [toggleUploadImg, setToggleUploadImg] = useState(true);
    const [toggles, setToggles] = useState(ItemToggles);
    const [formInputs, setFormInputs] = useState({...initItemState});
    const [allergenList, setAllergenList] = useState(allergenListDefault);
    const [sizeList, setSizeList] = useState(sizeListDefault);
    const [addOnList, setAddOnList] = useState([]);

    useEffect(()=>{
        if(imageURL){
            setFormInputs({
                ...formInputs,
                imgSrc: imageURL
            })
        }
    },[imageURL])
    const formInputChange = (e) => {
        if(e.target.name === 'itemNumber'){
            setInputError(false)
            setFormInputs({ 
                ...formInputs,
                [e.target.name] :  e.target.value.toUpperCase()
            })
        } else {
            setInputError(false)
            setFormInputs({ 
                ...formInputs,
                [e.target.name] :  e.target.value
            })
        }
    };

    const handleSubmitEdit = () => {
        const checkItemNumberExist = formInputs?.itemNumber && (thisCategory.menuList.find(item => item.itemNumber === formInputs?.itemNumber) !== undefined);

        const isAllergenListOn = () => {
            for (var item in allergenList){
                if(allergenList[item]?.on === true) return true;
            }
        }
        const isSizeListOn = sizeList.find(size => 
            (size.on === true) ? true : false
        )
        if(!checkItemNumberExist){
            const fullMenu = menuState.map((category)=>
                (category.title === thisCategory.title)
                    ?  {
                        ...category,
                        menuList: category.menuList.concat([{...formInputs, 
                            options: {
                                ...formInputs?.options,
                                ...(isAllergenListOn() && {allergens: allergenList}),
                                ...(isSizeListOn !== undefined && {sizes: sizeList}),
                                ...(addOnList?.length > 0 && {
                                    ['add-on']: addOnList
                                })
                            }
                        }])
                    }
                    : category
            );
            // console.log('fullMenu-->: ', fullMenu);
            dispatch(setAddNewMenuCategory(fullMenu));
            setFormInputs({});
            setImageURL('');
            setAllergenList(allergenListDefault)
            setSizeList(sizeListDefault);
            setAddOnList([]);
            handleToggle();
        } else {
            // console.log('item number already exist')
            setInputError(true)
        }
    };

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
        name: "itemNumber",
        placeholder: "itemNumber",
        ...inputError && {color: "red"}
    },{
        type: "text",
        name: "title",
        placeholder: "title",
    },{
        type: "text",
        name: "description",
        placeholder: "description",
    },{
        type: "text",
        name: "price",
        placeholder: "price",
    }];

    return(
        <Modal
            open={open}
            onClose={handleToggle}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            style={{
                overflow: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
            }}>
            <div className="AddMenuItem-Wrapper">
                <div className="inner-block">
                    <div className="form-container" >
                        <div className="Item-Details-Close">
                            <FontAwesomeIcon onClick={handleToggle} icon={faTimes} style={{margin: '1rem', cursor: 'pointer'}} className="fa-2x"/>
                        </div>
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
                                onChange={(e)=> setImageURL(e.target.value)}/>}
                        {inputError && <h2 style={{color: 'red'}}>This item number already exist</h2>}
                        {
                            <div className="Toggle-Block">
                                {toggleForLoopList(toggles, setToggles)}
                            </div>
                        }
                        {
                            inputSettings.map((inputSetting, index)=> {
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
                                                {...inputSetting}
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
                            label="ADD ITEM"
                            disabled={ inputError }
                            onClick={ handleSubmitEdit }/>
                    </div>
                </div>
            </div>
        </Modal>
    )
};

export default AddMenuItem;