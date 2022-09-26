import {project} from '../modules/project';

let projects = new Map();
let currentProject = 'Inbox'

const projectController = (() => {
    function addProject(name){
        projects.set(name, project(name))
    }
    
    return {addProject, currentProject}
    
})();



export {projects, currentProject, projectController}