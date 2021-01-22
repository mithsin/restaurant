import React from "react";
import {useTheme} from 'react-jss'
import { MuiButton } from "Components/MUI";

export const CancelButton = ({props, disabled, onClick, label=null}) => {
    const theme = useTheme()
    return (
        <MuiButton
            label={label ? label : "CANCEL"}
            props={{...props, ...theme.buttonType.btnCancel}}
            { ...disabled && {disabled: disabled}}
            onClick={onClick} />
    )
}

export const EditButton = ({props, disabled, onClick, label=null}) => {
    const theme = useTheme()
    return (
        <MuiButton
            label={label ? label : "CANCEL"}
            props={{...props, ...theme.buttonType.btnEdit}}
            { ...disabled && {disabled: disabled}}
            onClick={onClick} />
    )
}

export const SubmitButton = ({props, disabled, onClick, label=null}) => {
    const theme = useTheme()
    return (
        <MuiButton 
            label={!label ? "SUBMIT" : label}
            props={{...props, ...theme.buttonType.btnSubmit}}
            { ...disabled && {disabled: disabled}}
            onClick={onClick} />
    )
}

export const InfoButton = ({props, disabled, onClick, label=null}) => {
    const theme = useTheme()
    return (
        <MuiButton
            label={label ? label : "Info"}
            props={{...props, ...theme.buttonType.btnInfo}}
            { ...disabled && {disabled: disabled}}
            onClick={onClick} />
    )
}