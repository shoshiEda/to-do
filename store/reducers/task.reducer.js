import { taskService } from "../../services/task.service.js"

export const SET_TASKS = 'SET_TASKS'
export const REMOVE_TASK = 'REMOVE_TASK'
export const ADD_TASK = 'ADD_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'
export const TASK_UNDO = 'TASK_UNDO'


export const SET_IS_LOADING = 'SET_IS_LOADING'

export const SET_FILTER_BY = 'SET_FILTER_BY'


const initialState = {
    tasks: [],
    isLoading: false,
    filterBy: taskService.getDefaultFilter(),
    lastTasks:[],
  
}

export function taskReducer(state = initialState, action = {}) {

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

        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        case SET_FILTER_BY:
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }
    
        case TASK_UNDO:
            tasks = [...state.lastTasks]
            return { ...state, tasks }

        default:
            return state
    }
}


