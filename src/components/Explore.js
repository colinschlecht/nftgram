import React from 'react'
import ArtList from './Art/ArtList'
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";




const Explore = () => {

    const isSignedIn = useSelector((state) => state.auth.isSignedIn);


    return (
        <div>
            {isSignedIn ? 
            <ArtList />
            :
            <Redirect to="/account/login" />
        }
        </div>
    )

}

export default Explore