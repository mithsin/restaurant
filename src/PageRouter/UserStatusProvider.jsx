import React, { createContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  userIsLoggedIn,
  userLoginCheck
} from 'States/userSlice';

const UserStatusCheck = createContext({});

const UserStatusProvider = ({ children }) => {
  const dispatch = useDispatch();
  const userIsSignIn = useSelector(userIsLoggedIn)

  // check user status and make up date if necessary.
  useEffect(()=>{
    !userIsSignIn && dispatch(userLoginCheck());
  },[userIsSignIn])
  
    return (
        <UserStatusCheck.Provider value={userIsSignIn}>
            {children}
        </UserStatusCheck.Provider>
    );
};

export default UserStatusProvider;