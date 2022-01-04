import React, {useState} from "react";
import s from './Github.module.css';
import {Header} from "./Header";
import {Details} from "./Details";
import {List} from "./List";

export type SearchUserType = {
    login: string
    id: number
}

export const Github = () => {

    const [users, setUsers] = useState<SearchUserType[]>([]);
    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);

    return <div className={s.container}>
       <Header setUsers={setUsers}/>
       <List users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
       <Details selectedUser={selectedUser}/>
    </div>
}