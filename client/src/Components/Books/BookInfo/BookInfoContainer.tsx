import {useParams} from "react-router-dom";
import {useHttp} from "../../../Hooks/httpHooks";
import {useEffect} from "react";
import {BooksInfo} from "./BooksInfo";
import {book, store} from "../../../store/interface";
import {connect} from "react-redux";
import {setBookInfoAC} from "../../../store/book-reducer";
import {IbookInfoPage} from "../../../interface/componentInterface";

const BookInfoContainer: React.FC<IbookInfoPage> = ({bookInfo, setBookInfo}: IbookInfoPage) => {

    const {loading, request, error, clearError} = useHttp()
    const {id} = useParams()
    // let param = window.location.search.replace( '?', '');

    const bookHandler = async () => {
        try {
            const book = await  request(`http://localhost:5000/api/books/get-book?id=${id}`, 'GET')
            setBookInfo(book)
            // console.log(book)
            // await setBook(books, bookNum)
        }catch (e:any) {

        }
    }

    useEffect(() => {
        bookHandler()
    },[])
    //console.log(id)
    return (
        <>
            <BooksInfo bookInfo={bookInfo}/>
        </>
    )
}


const mapStateToProps = (state: store) => ({
    bookInfo: state.books.bookInfo,
});

const mapDispatchToProps = (dispatch: Function) => ({
    // login: (token: string, userId: string) => {dispatch(setLoginAC(token, userId))},
    // logout: () => {dispatch(logoutAC())}
    //setBook: (books: Array<book>, bookNum: number) => {dispatch(setBookAC(books, bookNum))}
    setBookInfo: (book: book) => {dispatch(setBookInfoAC(book))}
});

export default connect(mapStateToProps, mapDispatchToProps)(BookInfoContainer)