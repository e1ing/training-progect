import {SearchUserType} from "./Github";
import {useEffect, useState} from "react";

type TimerPropsType = {
    user: SearchUserType
}

export const Timer = () => {
    const [seconds, setSeconds] = useState(60)

    useEffect(() => {
        setTimeout(()=>{setSeconds(seconds-1)}, 1000)
    }, [seconds])

    return <div>
        {seconds}
    </div>
}