import React, { useState, useEffect } from 'react';
import { MuiInputField, MuiCheckboxList, MuiCheckboxListWithCheckedInput } from 'Components/MUI';
import ImageUpload from 'Components/ImageUpload/ImageUpload';
import { SubmitButton, EditButton } from 'Components/MUI/MuiComponents/MuiBtn';
import './styles.scss';

const initItemState = {
    name: '',
    price: 0,
    details: '',
}

const AddOnBlock = ({addOnList=[], setAddOnList}) => {
    const [imageURL, setImageURL] = useState('');
    const [toggleUploadImg, setToggleUploadImg] = useState(true);

    const [inputError, setInputError] = useState(false);
    const [addNewAddOn, setAddNewAddOn] = useState(false)
    const [formInputs, setFormInputs] = useState({...initItemState});
    const handleCreateNewAddOn = () => {
        setAddNewAddOn(true);
    };

    useEffect(()=>{
        if(imageURL){
            setFormInputs({
                ...formInputs,
                imgSrc: imageURL
            })
        }
    },[imageURL])

    const formInputChange = (e) => {
        if(e.target.name === 'price'){
            setInputError(false)
            setFormInputs({ 
                ...formInputs,
                [e.target.name] :  e.target.value
            })
        } else {
            setInputError(false)
            setFormInputs({ 
                ...formInputs,
                [e.target.name] :  e.target.value
            })
        }
    };

    const handleAddOnSubmit = () => {
        setAddOnList(addOnList.concat(formInputs))
        setAddNewAddOn(false)
    }

    const inputSettings = [
        {
            type: "text",
            name: "name", 
            label: "name",
            required: true
        },{
            type: "text",
            name: "price", 
            label: "price",
            required: true
        },{
            type: "text",
            name: "details", 
            label: "details"
        }
    ];

    const AddOnItem = ({item}) => (
        <div className="AddOnItem-Wrap">
            <span className="AddOnItem-Name">{item.name}</span>
            <span className="AddOnItem-price">$ {item.price}</span>
            <span className="AddOnItem-details">{item.details}</span>
        </div>
    );

    return(
        <div className="AddOnBlock-Wrapper">
            <h3>Add-on list</h3>
            <div className="AddOnItemList-Wrap">
                {
                    (addOnList?.length > 0) && addOnList.map((item, index)=> <AddOnItem key={`${index}-item-add-on`} item={item}/>)
                }
            </div>

            { addNewAddOn &&
                <>
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
                    {inputSettings.map((inputSetting)=> 
                        <MuiInputField 
                            key={inputSetting.name} 
                            { ...inputSetting } 
                            onChange={ formInputChange } 
                            onKeyPress={ formInputChange }/>
                        )}
                </>
            }

            { !addNewAddOn &&
                <EditButton 
                    props={{
                        width: '150px',
                    }}
                    label="NEW ADD-ON"
                    disabled={ inputError }
                    onClick={ handleCreateNewAddOn }/>}
            {addNewAddOn && 
                <SubmitButton
                    props={{
                        width: '200px',
                    }}
                    label="SUBMIT NEW ADD-ON"
                    onClick={handleAddOnSubmit} />}
        </div>
    )
};

export default AddOnBlock;
