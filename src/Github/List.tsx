import s from "./Github.module.css";
import React, {FC, useEffect} from "react";
import {SearchUserType} from "./Github";

type ListPropsType = {
    users: SearchUserType[]
    selectedUser: SearchUserType|null
    setSelectedUser: (user: SearchUserType) => void
}

export type SearchResult = {
    items: SearchUserType[]
}

export const List: FC<ListPropsType> = ({users, selectedUser, setSelectedUser}) => {



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
                                        setSelectedUser(u)
                                    }}>
                    {u.login}
                </li>)}
            </ul>
        </div>
    )
}