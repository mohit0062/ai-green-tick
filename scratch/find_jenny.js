const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:\\Users\\mohit\\.gemini\\antigravity\\brain\\96c8aced-2c69-4207-a2ce-19aefe935989\\.system_generated\\logs\\transcript.jsonl'),
  crlfDelay: Infinity
});

let count = 0;
rl.on('line', (line) => {
  if (line.includes('Jenny Wilson')) {
    console.log(`Match ${count}:`);
    const index = line.indexOf('Jenny Wilson');
    console.log(line.substring(Math.max(0, index - 300), index + 800));
    count++;
  }
});
