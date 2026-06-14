const fs = require('fs');
const path = require('path');

const dest = '_site';

// Create _site directory
if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
}

// Copy everything except exclusions
const exclusions = ['.git', '.github', dest, 'build.js'];
const items = fs.readdirSync('.');

for (const item of items) {
    if (exclusions.includes(item)) continue;
    fs.cpSync(item, path.join(dest, item), { recursive: true });
}

console.log('Build complete: securely copied site contents to _site/ directory to satisfy Netlify plugins.');
