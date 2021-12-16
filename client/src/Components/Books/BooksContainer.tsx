import {book, store} from "../../store/interface";
import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import {useHttp} from "../../Hooks/httpHooks";
import {Ibooks} from "../../interface/componentInterface";
import {setBookAC, setPage} from "../../store/book-reducer";
import { useParams} from 'react-router-dom';
import BooksContainerFav from "./BooksContainerFav";
import {Loader} from "../../common/Loader/Loader";

const BooksContainer: React.FC<Ibooks> = ({
                                              page,
                                              pageSize,
                                              booksCollection,
                                              bookNumber,
                                              setBook,
                                              setPage,
                                              }: Ibooks) => {

    const {loading, request, error, clearError} = useHttp()
    const {genre} = useParams()
    const {pageNum} = useParams()
    const [loadingBook, setLoading] = useState(true)
    //just now i use pageNum instead of page because its more faster then record into redux
    const [err, setErr] =  useState('')

    let pageNumberFix = pageNum? pageNum: 1

    let checkBook = (length: number) => {
        if (length === 0){
            setErr('No books on this page(')
        } else {
            setErr('')
        }
    }

    const BookHandler = async (URL: string) => {
        try {
            const {books, bookNum} = await  request(URL, 'GET')
            checkBook(books.length)
            await setBook(books, bookNum)
            await setLoading(false)
        }catch (e:any) {

        }
    }

    const findHandler = (name: string) => {
        let url = `http://localhost:5000/api/books/find-book?pageNum=${pageNumberFix}&booksNum=${pageSize}&name=${name}`
        BookHandler(url)
    }

    useEffect(() => {

        if(genre){
            let url: string = `http://localhost:5000/api/books/get-book-by-genre?pageNum=${pageNumberFix}&booksNum=${pageSize}&genre=${genre}`
            BookHandler(url)
        } else {
            let url: string = `http://localhost:5000/api/books/get-book?pageNum=${pageNumberFix}&booksNum=${pageSize}`
            BookHandler(url)
        }
    },[genre, pageNum])


    if(loadingBook){
        return <Loader/>
    }

    return (
        <>
            <BooksContainerFav booksCollection = {booksCollection}
                               findHandler={findHandler}
                               bookNumber={bookNumber}
                               pageSize={pageSize}
                   />
            <h1>{err}</h1>
        </>
    )
}

const mapStateToProps = (state: store) => ({
    page: state.books.page,
    pageSize: state.books.pageSize,
    booksCollection: state.books.books,
    bookNumber: state.books.bookNum,
});

const mapDispatchToProps = (dispatch: Function) => ({
    setBook: (books: Array<book>, bookNum: number) => {dispatch(setBookAC(books, bookNum))},
    setPage: (page: number) => {dispatch(setPage(page))},
});

export default connect(mapStateToProps, mapDispatchToProps)(BooksContainer);
