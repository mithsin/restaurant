import React from 'react';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles';


const MuiButton = ({props, label, onClick, onKeyPress, disabled, type}) => {
    const classes = useStyles(props);
    return <Button 
                variant="contained" 
                className={classes.buttonStyle} 
                onClick={ onClick }
                { ...disabled && {disabled: disabled}}
                { ...onKeyPress && {onKeyPress: onKeyPress}}
                { ...type && {type: type}}
                >
              {label}
           </Button>;
};

export default MuiButton;