import React, {ChangeEvent, useState} from "react";
import IP from './input.module.scss'
import {isPassword} from "./validator";

interface Password {
    password: string,
    setPassword: Function,
    setErr: Function
}


export const PasswordInput:React.FC<Password>  = ({password, setPassword, setErr}: Password) => {

    const [passEr, setPassEr] = useState<boolean>(false)

    const checkPassword = (e: ChangeEvent<HTMLInputElement>) => {
        //e.target.value
        setErr(isPassword(e.target.value))
        setPassEr(isPassword(e.target.value))
    }

    return (
        <div className={IP.input}>
            <input onChange={(e: ChangeEvent<HTMLInputElement>)=>{setPassword(e.target.value)}}
                   value={password} type={'password'}
                   onBlur={checkPassword}
                   placeholder={'password'}
                  />
            {passEr?<span>password must be 6 to 20 characters </span>:<span>Enter password</span>}
        </div>
    )
}