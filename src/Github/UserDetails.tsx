import React, {FC, useEffect, useState} from "react";
import axios from "axios";
import {UserType} from "./Search";
import {SearchUserType} from "./Github";
import {Timer} from "./Timer";

type UserDetailsPropsType = {
    user: SearchUserType | null
}

export const initialTimerSeconds = 10

export const UserDetails: FC<UserDetailsPropsType> = ({user}) => {

    const [userDetails, setUserDetails] = useState<UserType | null>(null)
    const [seconds, setSeconds] = useState(initialTimerSeconds)

    useEffect(() => {
        console.log("SYNC USER DETAILS")
        if (!!user) {
            axios.get<UserType>(`https://api.github.com/users/${user.login}`)
                .then(res => {
                    setUserDetails(res.data)
                    setSeconds(initialTimerSeconds)
                })
        }
    }, [user])
    useEffect(() => {
        if (seconds < 1) {
            setUserDetails(null)
        }
    }, [seconds])

    return (
        <div>
            <Timer seconds={seconds} onChange={setSeconds}/>
            <h2>Username</h2>
            {userDetails && <div>
                <img src={userDetails.avatar_url}/>
                <br/>
                {userDetails.login}, followers: {userDetails.followers}
            </div>}
        </div>
    )
}