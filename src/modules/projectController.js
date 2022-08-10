import {project} from '../modules/project';

let projects = new Map();
let currentProject = 'Inbox'

const projectController = (() => {
    function addProject(name){
        projects.set(name, project(name))
        console.log(projects)
    }
    
    projects.set('Inbox', project('Inbox'))
    addProject('Chores')
    addProject('Test')
    
    projects.get('Inbox').addEntry('soonest, high-priority', 'abc', new Date(2021, 6, 12), 3);
    projects.get('Inbox').addEntry("latest, middle-priority", "def", new Date(2025, 6, 12), 2);
    projects.get('Inbox').addEntry('middle, low-priority', 'ghi', new Date(2023, 6, 12), 1)

    return {addProject, currentProject}
    
})();



export {projects, currentProject, projectController}