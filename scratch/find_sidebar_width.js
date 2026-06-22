const fs = require('fs');
const zlib = require('zlib');

function findSidebarWidth(filePath) {
  const buffer = fs.readFileSync(filePath);
  const width = buffer.readInt32BE(16);
  const height = buffer.readInt32BE(20);
  const colorType = buffer[25];
  
  let pos = 33;
  let idatBuffers = [];
  while (pos < buffer.length) {
    const length = buffer.readInt32BE(pos);
    const type = buffer.toString('ascii', pos + 4, pos + 8);
    if (type === 'IDAT') {
      idatBuffers.push(buffer.subarray(pos + 8, pos + 8 + length));
    }
    pos += 12 + length;
  }
  
  const idatBuffer = Buffer.concat(idatBuffers);
  const decompressed = zlib.inflateSync(idatBuffer);
  
  const bytesPerPixel = colorType === 6 ? 4 : 3;
  const scanlineLength = 1 + width * bytesPerPixel;
  
  const reconstructed = Buffer.alloc(width * height * bytesPerPixel);
  
  // Only defilter the first 400 rows to keep it fast
  const maxRows = Math.min(height, 400);
  
  for (let y = 0; y < maxRows; y++) {
    const rowStart = y * scanlineLength;
    const filterType = decompressed[rowStart];
    const scanline = decompressed.subarray(rowStart + 1, rowStart + scanlineLength);
    
    for (let x = 0; x < width; x++) {
      const destOffset = (y * width + x) * bytesPerPixel;
      const srcOffset = x * bytesPerPixel;
      
      for (let c = 0; c < bytesPerPixel; c++) {
        const rawByte = scanline[srcOffset + c];
        let left = 0;
        let up = 0;
        let upLeft = 0;
        
        if (x > 0) {
          left = reconstructed[destOffset - bytesPerPixel + c];
        }
        if (y > 0) {
          up = reconstructed[destOffset - width * bytesPerPixel + c];
        }
        if (x > 0 && y > 0) {
          upLeft = reconstructed[destOffset - (width + 1) * bytesPerPixel + c];
        }
        
        let reconstructedByte = 0;
        if (filterType === 0) {
          reconstructedByte = rawByte;
        } else if (filterType === 1) {
          reconstructedByte = (rawByte + left) & 0xFF;
        } else if (filterType === 2) {
          reconstructedByte = (rawByte + up) & 0xFF;
        } else if (filterType === 3) {
          reconstructedByte = (rawByte + Math.floor((left + up) / 2)) & 0xFF;
        } else if (filterType === 4) {
          const p = left + up - upLeft;
          const pa = Math.abs(p - left);
          const pb = Math.abs(p - up);
          const pc = Math.abs(p - upLeft);
          let nearest = 0;
          if (pa <= pb && pa <= pc) {
            nearest = left;
          } else if (pb <= pc) {
            nearest = up;
          } else {
            nearest = upLeft;
          }
          reconstructedByte = (rawByte + nearest) & 0xFF;
        }
        
        reconstructed[destOffset + c] = reconstructedByte;
      }
    }
  }
  
  // Analyze a row where the sidebar is active, e.g., y = 300
  const targetY = 300;
  console.log(`\nReconstructed Colors at y = ${targetY}:`);
  for (let x = 0; x <= 300; x += 10) {
    const o = (targetY * width + x) * bytesPerPixel;
    console.log(`x=${x}: (${reconstructed[o]}, ${reconstructed[o+1]}, ${reconstructed[o+2]})`);
  }
  
  // Find where the dark green background ends
  // Dark green has R, G, B values around (30-50, 75-110, 50-70)
  // Let's find where G starts to be low and R, G, B become high (white background)
  let transitionX = 0;
  for (let x = 0; x < width; x++) {
    const o = (targetY * width + x) * bytesPerPixel;
    const r = reconstructed[o];
    const g = reconstructed[o + 1];
    const b = reconstructed[o + 2];
    
    // Check for light background: R, G, B all > 230
    if (r > 200 && g > 200 && b > 200) {
      transitionX = x;
      break;
    }
  }
  
  console.log(`\nTransition to light background found at x = ${transitionX}`);
  console.log(`Percentage width of sidebar: ${(transitionX / width * 100).toFixed(4)}%`);
}

findSidebarWidth('E:/AI GREEN TICK/public/screencapture-ai-greentick-dashboard-vercel-app-inbox-2026-06-18-19_15_57.png');
