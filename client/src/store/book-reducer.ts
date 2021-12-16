import {book, bookState, IBookActions, ISetBookAC, ISetBookInfoAC, ISetPageAC} from "./interface";

//const
const SET_BOOKS = 'book/SET-BOOKS'
const NEXT_PAGE = 'books/NEXT-PAGE'
const SET_BOOK_INFO = 'books/SET-BOOK-INFO'

const bookInfo = {
    _id: '',
    name: '',
    author: '',
    description: '',
    photo: '',
    clicks: 0,
    genre: [''],
}

let initial: bookState = {
    books: [],
    bookNum: 0,
    page: 1,
    pageSize: 12,
    bookInfo: bookInfo,
}

export const bookReducer = (state = initial, action: IBookActions) => {
    //пока искуственно добавляем в новости
    if (action.type === SET_BOOKS){
        return {
            ...state,
            books: "books" in action ? action.books :[],
            bookNum: "bookNum" in action ? action.bookNum :0,
        }
    }

    if (action.type === NEXT_PAGE){
        return {
            ...state,
            page: "page" in action ? action.page :1
        }
    }

    if(action.type === SET_BOOK_INFO) {
        return {
            ...state,
            bookInfo: "book" in action ? action.book :bookInfo
        }
    }
    return state
}


//ACTION creators
export const setBookAC = (books: Array<book>, bookNum: number): ISetBookAC => {
    return {
        type: SET_BOOKS,
        books,
        bookNum,
    }
}

export const setPage = (page: number): ISetPageAC => {

    return {
        type: NEXT_PAGE,
        page
    }
}

export const setBookInfoAC = (book: book): ISetBookInfoAC => {
    return {
        type: SET_BOOK_INFO,
        book: book,
    }
}

//thunk
