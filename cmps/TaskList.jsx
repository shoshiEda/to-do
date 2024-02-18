import { TaskPreview } from "./TaskPreview.jsx";
const { Link } = ReactRouterDOM
export function TaskList({ tasks, onRemoveTask ,onEditTask,onToggleStatus,user=null }) {
    return (
        <ul className="task-list">
            {tasks.map((task,idx) =>
                <li className="flex justify-between align-center" key={idx}>
                    {<TaskPreview task={task} onToggleStatus={onToggleStatus} />}
                    <section>
                        {user && <button onClick={() => onRemoveTask(task.id,task.txt)}><i className="fa-solid fa-trash-can"></i></button>}
                        <button><Link to={`/task/${task.id}`}><i className="fa-solid fa-circle-info"></i></Link></button>
                        {user &&<button onClick={() => onEditTask(task)}><i className="fa-solid fa-pen-to-square"></i></button>}
                    </section>
                </li>
            )}
        </ul>
    )
}