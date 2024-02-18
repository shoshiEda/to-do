const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux



import { TaskFilter } from "../cmps/TaskFilter.jsx"
import { TaskList } from "../cmps/TaskList.jsx"
import { showSuccessMsg,showErrorMsg } from "../services/event-bus.service.js"
import { loadTasks, removeTask, saveTask, setFilterBy } from '../store/actions/task.actions.js'


export function TaskIndex() {
    const tasks = useSelector(storeState => storeState.taskModule.tasks)
    const isLoading = useSelector(storeState => storeState.taskModule.isLoading)
    const filterBy = useSelector(storeState => storeState.taskModule.filterBy)    
    const user = useSelector(storeState => storeState.userModule.loggedinUser)


    useEffect(() => {
        loadTasks()
       
    }, [filterBy])

   

    console.log('isLoading:', isLoading)


    function onRemoveTask(taskId,txt) {
        if(!user) return
        removeTask(taskId,txt)
            .then(() => {(showSuccessMsg(`Task successfully removed!`))            
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg(`Error:`,err)
            })

    }

    function onToggleStatus(task){
        task.isActive=!task.isActive
        saveTask(task)
    }

    function onEditTask(task=null){
        const txt=prompt('what is the task?')
        if(!txt) return

        task ? task.txt=txt : task=txt

        saveTask(task)
        .catch(err => {
            console.log('err:', err)
            showErrorMsg(`Error:`,err)
        })
    }


    function onSetFilter(filterBy) {       
        setFilterBy(filterBy)    
    }
   
    return (
        <section style={user?{backgroundColor:user.prefs.bgcolor,color:user.prefs.color}:{}} className="task-index ">
            <h1>What is there to do?</h1>
            {<TaskFilter onSetFilter={onSetFilter} />}
            {user && <button onClick={() => onEditTask()}>Add</button>}
            {!tasks.length && <div>There are no tasks yet</div>}
            {isLoading && <div>Loading...</div>}
            {!isLoading && <TaskList tasks={tasks} onRemoveTask={onRemoveTask} onEditTask={onEditTask} onToggleStatus={onToggleStatus} user={user} />}
        </section>
    )
}