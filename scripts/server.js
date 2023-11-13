const express = require('express');
const path = require('path');

// Create an express app
const app = express();

// cwd
const ROOT = process.cwd();

// Define a route to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(ROOT, 'index.html'));
});

// Serve other static files (e.g., JS, CSS) from the current directory
app.use(express.static(ROOT));

// Listen on port 8189
const port = 8189;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
