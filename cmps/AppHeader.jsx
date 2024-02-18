import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { userService } from '../services/user.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { SET_USER } from '../store/reducers/user.reducer.js'
import { logout } from '../store/actions/user.actions.js'


const { Link } = ReactRouterDOM
const { useState } = React
const { useNavigate } = ReactRouter
const { useSelector, useDispatch } = ReactRedux



export function AppHeader() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    function onLogout() {
        logout()
            .then(()=>{
                showSuccessMsg('user successfully logged out')
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }



    return (
        <header className="app-header full flex justify-between align-center">
            <section>
                <h1>To Do list</h1>
               
            </section>
            {user ? (
                < section >

                    <Link className="link" to={`/user/${user.id}`}>Hello {user.fullname}</Link>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    <LoginSignup />
                </section>
            )}
            <UserMsg />
        </header>
    )
}
      