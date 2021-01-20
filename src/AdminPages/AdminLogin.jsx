import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { MuiInputField } from 'Components/MUI';
import { SubmitButton, CancelButton } from 'Components/MUI/MuiComponents/MuiBtn';
import { userIsLoggedIn, userLogin, userLogout } from 'States/userSlice';

import './styles.scss';

const AdminLogin = () => {
    const userSignIn = useSelector(userIsLoggedIn);
    const history = useHistory();
    const dispatch = useDispatch();
    const [authInput, setAuthInput] = useState({});
    const [inputErrorMessage, setInputErrorMessage] = useState('');

    useEffect(()=>{
        (userSignIn === true) && (history.push("/admin"));
    },[userSignIn]);
    const LoginSubmitKeyPress = (e) => {
        if(e.keyCode === 13 || e.charCode === 13 ||  e.key === 'Enter'){
            e.preventDefault();
            (authInput.userName && authInput.password) && dispatch(userLogin({...authInput, history}));
            (!authInput.userName || !authInput.password) 
                ? setInputErrorMessage('FILL IN MISSING INPUT FIELD') 
                : setInputErrorMessage('');
        }
    }
    const LoginSubmit = () => {
        (authInput.userName && authInput.password) && dispatch(userLogin({...authInput, history}));
        (!authInput.userName || !authInput.password) 
            ? setInputErrorMessage('FILL IN MISSING INPUT FIELD') 
            : setInputErrorMessage('');
    };

    // store all input changes
    const formInputChange = (e) => {
        const inputValue = (
            ((e.target.name === 'number') && parseInt(e.target.value)) || 
            ((e.target.name === 'userName') && e.target.value.toLowerCase()) ||
            e.target.value
        );

        setAuthInput({ 
            ...authInput, 
            [e.target.name] : inputValue
        })
    };

    const inputSettings = [
        {
            type: "text",
            name: "userName", 
            label: "E-Mail",
            required: true
        },{
            type: "password",
            name: "password", 
            label: "password",
            required: true
        }
    ];
    
    return(
        <div className="outter-block-log">
            <div className="inner-block-log">
                {inputErrorMessage && <div>{inputErrorMessage}</div>}
                <h2>ADMIN LOGIN PAGE</h2>
                <div className="form-container">
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
                    <CancelButton
                        label="LOGOUT"
                        onClick={ ()=> dispatch(userLogout({history})) } />
                </div>
                {/* <span>Dont have a account? <Link to="/signup"> click here</Link></span> */}
            </div>
        </div>
    )
}

export default AdminLogin;
