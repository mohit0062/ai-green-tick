const fs = require('fs');

function getPngDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  // PNG signature is 8 bytes. IHDR starts at byte 12.
  // Width is 4 bytes starting at byte 16. Height is 4 bytes starting at byte 20.
  const width = buffer.readInt32BE(16);
  const height = buffer.readInt32BE(20);
  return { width, height };
}

console.log('Inbox PNG:', getPngDimensions('E:/AI GREEN TICK/public/screencapture-ai-greentick-dashboard-vercel-app-inbox-2026-06-18-19_15_57.png'));
console.log('Analytics PNG:', getPngDimensions('E:/AI GREEN TICK/public/analetis.png'));
