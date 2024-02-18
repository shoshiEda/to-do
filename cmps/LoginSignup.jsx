import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { LoginForm } from './LoginForm.jsx'
import { login ,signup } from '../store/actions/user.actions.js'


const { useState } = React


export function LoginSignup() {

   


    const [isSignup, setIsSignUp] = useState(false)

    function onLogin(credentials) {
        isSignup ? signupUser(credentials) : loginUser(credentials)
    }

    function loginUser(credentials) {
        login(credentials)
            .then(() => { showSuccessMsg('Logged in successfully') })
            .catch((err) => { showErrorMsg('Oops try again') })
    }

    function signupUser(credentials) {
        signup(credentials)
            .then(() => { showSuccessMsg('Signed up successfully') })
            .catch((err) => { showErrorMsg('Oops try again') })
    }

    return (
        <div className="login-page">
            <LoginForm
                onLogin={onLogin}
                isSignup={isSignup}
            />
            <div className="btns">
                <a href="#" onClick={() => setIsSignUp(!isSignup)}>
                    {isSignup ?
                        'Already a member? Login' :
                        'New user? Signup here'
                    }
                </a >
            </div>
        </div >
    )
}
