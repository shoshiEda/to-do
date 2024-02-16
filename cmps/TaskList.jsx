import { TaskPreview } from "./TaskPreview.jsx";
const { Link } = ReactRouterDOM
export function TaskList({ tasks, onRemoveTask }) {
    return (
        <ul className="task-list">
            {tasks.map(task =>
                <li key={task.id}>
                    <TaskPreview task={task} />
                    <section>
                        <button onClick={() => onRemoveTask(task.id)}>Remove Task</button>
                        <button><Link to={`/task/${task.id}`}>Details</Link></button>
                        <button><Link to={`/task/edit/${task.id}`}>Edit</Link></button>
                    </section>
                </li>
            )}
        </ul>
    )
}