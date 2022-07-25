import {project} from './modules/project';
import {displayController} from './modules/displayController';

const defaultProject = project('Inbox')
defaultProject.addEntry('soonest, high-priority', 'abc', new Date(2021, 6, 12), 3)
defaultProject.addEntry("latest, middle-priority", "def", new Date(2025, 6, 12), 2);
defaultProject.addEntry('middle, low-priority', 'ghi', new Date(2023, 6, 12), 1)

// displayController.buildPage(defaultProject.entries)