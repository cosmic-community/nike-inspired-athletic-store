const fs = require('fs');
const path = require('path');
const glob = require('glob');

function injectConsoleCapture() {
  const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
  
  // Find all HTML files in the build output
  const htmlFiles = glob.sync('out/**/*.html', { cwd: process.cwd() });
  
  htmlFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if script is already injected
    if (content.includes(scriptTag)) {
      return;
    }
    
    // Inject script tag before closing </head> tag
    content = content.replace('</head>', `  ${scriptTag}\n</head>`);
    
    fs.writeFileSync(filePath, content);
    console.log(`Console capture script injected into ${file}`);
  });
}

injectConsoleCapture();