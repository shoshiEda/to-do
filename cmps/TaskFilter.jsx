
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
            <fieldset>
                <legend>Filter Our Tasks</legend>
            <form onSubmit={onSetFilterBy} >
                <label htmlFor="txt">search a task: </label>
                <input value={txt} onChange={handleChange} type="text" id="txt" name="txt" />

                <select value={status} onChange={handleChange} name="status">
                    <option value={'all'} >All</option>
                    <option value={'active'}>Active only</option>
                    <option value={'done'}>Done only</option>
                </select>
            </form>
            </fieldset>

        </section>
    )
}