import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { menuListState, setAddNewMenuCategory } from 'States/menuSlice';
import { MuiInputField, MuiCheckboxList } from 'Components/MUI';
import { EditButton } from 'Components/MUI/MuiComponents/MuiBtn';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ImageUpload from '../ImageUpload/ImageUpload';
import Modal from '@material-ui/core/Modal';
import './styles.scss';

const initItemState = {
    imgSrc: '',
    itemNumber: '',
    title: '',
    description: '',
    price: '',
}

const AddMenuItem = ({thisCategory, open, handleToggle}) => {
    const dispatch = useDispatch();
    const  menuState= useSelector(menuListState);
    const [formInputs, setFormInputs] = useState({...initItemState});
    const [imageURL, setImageURL] = useState('');
    const [inputError, setInputError] = useState(false);
    const [toggleUploadImg, setToggleUploadImg] = useState(true);
    const [allergenList, setAllergenList] = useState([])
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
        if(!checkItemNumberExist){
            const fullMenu = menuState.map((category)=>
                (category.title === thisCategory.title)
                    ?  {
                        ...category,
                        menuList: category.menuList.concat([{...formInputs, options: {...formInputs?.options, allergens: allergenList}}])
                    }
                    : category
            );
            console.log('fullMenu-->: ', fullMenu);
            // dispatch(setAddNewMenuCategory(fullMenu));
            // setFormInputs({});
            // setImageURL('');
            // handleToggle();
        } else {
            // console.log('item number already exist')
            setInputError(true)
        }

    };

    const inputSettings = [{
        type: "checkList",
        listTitle: "Allergens",
        list: [
            {title: "milk", on: false},
            {title: "egg", on: false},
            {title: "fish", on: false},
            {title: "shellfish", on: false},
            {title: "peanuts", on: false},
            {title: "wheat", on: false},
            {title: "soybeans", on: false},
            {title: "garlic", on: false},
            {title: "onion", on: false},
        ]
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
                            inputSettings.map((inputSetting, index)=> {
                                if(inputSetting.type === "checkList"){
                                    console.log('inputSetting--->: ', inputSetting)
                                    return (
                                        <MuiCheckboxList 
                                            {...inputSetting} 
                                            updateListState={inputSetting.list} 
                                            setUpdateListState={setAllergenList}/>
                                    )
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
                        <EditButton 
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