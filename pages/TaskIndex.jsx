const { Link } = ReactRouterDOM

import { TaskFilter } from "../cmps/TaskFilter.jsx"
import { TaskList } from "../cmps/TaskList.jsx"
import { taskService } from "../services/task.service.js"
import { showSuccessMsg } from "../services/event-bus.service.js"
import { userService } from '../services/user.service.js'


const { useState, useEffect } = React

export function TaskIndex() {

    const [tasks, setTasks] = useState(null)
    const [filterBy, setFilterBy] = useState(taskService.getDefaultFilter())
    const user =userService.getLoggedinUser() || null


    useEffect(() => {
        loadTasks()
       
    }, [filterBy])

    function loadTasks() {
        taskService.query(filterBy)
            .then(tasks => setTasks(tasks))
            .catch(err => console.log('err:', err))
    }

    function onRemoveTask(taskId) {
        if(!user) return
        taskService.remove(taskId)
            .then(() => {
                userService.addActivity('remove',user)
                .then(()=> { setTasks(prevTasks => {
                    return prevTasks.filter(task => task.id !== taskId)
                })
                showSuccessMsg(`Task successfully removed!`)})
               
            })
            .catch(err => console.log('err:', err))

    }

    function onToggleStatus(task){
        task.isActive=!task.isActive
        taskService.save(task)
        .then(loadTasks)
    }

    function onEditTask(taskId=0){
        const txt=prompt('what is the task?')
        if(!txt) return
        taskService.save({txt,id:taskId})
        .then(()=>{
            if(taskId)        userService.addActivity('update',user)
            if(!taskId)        userService.addActivity('add',user)
        })
        .then(loadTasks)
    }


    function onSetFilter(filterBy) {
       
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    const { txt , status } = filterBy
    if (!tasks) return <div>Loading...</div>
    return (
        <section style={user?{backgroundColor:user.prefs.bgcolor,color:user.prefs.color}:{}} className="task-index ">
            <h1>What is there to do?</h1>
            <TaskFilter filterBy={{ txt, status }} onSetFilter={onSetFilter} />
            {user && <button onClick={() => onEditTask()}>Add</button>}
            {!tasks.length && <div>There are no tasks yet</div>}

            <TaskList tasks={tasks} onRemoveTask={onRemoveTask} onEditTask={onEditTask} onToggleStatus={onToggleStatus} user={user} />
        </section>
    )
}