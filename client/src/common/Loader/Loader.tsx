import React from 'react'
import LD from './Loader.module.scss'
import Spiner from './Spinner-1.4s-200px.svg'

export const Loader: React.FC = () => {
    return (
        <div className={LD.loader}>
            <img src={Spiner}/>
        </div>
    )
}