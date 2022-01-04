import axios from "axios";
import React, {useEffect, useState} from "react";
import s from './Github.module.css';

type SearchUserType = {
    login: string
    id: number
}
type SearchResult = {
    items: SearchUserType[]
}
type UserType = {
    login: string
    id: number
    avatar_url: string
    followers: number
}

export const Github = () => {

    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);
    const [userDetails, setUserDetails] = useState<UserType|null >(null)
    const [users, setUsers] = useState<SearchUserType[]>([]);
    const [tempSearch, setTempSearch] = useState('it-kamasutra')
    const [searchTerm, setSearchTerm] = useState('it-kamasutra')

    useEffect(() => {
        console.log("SYNC TAB TITLE")
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser])
    useEffect(() => {
        console.log("SYNC USERS")
        axios.get<SearchResult>(`https://api.github.com/search/users?q=${searchTerm}`)
            .then(res => {
                setUsers(res.data.items)
            })
    }, [searchTerm])
    useEffect(() => {
        console.log("SYNC USER DETAILS")
        if (!!selectedUser) {
            axios.get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
                .then(res => {
                    setUserDetails(res.data)
                })
        }
    }, [selectedUser])

    return <div className={s.container}>
        <div>
            <div>
                <input placeholder="search"
                       value={tempSearch}
                       onChange={(e) => {
                           setTempSearch(e.currentTarget.value)
                       }}
                />
                <button onClick={() => {
                    setSearchTerm(tempSearch)
                }}>find
                </button>
            </div>
            <ul>
                {users.map(u => <li key={u.id} className={selectedUser === u ? s.selected : ''}
                                    onClick={() => {
                                        setSelectedUser(u)
                                    }}>
                    {u.login}
                </li>)}
            </ul>
        </div>
        <div>
            <h2>Username</h2>
            {userDetails && <div>
                    <img src={userDetails.avatar_url}/>
                    <br/>
                    {userDetails.login}, followers: {userDetails.followers}
                </div>}
        </div>
    </div>
}