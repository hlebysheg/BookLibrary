import {book} from "../store/interface";

export interface auth {
    isAuth: boolean,
    login: Function,
    logout: Function,
}

export interface header {
    isAuth: boolean,
    logout: Function,
}

export interface Ibooks {
    page: number,
    pageSize: number,
    booksCollection: Array<book>,
    bookNumber: number,
    setBook: Function,
    setPage: Function,
}

export interface IBooksContainerFav extends IbookComponent{
    userId: string | null
    favoriteBooks: Array<string>
    setFavBooks: Function
}

export interface IbookComponent {
    booksCollection: Array<book>
    findHandler: Function
    bookNumber: number
    pageSize: number
    favoriteBooks: Array<string>
    userId: string | null
    // tagHandler: Function
}

export interface IbookPage {
    book: book
    handleClick: Function
    statePost: 0 | 1 | 2
    // ?tagHandler: Function
}

export interface IboocContainerPage{
    book: book
    userId: string | null
    favoriteBooks: Array<string>
    setFavBooks: Function
    id: string
    isAuth: boolean
}

export interface IbookInfoPage {
    setBookInfo: Function
    bookInfo: book
}

export interface IbookInfo {
    bookInfo: book
}

export interface IGenreMenu {
    menuActive: boolean
}

export interface ILinkArea{
    bookNumber: number,
    pageSize: number
}

export interface MyBookContainer extends Ibooks{
    userId: string | null
    favoriteBooks: Array<string>
    setFavBooks: Function
}

export interface MyBookPage {
    booksCollection: Array<book>
}