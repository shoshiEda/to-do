const { useState } = React


export function UserEditForm({user,editUserPrefs,closeEdit}){

    const [credentials, setCredentials] = useState({fullname:user.fullname,color:user.prefs.color,bgcolor:user.prefs.bgcolor})

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        editUserPrefs(credentials)
    }

    return (
        <form className="update-user-form" onSubmit={handleSubmit}>
            <label htmlFor="fullname">full name:</label>
            <input
                type="text"
                name="fullname"
                value={credentials.fullname}
                onChange={handleChange}
            />
            <br/>
            <label htmlFor="color">Text color:</label>
            <input
                type="color"
                name="color"
                value={credentials.color}
                onChange={handleChange}
            />
                        <br/>

            <label htmlFor="bgcolor">Backgroung color:</label>
            <input
                type="color"
                name="bgcolor"
                value={credentials.bgcolor}
                onChange={handleChange}
            />
                        <br/>
            <div className="btns">
            <button onClick={closeEdit}>close</button>
            <button>submit</button>
            </div>
        </form>
    )
}
