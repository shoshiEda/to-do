import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { userService } from '../services/user.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { UPDATE_USER, SET_USER } from '../store/store.js'


const { Link, NavLink } = ReactRouterDOM
const { useState } = React
const { useNavigate } = ReactRouter
const { useSelector, useDispatch } = ReactRedux



export function AppHeader() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(storeState => storeState.loggedinUser)

    function onLogout() {
        userService.logout()
            .then(()=>{
                onSetUser(null)
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    function onSetUser(user) {
        dispatch({ type: SET_USER, user })
        navigate('/')
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
                    <LoginSignup onSetUser={onSetUser} />
                </section>
            )}
            <UserMsg />
        </header>
    )
}
      