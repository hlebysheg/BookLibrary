import {store} from "../../store/interface";
import {connect} from "react-redux";
import React, {useEffect} from "react";
import {Books} from "./Books";
import {useHttp} from "../../Hooks/httpHooks";
import {IBooksContainerFav} from "../../interface/componentInterface";
import {setFavBooks} from "../../store/auth-reducer";


//container component to set favourite books
const BooksContainerFav: React.FC<IBooksContainerFav> = ({booksCollection,
                                                             findHandler,
                                                             bookNumber,
                                                             pageSize,
                                                             userId,
                                                             favoriteBooks,
                                                             setFavBooks}: IBooksContainerFav) => {

    const {loading, request, error, clearError} = useHttp()

    //try to new container component
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

        FavBooksHandler()//

    },[])

    return (
        <>
            <Books booksCollection = {booksCollection}
                   findHandler={findHandler}
                   bookNumber={bookNumber}
                   pageSize={pageSize}
                   favoriteBooks={favoriteBooks}
                   userId = {userId}/>
        </>
    )
}


const mapStateToProps = (state: store) => ({
    userId: state.auth.userId,
    favoriteBooks: state.auth.favoriteBooks,
});

const mapDispatchToProps = (dispatch: Function) => ({
    setFavBooks: (books: Array<string>) => {dispatch(setFavBooks(books))}
});

export default connect(mapStateToProps, mapDispatchToProps)(BooksContainerFav);