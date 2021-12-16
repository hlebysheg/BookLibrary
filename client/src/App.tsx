import React from 'react';
import './App.scss';
import 'materialize-css'
import {BrowserRouter, Route, RouteProps, Routes, Navigate} from "react-router-dom";
import {Register} from "./Components/Auth/Register/Register";
import {Footer} from "./Components/Footer/Footer";
import AuthContainer from "./Components/Auth/Auth/AuthContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import {useDispatch} from "react-redux";
import {setLoginAC} from "./store/auth-reducer";
import BooksContainer from "./Components/Books/BooksContainer";
import BookInfoContainer from "./Components/Books/BookInfo/BookInfoContainer";
import MyBooksContainer from "./Components/Books/MyBooks/MyBooksContainer";


function App() {
  // const {login, logout, token, userId} = useAuth()
    const storageName: string = 'userData'
    const dispatch = useDispatch()
    let userData = localStorage.getItem(storageName)

    if(userData !== null){
        let {userId, token} = JSON.parse(userData)
        dispatch(setLoginAC(token, userId))
    }

  return (
    <BrowserRouter>
        <div className={'flex-lib'}>
            <header>
                <HeaderContainer/>
            </header>
            <main>
                <RouteApp/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    </BrowserRouter>
  );
}

const RouteApp: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate replace to="/books" />} />
            <Route path={'/auth'} element={<AuthContainer/>}/>
            <Route path={'/register'} element={<Register/>}/>
            <Route path={'/books'} element={<BooksContainer/>}>
                <Route path={'/books/genre'} element={<BooksContainer/>}>
                    <Route path = {':genre'} element = {<BooksContainer/>}>
                        <Route path = {':pageNum'}  element={<BooksContainer/>}/>
                    </Route>
                </Route>
                <Route path = {':pageNum'} element = {<BooksContainer/>}/>
            </Route>
            <Route path={'/book-info'} element={<BookInfoContainer/>}>
                <Route path = {':id'} element={<BookInfoContainer/>}/>
            </Route>
            <Route path={'/my-books'} element={<MyBooksContainer/>}/>
        </Routes>
    )
}

export default App;
