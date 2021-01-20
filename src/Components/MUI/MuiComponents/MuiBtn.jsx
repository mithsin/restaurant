import React from "react";
import {useTheme} from 'react-jss'
import { MuiButton } from "Components/MUI";

export const CancelButton = ({disabled, onClick, label=null}) => {
    const theme = useTheme()
    return (
        <MuiButton
            label={label ? label : "CANCEL"}
            props={theme.buttonType.btnCancel}
            { ...disabled && {disabled: disabled}}
            onClick={onClick} />
    )
}

export const EditButton = ({disabled, onClick, label=null}) => {
    const theme = useTheme()
    return (
        <MuiButton
            label={label ? label : "CANCEL"}
            props={theme.buttonType.btnEdit}
            { ...disabled && {disabled: disabled}}
            onClick={onClick} />
    )
}

export const SubmitButton = ({disabled, onClick, label=null}) => {
    const theme = useTheme()
    return (
        <MuiButton 
            label={!label ? "SUBMIT" : label}
            props={theme.buttonType.btnSubmit}
            { ...disabled && {disabled: disabled}}
            onClick={onClick} />
    )
}

export const InfoButton = ({disabled, onClick, label=null}) => {
    const theme = useTheme()
    return (
        <MuiButton
            label={label ? label : "Info"}
            props={theme.buttonType.btnInfo}
            { ...disabled && {disabled: disabled}}
            onClick={onClick} />
    )
}