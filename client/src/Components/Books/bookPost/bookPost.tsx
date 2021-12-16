import React from "react";
import BP from './bookPage.module.scss'
import {IbookPage} from "../../../interface/componentInterface";
import {Link} from "react-router-dom";

enum PageState {
    unAuthorize,
    favourite,
    common
}



export const BookPost: React.FC<IbookPage> = ({book, handleClick, statePost}: IbookPage) => {

    const genre = book.genre.map((el, i) => {

        if(i === book.genre.length - 1)  {
            return <Link to={`/books/genre/${el}/1`} className={''} key={i}>{el} </Link>
        }
        else {
            return <Link to={`/books/genre/${el}/1`} className={''} key={i}>{el+', '}</Link>
        }

    })

    const onFavClick = () => {
        handleClick()
    }

    const favLike = () => {

    }

    return (

        <div className={BP.container}>
            <Link to={`/book-info/${book._id}`}>
                <img src={book.photo}/>
            </Link>
            <div>
                <Link to={`/book-info/${book._id}`}>
                    <div><label className={BP.bookName}>{book.name}</label></div>
                </Link>
                <div><label>{book.author}</label></div>
                {/*<div>{book.description}</div>*/}
                <div><label>{genre}</label></div>
                <div className={BP.option}>
                    <i className={"material-icons Tiny "+BP.icon}>remove_red_eye<div className={BP.toolbar}>Просмотры</div></i>{book.clicks}
                    <FavPost statePost={statePost} onFavClick={onFavClick}/>
                </div>

            </div>
        </div>

    )
}

interface FavPost {
    statePost: PageState
    onFavClick: Function
}
//to Favourite post books
const FavPost: React.FC<FavPost> = ({statePost, onFavClick}: FavPost) => {
    if(statePost === PageState.unAuthorize) {
        return <></>
    }

    if(statePost === PageState.favourite) {
        return <span onClick={()=> {
            onFavClick()
        }}><i className={"material-icons Tiny red-text text-darken-1 "+BP.icon}>star_border</i></span>
    }

    if(statePost === PageState.common) {
        return <span onClick={()=> {
            onFavClick()
        }}><i className={"material-icons Tiny "+BP.icon}>star_border</i></span>
    }

    return <></>
}