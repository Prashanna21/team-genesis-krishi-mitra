import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { setLoginStatus } from '../app/infoSlice';

function Navbar() {
    const dispatch = useDispatch();
    
    dispatch(setLoginStatus(true));

    const loginStatus = useSelector(state => state.isUserLoggedIn);
    console.log(loginStatus);


  return (
    <div>Navbar</div>
  )
}

export default Navbar