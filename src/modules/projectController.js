import {project} from '../modules/project';

let projects = [];

const defaultProject = project('Inbox')
projects.push(defaultProject);

const chores = project('Chores')
projects.push(chores)

defaultProject.addEntry('soonest, high-priority', 'abc', new Date(2021, 6, 12), 3)
defaultProject.addEntry("latest, middle-priority", "def", new Date(2025, 6, 12), 2);
defaultProject.addEntry('middle, low-priority', 'ghi', new Date(2023, 6, 12), 1)

export {projects}