
const { useState, useEffect } = React


export function TaskFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onSetFilterBy(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
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

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }


    const { txt, status } = filterByToEdit
    return (
        <section className="task-filter full">
            <h2>Filter Our Tasks</h2>
            <form onSubmit={onSetFilterBy} >
                <label htmlFor="txt">search a task: </label>
                <input value={txt} onChange={handleChange} type="text" id="txt" name="txt" />

                <select>
                    <option value={'all'} onChange={handleChange} name="status" >All</option>
                    <option value={'active'} onChange={handleChange} name="status" >Active only</option>
                    <option value={'done'} onChange={handleChange} name="status" >Done only</option>
                </select>
                <button>Submit</button>
            </form>
        </section>
    )
}