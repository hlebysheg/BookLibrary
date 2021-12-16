import React, {useState} from "react";
import {PasswordInput} from "../../../common/inputs/passwordInput";
import {MailInput} from "../../../common/inputs/mailInput";
import AT from '../auth.module.scss'
import {isMail, isPassword} from "../../../common/inputs/validator";
import {useHttp} from "../../../Hooks/httpHooks";
//http://localhost:5000/api/auth/register
export const Register: React.FC = () =>{

    const [password, setPassword] = useState<string>('')
    const [mail, setMail] = useState<string>('')
    const [err, setErr] = useState<boolean>(false)
    const [servMessage, setServMessage] = useState<string>('')

    //HTTP
    const {loading, request, error, clearError} = useHttp()

    const registerHandler = async () => {
        try {
            const data = await  request('http://localhost:5000/api/auth/register', 'POST', {password, email: mail})
            setServMessage(data.message)


        }catch (e:any) {
            setServMessage(e.message)
        }
    }
    //
    const setError = (value: boolean) => {
        setErr(value)
    }

    const submitFn = () => {
        if(isPassword(password)){
            setErr(true)
            return
        }

        if(isMail(mail)){
            setErr(true)
            return
        }
        registerHandler()

    }

    return (
        <div className={AT.auth}>
            <MailInput mail={mail} setMail={setMail} setErr={setError}/>
            <PasswordInput password={password} setPassword={setPassword} setErr={setError}/>
            <br/>
            <button className="btn waves-effect waves-light black"
                    type="submit"
                    name="action"
                    onClick={submitFn}
                    disabled={err || loading}
            >
                Register
            </button>
            {servMessage?<div>{servMessage}</div>: err ? <div>Данные неккоректны</div> : <div>Регистрация</div>}
        </div>
    )
}