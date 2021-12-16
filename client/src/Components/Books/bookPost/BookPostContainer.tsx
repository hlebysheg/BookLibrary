import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import {IboocContainerPage} from "../../../interface/componentInterface";
import {BookPost} from "./bookPost";
import {setFavBooks} from "../../../store/auth-reducer";
import {store} from "../../../store/interface";
import {useHttp} from "../../../Hooks/httpHooks";

enum PageState {
    unAuthorize,
    favourite,
    common
}

//container component to set favourite books
const BookPostContainer: React.FC<IboocContainerPage> = ({book, userId, favoriteBooks, setFavBooks, id, isAuth}: IboocContainerPage) => {

    const {loading, request, error, clearError} = useHttp()
    const [statePost, setStatePost] = useState<PageState>(PageState.unAuthorize)

    const FavBooksHandler = async () => {

        let url: string = '';

        switch (statePost) {
            case PageState.unAuthorize:
                return
            case PageState.favourite:
                url = 'http://localhost:5000/api/books/my-books-del'
                break
            case PageState.common:
                url = 'http://localhost:5000/api/books/my-books-add'
                break
        }

        try {
            const myBooks = await request(url, 'POST', {userId, bookId: id})
            await setFavBooks(myBooks.myBooks)
        } catch (e){

        }
    }

    useEffect(() => {
        if (isAuth === true && favoriteBooks !== undefined){
            if (favoriteBooks.includes(id)) {
                setStatePost(PageState.favourite)
            }
            else {
                setStatePost(PageState.common)
            }
        }
        else {
            setStatePost(PageState.unAuthorize)
        }
    },[favoriteBooks])


    return (
        <>
            <BookPost book={book} handleClick = {FavBooksHandler} statePost = {statePost}/>
        </>
    )
}


const mapStateToProps = (state: store) => ({
    userId: state.auth.userId,
    favoriteBooks: state.auth.favoriteBooks,
    isAuth: state.auth.isAuth
});

const mapDispatchToProps = (dispatch: Function) => ({
    setFavBooks: (books: Array<string>) => {dispatch(setFavBooks(books))}
});

export default connect(mapStateToProps, mapDispatchToProps)(BookPostContainer);