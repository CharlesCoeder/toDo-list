import {project} from './modules/project';

const prjct = project('test')
prjct.addEntry('soonest, high-priority', 'abc', new Date(2021, 6, 12), 3)
prjct.addEntry("latest, middle-priority", "def", new Date(2025, 6, 12), 2);
prjct.addEntry('middle, low-priority', 'ghi', new Date(2023, 6, 12), 1)

console.log('SORTED BY DATE ADDED')
console.log(JSON.parse(JSON.stringify(prjct.entries)));

console.log('SORTED BY PRIORITY')
prjct.sort('priority')
console.log(JSON.parse(JSON.stringify(prjct.entries)));

console.log('SORTED BY DUE DATE')
prjct.sort('dueDate')
console.log(JSON.parse(JSON.stringify(prjct.entries)));