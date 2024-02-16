import { taskService } from "../services/task.service.js"
const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React


export function TaskEdit() {
    const [taskToEdit, setTaskToEdit] = useState(taskService.getEmptyTask())
    
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.taskId) {
            loadTask()
        }
    }, [])

    function loadTask() {
        taskService.get(params.taskId)
            .then(setTaskToEdit)
            .catch(err=>console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setCarToEdit(prevTask => ({ ...prevTask, [field]: value }))
    }

    function onSaveTask(ev) {
        ev.preventDefault()
        taskService.save(taskToEdit)
            .then(() => navigate('/task'))
            .catch(err => console.log('err:', err))
    }

    const { txt } = taskToEdit
    return (
        <section className="task-edit">
            <h1>Add Task</h1>
            <form onSubmit={onSaveTask}>
                <label htmlFor="txt">title:</label>
                <input onChange={handleChange} value={vendor} type="text" name="txt" id="txt" />

                <button disabled={!txt}>Save</button>
            </form>

        </section>
    )
}