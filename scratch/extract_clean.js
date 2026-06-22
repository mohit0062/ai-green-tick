const fs = require('fs');

const chunkPath = 'e:/AI GREEN TICK/.next/dev/server/chunks/ssr/components_shadcn-studio_blocks_features-section-14_80810932._.js';
if (fs.existsSync(chunkPath)) {
  const content = fs.readFileSync(chunkPath, 'utf8');
  fs.writeFileSync('e:/AI GREEN TICK/scratch/recovered_chunk.js', content);
  console.log('Saved recovered_chunk.js');
} else {
  console.log('Chunk path does not exist!');
}
