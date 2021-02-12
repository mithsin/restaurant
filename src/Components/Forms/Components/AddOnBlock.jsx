import React, { useState, useEffect } from 'react';
import { MuiInputField, MuiCheckboxList, MuiCheckboxListWithCheckedInput } from 'Components/MUI';
import { SubmitButton, EditButton } from 'Components/MUI/MuiComponents/MuiBtn';

const AddOnBlock = ({itemDetails, handleClose}) => {
    const inputSettings = [
        {
            type: "text",
            name: "addon", 
            label: "name",
            required: true
        },{
            type: "text",
            name: "addon", 
            label: "price",
            required: true
        },{
            type: "text",
            name: "addon", 
            label: "details"
        }
    ];
    return(
        <div>
            <EditButton 
                label="ADD ITEM"
                disabled={ inputError }
                onClick={ handleSubmitEdit }/>
            {
                inputSettings.map((inputSetting)=>
                    <MuiInputField 
                        key={inputSetting.name} 
                        { ...inputSetting } 
                        onChange={ formInputChange } 
                        onKeyPress={ LoginSubmitKeyPress }/>
                )
            }

            <SubmitButton 
                        label="LOGIN"
                        onClick={LoginSubmit} />
        </div>
    )
};

export default AddOnBlock;
