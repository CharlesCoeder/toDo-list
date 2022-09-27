import {projects, currentProject} from "../modules/projectController"
import {datePicker} from "./datePicker";

const displayController = (() => {
    const container = document.querySelector('.entries')

    const buildPage = function(project){
        // clears existing page
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        document.querySelector('.project-name').textContent = project.name;

        for (const entry of project.entries){
            showEntry(entry);
        }
    }

    const showEntry = function(listEntry){
        const entry = document.createElement('div')
        entry.classList.add('entry')

        const title = document.createElement('div')
        const dueDate = document.createElement('div')
        
        title.classList.add('title')
        dueDate.classList.add('dueDate')
        
        const completedBtn = document.createElement('button')
        completedBtn.classList.add('completedBtn')
        completedBtn.setAttribute('type', 'button')
        if (listEntry.priority == 3){
            completedBtn.setAttribute('style', 'background-color: #E14E43')
        }
        else if (listEntry.priority == 2){
            completedBtn.setAttribute('style', 'background-color: #F18B2B')
        }
        else if (listEntry.priority == 1){
            completedBtn.setAttribute('style', 'background-color: #0B6ADB')
        }
        else {
            completedBtn.setAttribute('style', 'background-color: white')
        }

        title.textContent = listEntry.title
        dueDate.textContent = listEntry.dueDate.toDateString();

        entry.appendChild(title)
        // only make div for description if it is nonempty
        if (!listEntry.description == ""){
            const description = document.createElement('div')
            description.classList.add('description')
            description.textContent = listEntry.description
            entry.appendChild(description)
        }       

        entry.appendChild(dueDate)
        entry.appendChild(completedBtn)

        const line = document.createElement('hr')
        entry.appendChild(line)

        container.appendChild(entry)
    }

    // show and hide form
    const form = document.querySelector('.entry-form');

    function showForm(){
        form.setAttribute('style', 'display:block');
        document.addEventListener('mouseup', hideForm);
        document.addEventListener('keydown', hideForm);
    }

    const addButton = document.querySelector('.add');
    addButton.addEventListener('click', () => {
        showForm();
    })

    const titleInput = document.getElementById('titleInput');
    const descriptionInput = document.getElementById('descriptionInput');

    function clearForm(){
        titleInput.value = "";
        descriptionInput.value = "";
        const defaultPriority = document.getElementById('none');
        defaultPriority.checked = true;
        datePicker.clear();
        form.setAttribute('style', 'display: none')
    }

    function hideForm(e){
        if (e.type === "mouseup"){
            if (!form.contains(e.target)){
                document.removeEventListener('mouseup', hideForm);
                document.removeEventListener('keydown', hideForm);
                clearForm();
            }
        }

        else if (e.type === "keydown" && dropdownIsShown == false){
            if (e.key === "Escape"){
                document.removeEventListener('mouseup', hideForm);
                document.removeEventListener('keydown', hideForm);
                clearForm();
            }
        }
    }

    // if any dropdowns are active, this is set to true. it will prevent 'Esc' key from closing the whole form. Rather, it will only close the dropdown
    let dropdownIsShown = false;

    // show and hide priority dropdown
    const priorityBtn = document.querySelector('.priorityBtn');
    const priorityRadios = document.querySelector('.priorityRadios');

    priorityBtn.addEventListener('click', () => {
        dropdownIsShown = true;
        priorityRadios.setAttribute('style', 'display: block');
        document.addEventListener('mouseup', hidePriorityDropdown); 
        document.addEventListener('keydown', hidePriorityDropdown);
    })

    function hidePriorityDropdown(e){
        if (e.type === "mouseup"){
            if (!priorityRadios.contains(e.target)){
                priorityRadios.setAttribute('style', 'display:none');
                document.removeEventListener('mouseup', hidePriorityDropdown);
                document.removeEventListener('keydown', hidePriorityDropdown);
                dropdownIsShown = false;
            }
        }

        else if (e.type === "keydown"){
            if (e.key === "Escape"){
                priorityRadios.setAttribute('style', 'display: none');
                document.removeEventListener('mouseup', hidePriorityDropdown);
                document.removeEventListener('keydown', hidePriorityDropdown);
                dropdownIsShown = false;
            }
        }
    }

    // generates a dropdown list of all projects
    const projectDropdown = document.getElementById('projectDropdown');
    function buildProjectsDropdown(){

        // have default project selected be the current project

        const projectRadios = document.createElement('div');
        projectRadios.classList.add('projectRadios')
        
        function makeRadio(projectName, checked){
            const radio = document.createElement('div');

            const input = document.createElement('input')
            input.setAttribute('type', 'radio')
            input.setAttribute('id', projectName)
            input.setAttribute('name', 'projects')
            if (checked == true){
                input.checked = true;
            }
            
            const label = document.createElement('label')
            label.setAttribute('for', projectName)
            label.textContent = projectName

            radio.appendChild(input)
            radio.appendChild(label)

            projectRadios.appendChild(radio)
        }

        for (const project of projects.values()){
            if (project.name == "Inbox"){
                makeRadio(project.name, true)
            }
            else {
                makeRadio(project.name, false)
            }
        }

        projectDropdown.appendChild(projectRadios);
        return projectRadios;
    }

    // show and hide project dropdown
    const projectBtn = document.querySelector('.projectBtn')
    let projectRadios;
    projectBtn.addEventListener('click', () => {
        if (projectRadios != null){
            projectDropdown.removeChild(projectRadios);
        }
        projectRadios = buildProjectsDropdown();
        dropdownIsShown = true;
        document.addEventListener('mouseup', hideProjectDropdown); 
        document.addEventListener('keydown', hideProjectDropdown);
    })

    function hideProjectDropdown(e){
        if (e.type === "mouseup"){
            if (!projectRadios.contains(e.target)){
                projectRadios.setAttribute('style', 'display: none');
                document.removeEventListener('mouseup', hideProjectDropdown);
                document.removeEventListener('keydown', hideProjectDropdown);
                dropdownIsShown = false;
            }
        }

        else if (e.type === "keydown"){
            if (e.key === "Escape"){
                projectRadios.setAttribute('style', 'display: none');
                projectDropdown.removeChild(projectRadios);
                document.removeEventListener('mouseup', hideProjectDropdown);
                document.removeEventListener('keydown', hideProjectDropdown);
                dropdownIsShown = false;
            }
        }

    }

    // cancel buttons
    const cancelBtn = document.querySelector('.cancelBtn');
    cancelBtn.addEventListener('click', () => {
        clearForm();
    });

    const projectCancelBtn = document.querySelector('.projectCancelBtn');
    projectCancelBtn.addEventListener('click', () => {
        clearProjectForm();
    })


    // project form
    const projectForm = document.querySelector('.project-form');

    function showProjectForm(){
        projectForm.setAttribute('style', 'display:block');
        document.addEventListener('mouseup', hideProjectForm);
        document.addEventListener('keydown', hideProjectForm);
    }

    const projectAdd = document.querySelector('.project-add')
    projectAdd.addEventListener('click', () => {
        showProjectForm();
    })

    const nameInput = document.getElementById('nameInput')
    function clearProjectForm(){
        nameInput.value = "";
        projectForm.setAttribute('style', 'display: none')
    }

    function hideProjectForm(e){
        if (e.type === "mouseup"){
            if (!projectForm.contains(e.target)){
                document.removeEventListener('mouseup', hideProjectForm);
                document.removeEventListener('keydown', hideProjectForm);
                clearProjectForm();
            }
        }

        else if (e.type === "keydown"){
            if (e.key === "Escape"){
                document.removeEventListener('mouseup', hideProjectForm);
                document.removeEventListener('keydown', hideProjectForm);
                clearProjectForm();
            }
        }
    }

    const projectsList = document.querySelector('.projects')
    // adds project to sidebar
    function showProject(project){
        const newProj = document.createElement('li');
        newProj.textContent = project
        projectsList.appendChild(newProj);

        // when project is clicked, show its entries on screen
        newProj.addEventListener('click', () => {
            currentProject = newProj.textContent;
            buildPage(projects.get(currentProject));
        })

    }

    return {showEntry, buildPage, clearForm, clearProjectForm, showProject}

})();


export {displayController}