import {projects} from "../modules/projectController"

const displayController = (() => {
    const container = document.querySelector('.entries')

    const buildPage = function(project){
        for (const entry of project.entries){
            showEntry(entry);
        }
    }

    const showEntry = function(listEntry){
        const entry = document.createElement('div')
        entry.classList.add('entry')

        const title = document.createElement('div')
        const dueDate = document.createElement('div')
        const description = document.createElement('div')
        
        title.classList.add('title')
        dueDate.classList.add('dueDate')
        description.classList.add('description')
        
        const checkbox = document.createElement('button')
        checkbox.classList.add('checkbox')
        checkbox.setAttribute('type', 'button')

        title.textContent = listEntry.title
        dueDate.textContent = listEntry.dueDate
        description.textContent = listEntry.description

        entry.appendChild(title)
        entry.appendChild(description)
        entry.appendChild(dueDate)
        entry.appendChild(checkbox)

        const line = document.createElement('hr')
        entry.appendChild(line)

        container.appendChild(entry)
    }

    // show and hide form
    const form = document.querySelector('.form');

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
        form.setAttribute('style', 'display: none')

        // figure out how to reset the project dropdown menu
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

    }

    // show and hide project dropdown
    const projectBtn = document.querySelector('.projectBtn')
    buildProjectsDropdown();
    const projectRadios = document.querySelector('.projectRadios')

    projectBtn.addEventListener('click', () => {
        projectRadios.setAttribute('style', 'display: block')
        dropdownIsShown = true;
        document.addEventListener('mouseup', hideProjectDropdown); 
        document.addEventListener('keydown', hideProjectDropdown);
    })

    function hideProjectDropdown(e){
        if (e.type === "mouseup"){
            if (!projectRadios.contains(e.target)){
                projectRadios.setAttribute('style', 'display:none');
                document.removeEventListener('mouseup', hideProjectDropdown);
                document.removeEventListener('keydown', hideProjectDropdown);
                dropdownIsShown = false;
            }
        }

        else if (e.type === "keydown"){
            if (e.key === "Escape"){
                projectRadios.setAttribute('style', 'display: none');
                document.removeEventListener('mouseup', hideProjectDropdown);
                document.removeEventListener('keydown', hideProjectDropdown);
                dropdownIsShown = false;
            }
        }

    }

    // cancel and finish button functionality
    const cancelBtn = document.querySelector('.cancelBtn');
    cancelBtn.addEventListener('click', () => {
        clearForm();
    });

    return {showEntry, buildPage, clearForm}

})();


export {displayController}