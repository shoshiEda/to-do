const { useState } = React
const { Link, useParams } = ReactRouterDOM

import { userService } from '../services/user.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { ActivitiesList } from '../cmps/ActivitiesList.jsx'
import { UserEditForm } from '../cmps/UserEditForm.jsx'



export function UserDetails() {

    const [user,setUser] = useState(userService.getLoggedinUser())
    const { userId } = useParams()
    const [isEdit,SetIsEdit] = useState(false)

 
    function editUserPrefs(credentials){
        userService.editUserDelails(credentials)
        .then(setUser)
        .then(closeEdit)
    }

    function closeEdit(){
        SetIsEdit(false)
    }


    if (user.id!==userId) return (
        <section>
    <h1>Error! you are not the user</h1>
    <Link to={`/`}><button className="fa-solid fa-rotate-left"></button></Link>
    </section>
    )

    if (!user) return <h1>loadings....</h1>
    return(
        <section style={{backgroundColor:user.prefs.bgcolor,color:user.prefs.color}} className='user-details'>
        <h1>hello {user.fullname}</h1>
        <h3>balance:{user.balance}</h3>
        {!isEdit &&<button onClick={()=> SetIsEdit(true)}>Edit</button>}
        {user.activities && user.activities.length && <section>
            <h3>activities:</h3>
            <ActivitiesList user={user}/>
            </section>
        }

        {isEdit && <UserEditForm user={user} editUserPrefs={editUserPrefs} closeEdit={closeEdit}/>}

        <Link to={`/`}><button className="fa-solid fa-rotate-left"></button></Link>

        </section>
    )
}