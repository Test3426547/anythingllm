// app.js
const { fork } = require('child_process');
const path = require('path');

// Start the server
const serverProcess = fork(path.join(__dirname, 'server', 'index.js'));

serverProcess.on('error', (error) => {
  console.error('Server process error:', error);
});

// Start the collector
const collectorProcess = fork(path.join(__dirname, 'collector', 'index.js'));

collectorProcess.on('error', (error) => {
  console.error('Collector process error:', error);
});

// Handle process termination
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully.');
  serverProcess.kill();
  collectorProcess.kill();
  process.exit(0);
});