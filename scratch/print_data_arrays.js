const fs = require('fs');

const raw = fs.readFileSync('e:/AI GREEN TICK/scratch/step_393.json', 'utf8');
const data = JSON.parse(raw);
const content = data.content;

// Write content directly to a file
fs.writeFileSync('e:/AI GREEN TICK/scratch/step_393_content.txt', content);
console.log('Saved content to step_393_content.txt!');
