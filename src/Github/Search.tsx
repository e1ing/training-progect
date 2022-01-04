import React, {FC, useEffect, useState} from "react";
import axios from "axios";
import {SearchResult} from "./UsersList";
import {SearchUserType} from "./Github";

export type UserType = {
    login: string
    id: number
    avatar_url: string
    followers: number
}

type SearchPropsType = {
    value: string
    onSubmit: (fixedValue: string) => void
}

export const Search: FC<SearchPropsType> = ({value,onSubmit}) => {
    const [tempSearch, setTempSearch] = useState("")


    useEffect(()=> {
        setTempSearch(value)
    }, [value])



    return (
        <div>
            <input placeholder="search"
                   value={tempSearch}
                   onChange={(e) => {
                       setTempSearch(e.currentTarget.value)
                   }}
            />
            <button onClick={() => {
                onSubmit(tempSearch)
            }}>find
            </button>
        </div>
    )
}