import { taskService } from "../../services/task.service.js"
import { ADD_TASK, TASK_UNDO, REMOVE_TASK, SET_TASKS, SET_FILTER_BY, SET_IS_LOADING, UPDATE_TASK } from "../reducers/task.reducer.js"
import { store } from "../store.js"
import { userService } from '../services/user.service.js'


export function loadTasks() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const filterBy = store.getState().taskModule.filterBy
    return taskService.query(filterBy)
        .then(tasks => {
            store.dispatch({ type: SET_TASKS, tasks })
        })
        .catch(err => {
            console.log('task action -> Cannot load tasks', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

/*export function removeTaskOptimistic(taskId) {
    store.dispatch({ type: REMOVE_TASK, taskId })
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    return taskService.remove(taskId)
        .catch(err => {
            store.dispatch({ type: CAR_TASK })
            console.log('task action -> Cannot remove task', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}*/


export function removeTask(taskId,txt) {
    const user = store.getState().userModule.loggedinUser
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return taskService.remove(taskId)
        .then(() => {
            store.dispatch({ type: REMOVE_TASK, taskId })
            userService.addActivity('remove',user,txt)
        })
        .catch(err => {
            console.log('task action -> Cannot remove task', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function saveTask(task) {

    const type = task.id ? UPDATE_TASK : ADD_TASK
    const activityType = task.id ? 'update' : 'add'
    const user = store.getState().userModule.loggedinUser

    
    return taskService.save(task)
        .then(taskToSave => {
            store.dispatch({ type, task: taskToSave })
            userService.addActivity(activityType,user,task.txt)
           
            

            return taskToSave
        })
        .catch(err => {
            console.log('task action -> Cannot save task', err)
            throw err
        })
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}