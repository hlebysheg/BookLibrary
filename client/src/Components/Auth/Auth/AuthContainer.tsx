import {Auth} from "./Auth";
import {connect} from "react-redux";
import {store} from "../../../store/interface";
import {logoutAC, setLoginAC} from "../../../store/auth-reducer";
import {auth} from "../../../interface/componentInterface";

const AuthContainer = ({isAuth, login, logout}: auth) => {
    return (
        <>
        <Auth isAuth = {isAuth} login = {login} logout={logout}/>
        </>
    )
}


const mapStateToProps = (state: store) => ({
    isAuth: state.auth.isAuth
});

const mapDispatchToProps = (dispatch: Function) => ({
    login: (token: string, userId: string) => {dispatch(setLoginAC(token, userId))},
    logout: () => {dispatch(logoutAC())}
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);