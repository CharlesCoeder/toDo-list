import {projects, currentProject, projectController} from './modules/projectController';
import {displayController} from './modules/displayController';


displayController.buildPage(projects.get('Inbox'))

// form submission functionality
const form = document.querySelector('.entry-form')
form.onsubmit = function(){
    const title = document.getElementById('titleInput').value
    const description = document.getElementById('descriptionInput').value
    const priority = document.querySelector('input[name="priority"]:checked').value;
    const entry = projects.get(currentProject).addEntry(title, description, new Date(2022, 7, 14), priority)
    displayController.showEntry(entry)
    displayController.clearForm();
    return false;
}

// project form submission functionality
const projectForm = document.querySelector('.project-form')
projectForm.onsubmit = function(){
    console.log('ah')
    const name = document.getElementById('nameInput')
    projectController.addProject(name.value)
    displayController.clearProjectForm();
    return false;
}

// sidebar event listeners
