import React, {ChangeEvent, useState} from "react";
import IP from './input.module.scss'
import {isMail} from "./validator";

interface Mail {
    mail: string,
    setMail: Function,
    setErr: Function
}

export const MailInput:React.FC<Mail>  = ({mail, setMail, setErr}: Mail) => {

    const [mailEr, setMailEr] = useState<boolean>(false)

    const checkMail = (e: ChangeEvent<HTMLInputElement>) => {
        setErr(isMail(e.target.value))
        setMailEr(isMail(e.target.value))
    }

    return (
        <div className={IP.input}>
            <input onChange={(e: ChangeEvent<HTMLInputElement>)=>{setMail(e.target.value)}}
                   value={mail}
                   placeholder={'mail'}
                   onBlur={checkMail}
                   type="email"
                   />
            {mailEr?<span>Incorrect mail</span>:<span>Enter your email</span>}
        </div>
    )
}