const { Link } = ReactRouterDOM

import { TaskFilter } from "../cmps/TaskFilter.jsx"
import { TaskList } from "../cmps/TaskList.jsx"
import { taskService } from "../services/task.service.js"
import { showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React

export function TaskIndex() {

    const [tasks, setTasks] = useState(null)
    const [filterBy, setFilterBy] = useState(taskService.getDefaultFilter())

    useEffect(() => {
        loadTasks()
       
    }, [filterBy])

    function loadTasks() {
        taskService.query(filterBy)
            .then(tasks => setTasks(tasks))
            .catch(err => console.log('err:', err))
    }

    function onRemoveTask(taskId) {
        taskService.remove(taskId)
            .then(() => {
              
                setTasks(prevTasks => {
                    return prevTasks.filter(task => task.id !== taskId)
                })
                showSuccessMsg(`Task successfully removed!`)
            })
            .catch(err => console.log('err:', err))

    }


    function onSetFilter(filterBy) {
       
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    const { txt , status } = filterBy

    if (!tasks) return <div>Loading...</div>
    return (
        <section className="task-index ">
            <h1>What is there to do?</h1>
            <TaskFilter filterBy={{ txt, status }} onSetFilter={onSetFilter} />
            <Link to="/task/edit">Add</Link>
            <TaskList tasks={tasks} onRemoveTask={onRemoveTask} />
        </section>
    )
}