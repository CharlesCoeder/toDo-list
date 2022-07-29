import {projects, currentProject} from './modules/projectController';
import {displayController} from './modules/displayController';


displayController.buildPage(projects.get('Inbox'))

// form submission functionality
const form = document.querySelector('.form')
form.onsubmit = function(){
    const title = document.getElementById('titleInput').value
    const description = document.getElementById('descriptionInput').value
    const priority = document.querySelector('input[name="priority"]:checked').value;

    const entry = projects.get(currentProject).addEntry(title, description, new Date(2022, 7, 14), priority)
    displayController.showEntry(entry)

    displayController.clearForm();
    return false;
}