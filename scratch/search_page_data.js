const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:\\Users\\mohit\\.gemini\\antigravity\\brain\\96c8aced-2c69-4207-a2ce-19aefe935989\\.system_generated\\logs\\transcript.jsonl'),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.includes('const notifications') || line.includes('const avatarData') || line.includes('avatarData =') || line.includes('notifications =')) {
    console.log('Found line:');
    console.log(line.substring(0, 800));
  }
});
