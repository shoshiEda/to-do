import { storageService } from './async-storage.service.js'

export const userService = {
    login,
    signup,
    logout,
    getLoggedinUser,
    getEmptyCredentials,
    editUserDelails,
    addActivity
}

const KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function login({ username, password }) {
    return storageService.query(KEY)
        .then(users => {
            const user = users.find(user => user.username === username && user.password === password)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname ,balance:10000,prefs:{color:'#000000',bgcolor:'#FFFFFF'},activities:[]}
    return storageService.post(KEY, user)
        .then(_setLoggedinUser)
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return Promise.resolve()
}

function _setLoggedinUser(user) {
    const userToSave = { id: user.id, fullname: user.fullname,balance:user.balance,prefs:user.prefs,activities:user.activities }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}

function editUserDelails(cardentials){
    let user = getLoggedinUser()
    if(cardentials.fullname)
    user.fullname=cardentials.fullname
    if(cardentials.color)
    user.prefs.color=cardentials.color
    if(cardentials.bgcolor)
    user.prefs.bgcolor=cardentials.bgcolor
    return storageService.put(KEY, user)
        .then(_setLoggedinUser)
}

function addActivity(action,user){
    let newActivity
    if(action==='remove')
    newActivity={txt: 'User Removed Todo', at:Date.now()}
    if(action==='update')
    newActivity={txt: 'User updated Todo', at:Date.now()}
    if(action==='add')
    newActivity={txt: 'User added Todo', at:Date.now()}
  

    user.activities.push(newActivity)
    return storageService.put(KEY, user)
    .then(_setLoggedinUser)
}