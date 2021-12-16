import React, {ChangeEvent, useState} from "react";
import BK from './Books.module.scss';
import {IbookComponent} from "../../interface/componentInterface";
import {GenreMenu} from "./genreMenu/GenreMenu";
import {Link, useParams} from "react-router-dom";
import {LinkArea} from "./LinkArea/LinkArea";
import BookPostContainer from "./bookPost/BookPostContainer";

export const Books: React.FC<IbookComponent> = ({booksCollection,
                                                    findHandler,
                                                    bookNumber,
                                                    pageSize,
                                                    favoriteBooks,
                                                    userId}: IbookComponent) => {


    const bookArea = booksCollection.map((el, id) => {
        return <BookPostContainer book={el} key={el._id + ' '+ id} id = {el._id}/>

    })
    const [menuActive, setMenuActive] = useState<boolean>(true)
    const [value, setValue] = useState<string>('')

    const MenuHandler = () => {
        setMenuActive(!menuActive)
    }

    const onFindCLick = () => {
        findHandler(value)
    }


    return (
        <div>
            <div className={BK.tagBox}>
                {/*genre menu*/}
                <button className="btn waves-effect waves-light  purple darken-4" type="submit" name="action" onClick = {MenuHandler}>genre
                    <i className="material-icons right">{menuActive?"arrow_downward":"arrow_upward"}</i>
                </button>
                <GenreMenu menuActive = {menuActive}/>
                {/*search*/}
                <input value={value} onChange={(e: ChangeEvent<HTMLInputElement>)=> {setValue(e.target.value)}} className={BK.input}/>
                <button className="btn waves-effect waves-light blue darken-3" type="submit" name="action" onClick = {onFindCLick}>Search
                    <i className="material-icons right">search</i>
                </button>
            </div>
            {/*clear*/}
            <div className={BK.filter}>
                <Link to={'/books'}>
                <button className="btn waves-effect waves-light red darken-1" type="submit" name="action">Clear Filter
                    <i className="material-icons right">clear</i>
                </button></Link>
            </div>
            {/*{books}*/}
            <div className={BK.container}>
                {bookArea}
            </div>
            {/*links*/}
            <LinkArea bookNumber={bookNumber} pageSize={pageSize}/>
        </div>

    )
}
