const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux



import { TaskFilter } from "../cmps/TaskFilter.jsx"
import { TaskList } from "../cmps/TaskList.jsx"
import { taskService } from "../services/task.service.js"
import { showSuccessMsg,showErrorMsg } from "../services/event-bus.service.js"
import { userService } from '../services/user.service.js'
import { ADD_TASK, REMOVE_TASK, SET_TASKS, UPDATE_TASK } from '../store/store.js'


export function TaskIndex() {
    const dispatch = useDispatch()


    const tasks = useSelector(storeState => storeState.tasks)
    const [filterBy, setFilterBy] = useState(taskService.getDefaultFilter())
    const user = useSelector(storeState => storeState.loggedinUser)

    useEffect(() => {
        loadTasks()
       
    }, [filterBy])

    function loadTasks() {
        taskService.query(filterBy)
            .then(tasks =>dispatch({ type: SET_TASKS, tasks }))
            .catch(err => {
                console.log('err:', err)
                showErrorMsg(`Error:`,err)
            }) }

    function onRemoveTask(taskId,txt) {
        if(!user) return
        taskService.remove(taskId)
            .then(() => {
                userService.addActivity('remove',user,txt)
                .then(dispatch({ type: REMOVE_TASK, taskId }))
                .then(showSuccessMsg(`Task successfully removed!`))            
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg(`Error:`,err)
            })

    }

    function onToggleStatus(task){
        task.isActive=!task.isActive
        taskService.save(task)
        .then(loadTasks)
    }

    function onEditTask(task=null){
        const txt=prompt('what is the task?')
        if(!txt) return
        taskService.save({txt,task})
        .then((newTask)=>{
            if(task) {
                userService.addActivity('update',user,txt)
                .then(() => {
                    dispatch({type: UPDATE_TASK,newTask})
                })
            } else {
                userService.addActivity('add',user,txt)
                .then(() => {
                    dispatch({type: ADD_TASK,newTask})
                })
            }
        })
        .then(loadTasks)
        .catch(err => {
            console.log('err:', err)
            showErrorMsg(`Error:`,err)
        })
    }


    function onSetFilter(filterBy) {
       
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }
   
    

    if (!tasks || !tasks.length) return <div>Loading...</div>
    return (
        <section style={user?{backgroundColor:user.prefs.bgcolor,color:user.prefs.color}:{}} className="task-index ">
            <h1>What is there to do?</h1>
            {<TaskFilter onSetFilter={onSetFilter} />}
            {user && <button onClick={() => onEditTask()}>Add</button>}
            {!tasks.length && <div>There are no tasks yet</div>}

            <TaskList tasks={tasks} onRemoveTask={onRemoveTask} onEditTask={onEditTask} onToggleStatus={onToggleStatus} user={user} />
        </section>
    )
}