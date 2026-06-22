const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:\\Users\\mohit\\.gemini\\antigravity\\brain\\96c8aced-2c69-4207-a2ce-19aefe935989\\.system_generated\\logs\\transcript.jsonl'),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.includes('avatarData') && line.includes('src') && line.includes('fallback')) {
    console.log('Found avatarData block:');
    console.log(line.substring(0, 500));
    fs.writeFileSync('e:/AI GREEN TICK/scratch/avatar_data_found.txt', line);
  }
  if (line.includes('notifications') && line.includes('amount') && line.includes('fallback')) {
    console.log('Found notifications block:');
    console.log(line.substring(0, 500));
    fs.writeFileSync('e:/AI GREEN TICK/scratch/notifications_data_found.txt', line);
  }
});
