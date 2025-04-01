const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Clean dist directory
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  fs.rmSync(distPath, { recursive: true });
}

// Create dist directory
fs.mkdirSync(distPath, { recursive: true });

try {
  // Run TypeScript compilation
  execSync('npx tsc --skipLibCheck', { stdio: 'inherit' });
  console.log('Build completed successfully');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} 