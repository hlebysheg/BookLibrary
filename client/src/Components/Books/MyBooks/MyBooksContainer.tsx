import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import { useParams} from 'react-router-dom';
import {book, store} from "../../../store/interface";
import {setBookAC, setPage} from "../../../store/book-reducer";
import {useHttp} from "../../../Hooks/httpHooks";
import {MyBookContainer} from "../../../interface/componentInterface";
import {MyBooks} from "./MyBooks";
import {setFavBooks} from "../../../store/auth-reducer";
import {Loader} from "../../../common/Loader/Loader";

const MyBooksContainer: React.FC<MyBookContainer> = ({
                                                         page,
                                                         pageSize,
                                                         booksCollection,
                                                         bookNumber,
                                                         setBook,
                                                         userId,
                                                         favoriteBooks,
                                                         setFavBooks
                                              }: MyBookContainer) => {

    const {loading, request, error, clearError} = useHttp()
    const [loadingBook, setLoading] = useState(true)
    const {genre} = useParams()
    const {pageNum} = useParams()
    //just now i use pageNum instead of page because its more faster then record into redux
    //Для
    const [err, setErr] =  useState('')
    let pageNumberFix = pageNum? pageNum: 1

    //проверка книг
    let checkBook = (length: number) => {
        if (length === 0){
            setErr('No books on this page(')
        } else {
            setErr('')
        }
    }

    const myBooksHandler = async () => {

        try {
            const {myBooks} = await  request(`http://localhost:5000/api/books/my-books-get-all`, 'POST', {myBooks: favoriteBooks})
            checkBook(myBooks.length)
            await setBook(myBooks, myBooks.length)
            await setLoading(false)
        }catch (e:any) {

        }
    }

    const FavBooksHandler = async () => {

        if (userId !== null) {
            try {
                const myBooks = await request('http://localhost:5000/api/books/my-books-get', 'POST', {userId: userId.toString()})
                await setFavBooks(myBooks.myBooks)

            } catch (e) {

            }
        }
    }


    useEffect(() => {

        if(userId !== null) {
            myBooksHandler()
        }//
    },[favoriteBooks])

    useEffect(() => {

        if(userId !== null) {
            FavBooksHandler()
            //myBooksHandler()
        }//
    },[])

    if(loadingBook) {
        return <Loader/>
    }

    return (
        <div>
            {/*<Loader/>*/}
            {/*{loadingBook?<Loader/>:''}*/}
            <MyBooks booksCollection={booksCollection}/>
            <h1>{err}</h1>
        </div>
    )
}


const mapStateToProps = (state: store) => ({
    page: state.books.page,
    pageSize: state.books.pageSize,
    booksCollection: state.books.books,
    bookNumber: state.books.bookNum,
    favoriteBooks: state.auth.favoriteBooks,
    userId: state.auth.userId,

});

const mapDispatchToProps = (dispatch: Function) => ({
    setBook: (books: Array<book>, bookNum: number) => {dispatch(setBookAC(books, bookNum))},
    setPage: (page: number) => {dispatch(setPage(page))},
    setFavBooks: (books: Array<string>) => {dispatch(setFavBooks(books))}
});

export default connect(mapStateToProps, mapDispatchToProps)(MyBooksContainer);
