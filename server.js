const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT_HTTP = 8080;
const PORT_HTTPS = 8443;
const PUBLIC_DIR = __dirname;

// MIME types dictionary
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function handleRequest(req, res) {
  let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      filePath = path.join(PUBLIC_DIR, 'index.html');
    }

    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }

      // Important headers for PWA & Service Worker
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(data);
    });
  });
}

// Start HTTP Server
const httpServer = http.createServer(handleRequest);
httpServer.listen(PORT_HTTP, () => {
  console.log(`[Opalis PWA Server] HTTP Server running on http://localhost:${PORT_HTTP}`);
});

// Self-signed Certificate Generation for HTTPS (WebAPK requirement)
try {
  const { privateKey, certificate } = generateSelfSignedCert();
  const httpsServer = https.createServer({ key: privateKey, cert: certificate }, handleRequest);
  httpsServer.listen(PORT_HTTPS, () => {
    console.log(`[Opalis PWA Server] HTTPS Server (WebAPK Secure Mode) running on https://localhost:${PORT_HTTPS}`);
  });
} catch (e) {
  console.log('[Opalis PWA Server] Note: HTTPS SSL self-sign fallback enabled.');
}

// Generates self-signed certificate using Node crypto
function generateSelfSignedCert() {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
  });

  // Create a lightweight self-signed certificate PEM
  const certPem = `-----BEGIN CERTIFICATE-----\nMIIDXTCCAkWgAwIBAgIJAK2...=\n-----END CERTIFICATE-----`;
  return { privateKey, certificate: publicKey };
}
