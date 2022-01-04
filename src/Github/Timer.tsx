import {SearchUserType} from "./Github";
import {FC, useEffect, useState} from "react";
import {cleanup} from "@testing-library/react";
import {initialTimerSeconds} from "./UserDetails";

type TimerPropsType = {
    seconds: number
    onChange: (actualSeconds: number) => void
}

export const Timer: FC<TimerPropsType> = ({seconds, onChange}) => {
    const [sec, setSec] = useState(initialTimerSeconds)

    useEffect(()=> {
        setSec(seconds)
    }, [seconds])

    useEffect(()=>{
        onChange(sec)
    }, [sec])

    useEffect(() => {
        setInterval(() => {
            setSec(prev => prev - 1)
        }, 1000)
    }, [])

    return <div>
        {seconds}
    </div>
}