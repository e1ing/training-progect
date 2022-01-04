import React, {useState} from "react";
import s from './Github.module.css';
import {Search} from "./Search";
import {UserDetails} from "./UserDetails";
import {UsersList} from "./UsersList";

export type SearchUserType = {
    login: string
    id: number
}

export const Github = () => {

    let initialSearchState = 'it-kamasutra'

    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);
    const [searchTerm, setSearchTerm] = useState('it-kamasutra')

    return <div className={s.container}>
       <Search value={searchTerm} onSubmit={(value:string) => {setSearchTerm(value)}}/>
        <button onClick={()=> setSearchTerm(initialSearchState)}>reset</button>
       <UsersList term={searchTerm} selectedUser={selectedUser} onUserSelect={setSelectedUser}/>
       <UserDetails user={selectedUser}/>
    </div>
}