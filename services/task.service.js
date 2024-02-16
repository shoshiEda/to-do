import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const TASK_KEY = 'taskDB'
_createTasks()

export const taskService = {
    query,
    get,
    remove,
    save,
    getEmptyTask,
    getDefaultFilter,
}

function query(filterBy) {
    return storageService.query(TASK_KEY)
        .then(tasks => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                tasks = tasks.filter(task => regExp.test(task.txt))
            }
            if (filterBy.status==='active') {
                tasks = tasks.filter(task => task.isActive)
            }
            if (filterBy.status==='done') {
                tasks = tasks.filter(task => !task.isActive)
            }
            return tasks
        })
}

function get(taskId) {
    return storageService.get(TASK_KEY, taskId)
}

function remove(taskId) {
    return storageService.remove(TASK_KEY, taskId)
}

function save(task) {
    if (task.id) {
        return storageService.put(TASK_KEY, task)
    } else {
       task= _createTask(task.txt)
        return storageService.post(TASK_KEY, task)
    }
}

function getEmptyTask(txt = '', createdAt = '',isActive=true) {
    return { vendor, maxSpeed }
}

function getDefaultFilter() {
    return { txt: '', status: ''}
}

function _createTasks() {
    let tasks = utilService.loadFromStorage(TASK_KEY)
    if (!tasks || !tasks.length) {
        tasks = []
        tasks.push(_createTask('do this'))
        tasks.push(_createTask('do that'))
        tasks.push(_createTask('lalala'))
      
        utilService.saveToStorage(TASK_KEY, tasks)
    }
}

function _createTask(txt) {
    const task = {
        txt,
        createdAt: Date.now(),
        isActive:true
    }
    task.id = utilService.makeId()
    return task
}