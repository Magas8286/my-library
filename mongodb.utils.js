// createEventListeners
// connect
// disconnect
const mongoose = require('mongoose');

function connect() {
  mongoose.connect('mongodb://localhost/library');
}

function createEventListeners() {
  mongoose.connection.once('connected', () => {
    console.log('Connected!');
  });

  mongoose.connection.on('error', () => {
    console.log('Error connecting to mongodb.")');
  });
}

function disconnect() {
  mongoose.disconnect();
}

module.exports = {
  connect,
  createEventListeners,
  disconnect,
}