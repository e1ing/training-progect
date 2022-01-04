import React, {FC, useEffect, useState} from "react";
import axios from "axios";
import {SearchResult} from "./List";
import {SearchUserType} from "./Github";

export type UserType = {
    login: string
    id: number
    avatar_url: string
    followers: number
}

type HeaderPropsType = {
    setUsers: (users: SearchUserType[]) => void
}

export const Header: FC<HeaderPropsType> = ({setUsers}) => {
    const [tempSearch, setTempSearch] = useState('it-kamasutra')
    const [searchTerm, setSearchTerm] = useState('it-kamasutra')

    useEffect(() => {
        console.log("SYNC USERS")
        axios.get<SearchResult>(`https://api.github.com/search/users?q=${searchTerm}`)
            .then(res => {
                setUsers(res.data.items)
            })
    }, [searchTerm])

    return (
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
    )
}