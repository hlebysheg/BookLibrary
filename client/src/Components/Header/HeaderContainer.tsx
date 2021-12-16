import {connect} from "react-redux";
import {logoutAC} from "../../store/auth-reducer";
import {store} from "../../store/interface";
import {header} from "../../interface/componentInterface";
import {Header} from "./Header";


//
const HeaderContainer = ({isAuth, logout}: header) => {
    return (
        <>
           <Header isAuth={isAuth} logout={logout}/>
        </>
    )
}


const mapStateToProps = (state: store) => ({
    isAuth: state.auth.isAuth
});

const mapDispatchToProps = (dispatch: Function) => ({
    logout: () => {dispatch(logoutAC())}
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);