import React from 'react';
import { AddCircle, RemoveCircle } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import './styles.scss';

const MuiNumberInput = ({
    min, 
    max,
    currentNumber,
    setCurrentNumber,
    price = null,
}) => {
    const updatePrice = price && (parseInt(currentNumber) * price).toFixed(2);

    const handleCheckoutAddUpdate = (num) => {
        if(parseInt(currentNumber) < num){
            setCurrentNumber(parseInt(currentNumber) + 1)
        }
    }
    const handleCheckoutMinusUpdate = (num) => {
        if(parseInt(currentNumber) > num){
            setCurrentNumber(parseInt(currentNumber) - 1)
        }
    }
    return(
        <div className="MuiNumberInput-Wrapper">
            <span className="InputNumberWrapper">
                <TextField
                    id="filled-number"
                    label=""
                    type="number"
                    value={currentNumber}
                    variant="outlined"
                    style={{display: 'flex', flexBasis: '100%'}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        endAdornment: (
                            <>
                                <AddCircle onClick={()=>handleCheckoutAddUpdate(max)} style={{color: 'green', cursor: 'pointer'}}/>
                                <RemoveCircle onClick={()=>handleCheckoutMinusUpdate(min)} style={{color: 'red', cursor: 'pointer'}}/>
                            </>
                        )}}
                    />
            </span>
            {price && `$${updatePrice}`}
        </div>
    );
};

export default MuiNumberInput;