import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    AuthenticationDetails
} from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: process.env.REACT_APP_USER_POOL,
    ClientId: process.env.REACT_APP_CLIENT_ID
};
// const postURL = process.env.REACT_APP_API_GATEWAY_URL;
const userPool = new CognitoUserPool(poolData);
const ApiGateWayUserURL = process.env.REACT_APP_API_GATEWAY_URL;
const initState = {
    isLoggedIn: false,
}
export const userSlice = createSlice({
    name: 'userState',
    initialState: initState,
    reducers: {
        setUserState: (state, action) => {
            return {...state, ...action.payload};
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
    },
});

export const {
    setUserState,
    setIsLoggedIn,
} = userSlice.actions;

// AWS User Login
export const userLogin = ({userName, password, history}) => dispatch => {
    const authenticationData = {
        Username: userName,
        Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(
        authenticationData
    );

    const userData = {
        Username: userName,
        Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
            dispatch(setIsLoggedIn(true));
            history.push('/admin');
         },
        onFailure: (err) => {
            alert(err.message || JSON.stringify(err));
        },
    });
};

// AWS cognito Logout
export const userLogout = ({history}) => dispatch => {
    if(userPool.getCurrentUser()){
        // To Do: clear init data
        userPool.getCurrentUser().signOut();
        dispatch(setUserState(initState))
        history.push('/');
    };
};

// AWS Cognito Get User Data
export const userLoginCheck = () => dispatch => {
    if (userPool.getCurrentUser() != null) {
        userPool.getCurrentUser().getSession((err, session) => {
            if(err){console.log('userPool.getCurrentUser() err---->', err)};
                dispatch(setIsLoggedIn(true));
            // axios.get(`${ApiGateWayUserURL}?subId=${session?.idToken?.payload?.sub}`, {
            //     headers: { 'Authorization' : session?.getIdToken()?.getJwtToken() }
            // })
            //     .then(res => {
            //         console.log('userLoginCheck-trigger--->: ', res.data)
            //         dispatch(setUserState(res.data));
            //         dispatch(setIsLoggedIn(true));
            //     })
            //     .catch(error => console.log('get user error: ', error))
          });
    } 
};

export const userCognitoState = state => state.userState;
export const userIsLoggedIn = state => state.userState.isLoggedIn;
export default userSlice.reducer;
