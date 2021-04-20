import React from 'react'
import ArtList from './Art/ArtList'
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";




const Explore = () => {

    const isSignedIn = useSelector((state) => state.auth.isSignedIn);


    return (
        <>
            {isSignedIn ? 
            <ArtList />
            :
            <Redirect to="/account/login" />
        }
        </>
    )

}

export default Explore