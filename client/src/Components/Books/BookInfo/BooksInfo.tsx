import React from "react";
import BK from './Books.module.scss';
import {IbookInfo} from "../../../interface/componentInterface";
import {Link} from "react-router-dom";




export const BooksInfo: React.FC<IbookInfo> = ({bookInfo}: IbookInfo) => {

    const genre = bookInfo.genre.map((el, i) => {

        if(i === bookInfo.genre.length - 1)  {
            return <Link to={`/books/genre/${el}/1`} className={''}>{el} </Link>
        }
        else {
            return <Link to={`/books/genre/${el}/1`} className={''}>{el+', '}</Link>
        }

    })




    return (
        <div className={BK.container}>
            <div className={BK.imgBar}>
                <img src={bookInfo.photo}/>
                <div className={BK.infoText}>
                    <span><b>{bookInfo.name}</b></span>
                    <span>Author: {bookInfo.author}</span>
                    <span>{genre}</span>
                    <span className={BK.option}>
                        <i className={"material-icons Tiny blue-text text-darken-2 "+BK.icon}>remove_red_eye<span className={BK.toolbar}>Просмотры</span></i>
                        {bookInfo.clicks}
                    </span>
                </div>
            </div>
            <br/>
            <span><b>Description:</b></span>
            <div className={BK.description}>{bookInfo.description}</div>
        </div>

    )
}
