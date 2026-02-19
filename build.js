const fs = require('fs');
const { marked } = require('marked');

// Read the markdown content
const markdown = fs.readFileSync('content.md', 'utf8');

// Configure marked
marked.setOptions({
    breaks: true,
    gfm: true
});

// Convert markdown to HTML
const lines = markdown.split('\n');
let startIndex = 0;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('# ABOUT THE AUTHOR')) {
        startIndex = i;
        break;
    }
}
const cleanedMarkdown = lines.slice(startIndex).join('\n');
const contentHtml = marked.parse(cleanedMarkdown);

// Read template and inject content
const template = fs.readFileSync('template.html', 'utf8');
const finalHtml = template.replace('<!-- CONTENT_PLACEHOLDER -->', contentHtml);

// Write output
fs.writeFileSync('index.html', finalHtml);
console.log('Build complete: index.html generated');
