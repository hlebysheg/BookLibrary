//auth interface
export interface authState {
    userId: string | null,
    token: string | null,
    isAuth: boolean,
    favoriteBooks: Array<string>
}


//books interface
export interface book {
    _id: string,
    name: string,
    author: string,
    description: string,
    photo: string,
    clicks: number,
    genre: Array<string>
}

export interface bookState{
    books: Array<book>
    bookNum: number
    page: number
    pageSize: number
    bookInfo: book
}

export interface store {
    auth: authState
    books: bookState
}

//ACTIONS

//ACTION creators
interface IAction {
    type: string
}

export interface ISetLoginAC extends IAction{
    token?: string | null
    userId?: string | null
}

export interface ILogoutAC extends IAction{

}

export interface ISetFavBooks extends IAction{
    books?: Array<string>
}

export interface ISetBookAC extends IAction{
    books?: Array<book>
    bookNum?: number
}

export interface ISetPageAC extends IAction{
    page: number
}

export interface ISetBookInfoAC extends IAction{
    book?: book
}

export type IAuthActions = ISetLoginAC | ILogoutAC | ISetFavBooks
export type IBookActions = ISetBookAC | ISetPageAC | ISetBookInfoAC