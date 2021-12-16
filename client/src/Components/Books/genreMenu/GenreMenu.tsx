import React from "react";
import GM from './genre.module.scss';
import {Link} from "react-router-dom";
import {IGenreMenu} from "../../../interface/componentInterface";

export const GenreMenu: React.FC<IGenreMenu> = ({menuActive}:IGenreMenu) => {

    let style = ''

    if(menuActive) {
        style = GM.display
    } else {
    }
    // fantasy
    // novel
    // heroic fantasy
    // romance contemporary
    // romance historical
    // crime
    // thriller
    // sci-fi
    // comedy
    // education
    //adventure
    return (
        <div className = {GM.wrapper}>
        <div className={GM.container + ' ' + style} >
            <Link to={`/books/genre/novel/1`}>novel </Link>
            <Link to={`/books/genre/fantasy/1`}>fantasy </Link>
            <Link to={`/books/genre/heroic fantasy/1`}>heroic fantasy </Link>
            <Link to={`/books/genre/romance contemporary/1`}>romance contemporary</Link>
            <Link to={`/books/genre/romance historical/1`}>romance historical</Link>
            <Link to={`/books/genre/crime/1`}>crime</Link>
            <Link to={`/books/genre/thriller/1`}>thriller</Link>
            <Link to={`/books/genre/sci-fi/1`}>sci-fi</Link>
            <Link to={`/books/genre/comedy/1`}>comedy</Link>
            <Link to={`/books/genre/education/1`}>education</Link>
            <Link to={`/books/genre/adventure/1`}>adventure</Link>
        </div>
        </div>
    )
}