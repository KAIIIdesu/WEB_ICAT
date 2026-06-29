const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 3000;

// Read logo.jpg
const logoPath = path.join(__dirname, 'logo.jpg');
if (!fs.existsSync(logoPath)) {
  console.error("Error: logo.jpg not found in workspace.");
  process.exit(1);
}

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Logo Converter</title>
      </head>
      <body>
        <h3>Converting logo...</h3>
        <script>
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imgData.data;
            const width = canvas.width;
            const height = canvas.height;
            
            // BFS flood fill
            const visited = new Uint8Array(width * height);
            const queue = [];
            
            // Corners
            const corners = [
              [0, 0],
              [0, height - 1],
              [width - 1, 0],
              [width - 1, height - 1]
            ];
            
            function getPixelIndex(x, y) {
              return (y * width + x) * 4;
            }
            
            function isWhite(x, y) {
              const idx = getPixelIndex(x, y);
              // R, G, B > 240 is considered white
              return data[idx] > 240 && data[idx+1] > 240 && data[idx+2] > 240;
            }
            
            for (const [cx, cy] of corners) {
              if (isWhite(cx, cy)) {
                const idx = cy * width + cx;
                queue.push([cx, cy]);
                visited[idx] = 1;
              }
            }
            
            while (queue.length > 0) {
              const [x, y] = queue.shift();
              
              // Check 4 neighbors
              const neighbors = [
                [x - 1, y],
                [x + 1, y],
                [x, y - 1],
                [x, y + 1]
              ];
              
              for (const [nx, ny] of neighbors) {
                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                  const idx = ny * width + nx;
                  if (!visited[idx]) {
                    visited[idx] = 1;
                    if (isWhite(nx, ny)) {
                      queue.push([nx, ny]);
                    }
                  }
                }
              }
            }
            
            // Set background transparent
            for (let y = 0; y < height; y++) {
              for (let x = 0; x < width; x++) {
                const idx = y * width + x;
                if (visited[idx]) {
                  const pIdx = idx * 4;
                  data[pIdx + 3] = 0; // alpha = 0
                }
              }
            }
            
            ctx.putImageData(imgData, 0, 0);
            
            // Crop canvas to bounding box
            let minX = width, minY = height, maxX = 0, maxY = 0;
            let hasPixels = false;
            for (let y = 0; y < height; y++) {
              for (let x = 0; x < width; x++) {
                const pIdx = (y * width + x) * 4;
                if (data[pIdx + 3] > 0) {
                  if (x < minX) minX = x;
                  if (x > maxX) maxX = x;
                  if (y < minY) minY = y;
                  if (y > maxY) maxY = y;
                  hasPixels = true;
                }
              }
            }
            
            let finalCanvas = canvas;
            if (hasPixels) {
              const pad = 4;
              minX = Math.max(0, minX - pad);
              minY = Math.max(0, minY - pad);
              maxX = Math.min(width - 1, maxX + pad);
              maxY = Math.min(height - 1, maxY + pad);
              
              const cropWidth = maxX - minX + 1;
              const cropHeight = maxY - minY + 1;
              
              finalCanvas = document.createElement('canvas');
              finalCanvas.width = cropWidth;
              finalCanvas.height = cropHeight;
              const finalCtx = finalCanvas.getContext('2d');
              finalCtx.drawImage(canvas, minX, minY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
            }
            
            const pngData = finalCanvas.toDataURL("image/png");
            
            fetch("/upload", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ image: pngData })
            })
            .then(res => res.text())
            .then(txt => {
              document.body.innerHTML = "<h1>Logo processed successfully! Check your workspace folder.</h1>";
              console.log("Success:", txt);
            })
            .catch(err => {
              document.body.innerHTML = "<h1>Error: " + err.message + "</h1>";
            });
          };
          img.src = "/logo.jpg";
        </script>
      </body>
      </html>
    `);
  } else if (req.url === '/logo.jpg' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    fs.createReadStream(logoPath).pipe(res);
  } else if (req.url === '/upload' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const base64Data = payload.image.replace(/^data:image\/png;base64,/, "");
        const outputLogoPath = path.join(__dirname, 'logo.png');
        
        fs.writeFileSync(outputLogoPath, base64Data, 'base64');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("logo.png saved successfully");
        
        console.log("logo.png saved. Shutting down conversion server...");
        // Terminate server after short delay so response completes
        setTimeout(() => {
          server.close(() => {
            process.exit(0);
          });
        }, 500);
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end("Error processing upload: " + err.message);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end("Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Conversion server started at http://localhost:${PORT}`);
  console.log("Opening browser to complete conversion...");
  
  // Launch standard browser using system command
  const url = `http://localhost:${PORT}/`;
  if (process.platform === 'win32') {
    exec(`start ${url}`);
  } else if (process.platform === 'darwin') {
    exec(`open ${url}`);
  } else {
    exec(`xdg-open ${url}`);
  }
});
