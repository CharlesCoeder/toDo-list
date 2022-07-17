const listEntry = (title, description, dueDate, priority) => {

    const addDate = new Date()

    const setTitle = function(newTitle){
        this.title = newTitle;
    }

    const setDescription = function(newDescription){
        this.description = newDescription;
    }

    const setDueDate = function(newDate){
        this.dueDate = newDate;
    }

    const setPriority = function(newPriority){
        this.priority = newPriority;
    }

    return {title, description, addDate, dueDate, priority, setTitle, setDescription, setDueDate, setPriority};
}

export {listEntry};