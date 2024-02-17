import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

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
    const logUser = getLoggedinUser()
    const fullUsers = utilService.loadFromStorage(KEY) 
    let fullUser=fullUsers.find(user=>user.id===logUser.id)
    if(cardentials.fullname)
    fullUser.fullname=cardentials.fullname
    if(cardentials.color)
    fullUser.prefs.color=cardentials.color
    if(cardentials.bgcolor)
    fullUser.prefs.bgcolor=cardentials.bgcolor
    return storageService.put(KEY, fullUser)
        .then(_setLoggedinUser)
}

function addActivity(action,user,task){
    let newActivity
    if(action==='remove')
    newActivity={txt: `User Removed Todo: ${task}`, at:Date.now()}
    if(action==='update')
    newActivity={txt: `User updated Todo: ${task}`, at:Date.now()}
    if(action==='add')
    newActivity={txt: `User added Todo: ${task}`, at:Date.now()}
  
    
    user.activities.push(newActivity)
   

    return storageService.put(KEY, user)
    .then(_setLoggedinUser)
}