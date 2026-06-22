const fs = require('fs');
const raw = fs.readFileSync('e:/AI GREEN TICK/scratch/step_393.json', 'utf8');
const data = JSON.parse(raw);
const content = data.content;
const avatarsIndex = content.indexOf('const avatars =');
if (avatarsIndex !== -1) {
  console.log(content.substring(avatarsIndex, avatarsIndex + 1500));
} else {
  console.log('Not found const avatars =');
}
