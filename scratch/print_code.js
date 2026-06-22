const fs = require('fs');

const code = fs.readFileSync('e:/AI GREEN TICK/scratch/recovered_chunk.js', 'utf8');
const searchString = 'const Features =';
const index = code.indexOf(searchString);

if (index !== -1) {
  console.log('Found it!');
  const chunkOfCode = code.substring(index); // Get the rest of the file
  fs.writeFileSync('e:/AI GREEN TICK/scratch/extracted_features.js', chunkOfCode);
} else {
  console.log('Not found const Features =');
}
