import {applyMiddleware, combineReducers, createStore} from "redux";
import {authReducer} from "./auth-reducer";
import thunk from "redux-thunk";
import {bookReducer} from "./book-reducer";

const reducers = combineReducers({
    auth: authReducer,
    books: bookReducer
})

let store = createStore(reducers, applyMiddleware(thunk));
export default  store;