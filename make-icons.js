const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function generatePng(width, height, colorRgb) {
  // PNG signature
  const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  // IHDR chunk
  const ihdrBuf = Buffer.alloc(13);
  ihdrBuf.writeUInt32BE(width, 0);
  ihdrBuf.writeUInt32BE(height, 4);
  ihdrBuf[8] = 8; // 8-bit depth
  ihdrBuf[9] = 2; // Truecolor (RGB)
  ihdrBuf[10] = 0; // Compression
  ihdrBuf[11] = 0; // Filter
  ihdrBuf[12] = 0; // Interlace
  const ihdrChunk = createChunk('IHDR', ihdrBuf);

  // Raw image data (Filter byte 0 + RGB for each pixel)
  const rawRowLen = 1 + width * 3;
  const rawData = Buffer.alloc(rawRowLen * height);

  const cx = width / 2;
  const cy = height / 2;
  const maxR = width * 0.45;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rawRowLen;
    rawData[rowOffset] = 0; // None filter
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 3;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxR) {
        // Gradient gem center
        const factor = 1 - (dist / maxR);
        rawData[pxOffset] = Math.min(255, Math.floor(colorRgb[0] * factor + 99 * (1 - factor))); // Red/Purple
        rawData[pxOffset + 1] = Math.min(255, Math.floor(colorRgb[1] * factor + 102 * (1 - factor))); // Green/Blue
        rawData[pxOffset + 2] = Math.min(255, Math.floor(colorRgb[2] * factor + 241 * (1 - factor))); // Blue
      } else {
        // Dark background #0B0F19
        rawData[pxOffset] = 11;
        rawData[pxOffset + 1] = 15;
        rawData[pxOffset + 2] = 25;
      }
    }
  }

  // Compress IDAT
  const compressed = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', compressed);

  // IEND chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(4 + 4 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);

  const crc = crc32(buf.subarray(4, 8 + len));
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

// Simple CRC32 for PNG chunks
function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
    }
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

// Generate icon-192.png and icon-512.png
const dir = __dirname;
fs.writeFileSync(path.join(dir, 'icon-192.png'), generatePng(192, 192, [168, 85, 247]));
fs.writeFileSync(path.join(dir, 'icon-512.png'), generatePng(512, 512, [6, 182, 212]));
console.log('Successfully generated PNG PWA icons!');
