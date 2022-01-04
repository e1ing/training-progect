import s from "./Github.module.css";
import React, {FC, useEffect, useState} from "react";
import {SearchUserType} from "./Github";
import axios from "axios";

type UsersListPropsType = {
    term: string
    selectedUser: SearchUserType | null
    onUserSelect: (user: SearchUserType) => void
}

export type SearchResult = {
    items: SearchUserType[]
}

export const UsersList: FC<UsersListPropsType> = ({term, selectedUser, onUserSelect}) => {
    const [users, setUsers] = useState<SearchUserType[]>([]);

    useEffect(() => {
        console.log("SYNC USERS")
        axios.get<SearchResult>(`https://api.github.com/search/users?q=${term}`)
            .then(res => {
                setUsers(res.data.items)
            })
    }, [term])

    useEffect(() => {
        console.log("SYNC TAB TITLE")
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser])


    return (
        <div>
            <ul>
                {users.map(u => <li key={u.id} className={selectedUser === u ? s.selected : ''}
                                    onClick={() => {
                                        onUserSelect(u)
                                    }}>
                    {u.login}
                </li>)}
            </ul>
        </div>
    )
}