import {projects, currentProject, projectController} from './modules/projectController';
import {displayController} from './modules/displayController';
import '../node_modules/flatpickr/dist/themes/material_red.css';
import {datePicker} from './modules/datePicker'

////////////////////////
// initial page setup //
////////////////////////
createAndShowProject('Inbox');
createAndShowProject('Chores')
createAndShowProject('School')
projects.get('Inbox').addEntry('soonest, high-priority', 'abc', new Date(2021, 6, 12), 3);
setTimeout(() => {projects.get('Inbox').addEntry("latest, middle-priority", "def", new Date(2025, 6, 12), 2);}, 1);
setTimeout(() => {projects.get('Inbox').addEntry('middle, low-priority', 'ghi', new Date(2023, 6, 12), 1)}, 10);
projects.get('Chores').addEntry('Wipe the piano', 'cleaner is under the sink', new Date(2022, 9, 30), 0)
projects.get('School').addEntry('Data Structures homework', 'Stacks and Queues', new Date(2022, 8, 27), 3)

setTimeout(() => {displayController.buildPage(projects.get('Inbox'))}, 20);

//////////////////////////////////
// adding entry form submission //
//////////////////////////////////
const form = document.querySelector('.entry-form')
form.onsubmit = function(){
    const prevProject = currentProject;
    let selectedProject;

    // if no project selected in form, default to the currently displayed project
    const project = document.querySelector('input[name="projects"]:checked');
    if (project) {
        selectedProject = project.id
    }
    else {
        selectedProject = currentProject;
    }

    // parse form inputs
    const title = document.getElementById('titleInput').value
    const description = document.getElementById('descriptionInput').value
    const priority = document.querySelector('input[name="priority"]:checked').value;
    let date = new Date(0);

    // if date has been selected in datePicker, update date value
    if (datePicker.selectedDates.length > 0){
        date = datePicker.selectedDates[0]
    }

    // add new entry to project using parsed inputs
    const entry = projects.get(selectedProject).addEntry(title, description, date, priority)

    // if adding to the currently shown project, then update the page
    if (prevProject == currentProject){
        displayController.buildPage(projects.get(currentProject))
    }
    displayController.clearForm();
    return false;
}

/////////////////////////////
// project form submission //
/////////////////////////////

// simple function for creating new project and showing it in sidebar (this is useful for the initial page setup!)
function createAndShowProject(projectName){
    projectController.addProject(projectName)
    displayController.showProject(projectName);
}

// parse name from form and use it to build new project
const projectForm = document.querySelector('.project-form')
projectForm.onsubmit = function(){
    const name = document.getElementById('nameInput')
    createAndShowProject(name.value);
    displayController.clearProjectForm();
    return false;
}
