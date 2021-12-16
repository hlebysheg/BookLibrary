import LA from './LinkArea.module.scss'
import React from "react";
import {ILinkArea} from "../../../interface/componentInterface";
import {Link, NavLink} from "react-router-dom";
import { useLocation  } from 'react-router-dom'
import {useBasePath} from "../../../Hooks/BasePath";

export const LinkArea:React.FC<ILinkArea> = ({bookNumber, pageSize}:ILinkArea) => {

    const location = useLocation();

    const getCurrentPathWithoutLastPart = () => {
        //check last part is numeric
        let lastPart =location.pathname.slice(location.pathname.lastIndexOf('/')+1, location.pathname.length)

        if(isNaN(+lastPart)){
            return location.pathname
        }

        return location.pathname.slice(0, location.pathname.lastIndexOf('/'))
    }

    const strPath = getCurrentPathWithoutLastPart()

    const pageTotal = Math.ceil(bookNumber / pageSize)
    const arrPage = []
    for(let i = 1; i <= pageTotal; i++){
        arrPage.push(i)
    }

    const links = arrPage.map(el => <NavLink end to={`${strPath}/${el}`} key={el}>{el} </NavLink>)

    return (
        <div className={LA.container}>
                {links}
        </div>
    )
}