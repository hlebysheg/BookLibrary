import {authState, IAuthActions, ILogoutAC, ISetFavBooks, ISetLoginAC} from "./interface";

//const
const SET_LOGIN = 'auth/SET-LOGIN'
const LOGOUT = 'auth/LOGOUT'
const SET_FAVOURITE_BOOKS = 'auth/SET-FAVOURITE-BOOKS'

let initial: authState = {
    token: null,
    userId: null,
    isAuth: false,
    favoriteBooks: [],
}

export const authReducer = (state = initial, action: IAuthActions) => {

    if (action.type === SET_LOGIN){
        return {
            userId: "userId" in action ? action.userId : null,
            token: "token" in action ? action.token : null,
            isAuth: true,
        }
    }

    if (action.type === LOGOUT){
        return {
            userId: null,
            token: null,
            isAuth: false,
        }
    }

    if (action.type === SET_FAVOURITE_BOOKS){
        return {
            ...state,
            favoriteBooks: "books" in action ? action.books : [],
        }
    }

    return state
}


//ACTION creators
export const setLoginAC = (token: string, userId: string): ISetLoginAC => {
    return {
        type: SET_LOGIN,
        token,
        userId,

    }
}

export const logoutAC = (): ILogoutAC => {
    return {
        type: LOGOUT,
    }
}

export const setFavBooks = (books: Array<string>): ISetFavBooks => {
    return {
        type: SET_FAVOURITE_BOOKS,
        books: books
    }
}

//thunk

//ISetLoginAC ILogoutAC ISetFavBooks