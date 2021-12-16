import React from "react";
import {Link} from "react-router-dom";
import HD from './Header.module.scss'
import {header} from "../../interface/componentInterface";

export const Header: React.FC<header> = ({isAuth, logout}: header) => {

    const storageName: string = 'userData'
    const onBtnClick = () => {
        logout()
        localStorage.removeItem(storageName)
    }

    return (
        <header className={HD.header}>
            <div>
                <Link className={HD.link} to={'/books/1 '}>Books</Link>
                {isAuth ? <Link className={HD.link} to={'/my-books '}>My Books</Link>: ''}
            </div>

            {isAuth ? <span className={HD.link} onCopy={()=>false}  onClick={onBtnClick}>Logout</span>
                :(<div>
                    <Link className={HD.link} to={'/register '}>Register </Link>
                    <Link className={HD.link} to={'/auth '}>Auth </Link>
                </div>)}
        </header>
    )
}