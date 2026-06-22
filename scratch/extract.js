const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:\\Users\\mohit\\.gemini\\antigravity\\brain\\96c8aced-2c69-4207-a2ce-19aefe935989\\.system_generated\\logs\\transcript.jsonl'),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.includes('"step_index":433')) {
    fs.writeFileSync('e:/AI GREEN TICK/scratch/original_file_step.json', line);
    console.log('Successfully extracted step 433!');
    process.exit(0);
  }
});
