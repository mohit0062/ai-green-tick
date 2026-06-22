const fs = require('fs');
const path = require('path');

function searchDir(dir, query) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      searchDir(fullPath, query);
    } else if (file.endsWith('.js') || file.endsWith('.json') || file.endsWith('.html') || file.endsWith('.txt')) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes(query) && !fullPath.includes('recovered_block.txt')) {
          console.log(`Found ${query} in: ${fullPath}`);
          fs.writeFileSync('e:/AI GREEN TICK/scratch/recovered_block.txt', content);
        }
      } catch (e) {}
    }
  }
}

searchDir('e:/AI GREEN TICK/.next', 'NotificationStack');
