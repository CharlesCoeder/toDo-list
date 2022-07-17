import { listEntry } from "./listEntry"

const project = (name) => {

    const addEntry = function(title, description, dueDate, priority){
        const entry = listEntry(title, description, dueDate, priority)
        this.entries.push(entry)
    }

    const sort = function(sortingMethod){
        const methods = ['addDate', 'dueDate', 'priority'];
        // sortingMethod = sortingMethod.toLowerCase();

        if (!methods.includes(sortingMethod)){
            throw 'Invalid sorting method. Options: addDate, dueDate, priority'
        }

        this.entries = this.entries.sort((a,b) => (a[sortingMethod] > b[sortingMethod]) ? 1 : -1)
    }

    let entries = [];
    return {name, entries, addEntry, sort}
}

export {project};