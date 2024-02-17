

export function TaskPreview({ task , onToggleStatus }) {


const dynClass=task.isActive? 'Active' : 'Done'

    return (
<p onClick={()=>onToggleStatus(task)} className={dynClass+' task-preview'}> 📝{ task.txt}</p>          
    )
}