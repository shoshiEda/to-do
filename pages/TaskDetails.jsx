import { taskService } from "../services/task.service.js"
import { userService } from '../services/user.service.js'

const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

export function TaskDetails() {

    const [task, setTask] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    const user =userService.getLoggedinUser() || null


    useEffect(() => {
        loadTask()
    }, [params.taskId])


    function loadTask() {
        taskService.get(params.taskId)
            .then(task => setTask(task))
            .catch(err => {
                console.log('err:', err)
                navigate('/')
            })
    }

    function onBack() {
        navigate('/')
       
    }

    console.log('Render');

    if (!task) return <div>Loading...</div>
    return (
        <section style={user?{backgroundColor:user.prefs.bgcolor,color:user.prefs.color}:{}} className="task-details">
            <h1>Task: {task.txt}</h1>
            <p>Created at: {new Date(task.createdAt).toLocaleString()}</p>
            <p>status:{task.isActive? 'Active' : 'Done'}</p>
            <button onClick={onBack}><i className="fa-solid fa-rotate-left"></i></button>
        </section>
    )
}