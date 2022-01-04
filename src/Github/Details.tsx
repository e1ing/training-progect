import React, {FC, useEffect, useState} from "react";
import axios from "axios";
import {UserType} from "./Header";
import {SearchUserType} from "./Github";

type DetailsPropsType = {
    selectedUser: SearchUserType|null
}

export const Details: FC<DetailsPropsType> = ({selectedUser}) => {

    const [userDetails, setUserDetails] = useState<UserType|null >(null)
    useEffect(() => {
        console.log("SYNC USER DETAILS")
        if (!!selectedUser) {
            axios.get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
                .then(res => {
                    setUserDetails(res.data)
                })
        }
    }, [selectedUser])

    return (
        <div>
            <h2>Username</h2>
            {userDetails && <div>
                <img src={userDetails.avatar_url}/>
                <br/>
                {userDetails.login}, followers: {userDetails.followers}
            </div>}
        </div>
    )
}