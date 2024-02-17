import { userService } from "../services/user.service.js"

const { createStore } = Redux

export const SET_TASKS = 'SET_TASKS'
export const REMOVE_TASK = 'REMOVE_TASK'
export const ADD_TASK = 'ADD_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'

/// user
export const SET_USER = 'SET_USER'
export const UPDATE_USER = 'UPDATE_USER'

const initialState = {
    tasks: [],
    loggedinUser: userService.getLoggedinUser(),
   
}

function appReducer(state = initialState, action = {}) {

    let tasks
   
    switch (action.type) {
      //todos
        case SET_TASKS:
            return { ...state, tasks: action.tasks }

        case REMOVE_TASK:
            tasks = state.tasks.filter(task => task.id !== action.taskId)
            return { ...state, tasks }

        case ADD_TASK:
            tasks = [...state.tasks, action.task]
            return { ...state, tasks }

        case UPDATE_TASK:
            tasks = state.tasks.map(task => task.id === action.task.id ? action.task : task)
            return { ...state, tasks }


        // user
        case SET_USER:
            return { ...state, loggedinUser: action.user }

        case UPDATE_USER:
            return { ...state, loggedinUser: action.user }
        default:
            return state
    }
}

export const store = createStore(appReducer)

