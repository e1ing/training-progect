import {SearchUserType} from "./Github";
import {FC, useEffect, useState} from "react";
import {cleanup} from "@testing-library/react";
import {initialTimerSeconds} from "./UserDetails";

type TimerPropsType = {
    seconds: number
    onChange: (actualSeconds: number) => void
    timerKey: string
}

export const Timer: FC<TimerPropsType> = ({timerKey, seconds, onChange}) => {
    const [sec, setSec] = useState(initialTimerSeconds)

    useEffect(()=> {
        setSec(seconds)
    }, [seconds])

    useEffect(()=>{
        onChange(sec)
    }, [sec])

    useEffect(() => {
       const intervalId =  setInterval(() => {
           console.log("TICK")
            setSec(prev => prev - 1)
        }, 1000)

        return ()=>{clearInterval(intervalId)}
    }, [timerKey])

    return <div>
        {seconds}
    </div>
}