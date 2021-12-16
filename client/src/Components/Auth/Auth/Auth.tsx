import React, {useState} from "react";
import {PasswordInput} from "../../../common/inputs/passwordInput";
import {MailInput} from "../../../common/inputs/mailInput";
import AT from '../auth.module.scss'
import {isMail, isPassword} from "../../../common/inputs/validator";
import {useHttp} from "../../../Hooks/httpHooks";
import {auth} from "../../../interface/componentInterface";
import {useNavigate} from "react-router-dom";


export const Auth: React.FC<auth> = ({isAuth, login}: auth) =>{

    const storageName: string = 'userData'
    const [password, setPassword] = useState<string>('')
    const [mail, setMail] = useState<string>('')
    const [err, setErr] = useState<boolean>(false)
    const [servMessage, setServMessage] = useState<string>('')
    let navigate = useNavigate();

    //http
    const {loading, request, error, clearError} = useHttp()

    const loginHandler = async () => {
        try {
            const data = await  request('http://localhost:5000/api/auth/login', 'POST', {password, email: mail})

            setServMessage(data.message)
            login(data.token, data.userId)

            localStorage.setItem(storageName, JSON.stringify({
                userId: data.userId,
                token: data.token,
            }))

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
        loginHandler()

    }

    if(isAuth){
        navigate(`/books/1`);
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
                    disabled={err||loading}
            >
                Login
            </button>
            {servMessage?<div>{servMessage}</div>: err ? <div>Данные неккоректны</div> : <div>Вход</div>}
        </div>
    )
}
