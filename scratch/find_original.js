const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:\\Users\\mohit\\.gemini\\antigravity\\brain\\96c8aced-2c69-4207-a2ce-19aefe935989\\.system_generated\\logs\\transcript.jsonl'),
  crlfDelay: Infinity
});

let count = 0;
rl.on('line', (line) => {
  if (line.includes('features-section-14.tsx')) {
    // Let's write the matching line to a temporary file
    fs.writeFileSync(`e:/AI GREEN TICK/scratch/match_${count}.json`, line);
    console.log(`Saved match_${count}.json`);
    count++;
  }
});
