import {projects, currentProject, projectController} from './modules/projectController';
import {displayController} from './modules/displayController';
import '../node_modules/flatpickr/dist/themes/material_red.css';
import {datePicker} from './modules/datePicker'


displayController.buildPage(projects.get('Inbox'))

// form submission functionality
const form = document.querySelector('.entry-form')
form.onsubmit = function(){
    const title = document.getElementById('titleInput').value
    const description = document.getElementById('descriptionInput').value
    const priority = document.querySelector('input[name="priority"]:checked').value;
    const date = datePicker.selectedDates[0]
    const entry = projects.get(currentProject).addEntry(title, description, date, priority)
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
