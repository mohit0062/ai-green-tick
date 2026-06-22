const fs = require('fs');

for (let i = 0; i < 53; i++) {
  try {
    const raw = fs.readFileSync(`e:/AI GREEN TICK/scratch/match_${i}.json`, 'utf8');
    const data = JSON.parse(raw);
    
    // We are looking for a log where the original file was read.
    // In our first check, let's print the step_index, type, and status of each match.
    if (data.type === 'VIEW_FILE' && data.status === 'DONE') {
      const content = data.content;
      if (content && content.includes("1: 'use client'") && content.includes("AnimatedBeam")) {
        console.log(`Match ${i} (Step ${data.step_index}) is a candidate! Length: ${content.length}`);
        
        // Let's write the candidate content to a separate file to inspect it
        fs.writeFileSync(`e:/AI GREEN TICK/scratch/candidate_${i}.txt`, content);
      }
    }
  } catch (e) {
    console.error(`Error parsing match_${i}.json:`, e.message);
  }
}
