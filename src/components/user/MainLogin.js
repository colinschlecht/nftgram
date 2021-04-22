import React from 'react'
import UserLogin from "./user/UserLogin";
import UserCreate from "./user/UserCreate";



const MainLogin = () => {
    return (
        <div className="ui middle aligned center aligned grid">
            <div className="column">
                <UserLogin />
                <UserCreate />
            </div>
           
        </div>
    )
}

export default MainLogin
