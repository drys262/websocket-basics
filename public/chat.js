// make connection
const socket = io.connect('http://localhost:4000');

// query DOM
const message = document.getElementById('message'),
  handle = document.getElementById('handle'),
  btn = document.getElementById('send'),
  output = document.getElementById('output'),
  feedback = document.getElementById('feedback');

// emit events
btn.addEventListener('click', function() {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
});

// listen for events
socket.on('chat', function(data) {
  feedback.innerHTML = '';
  output.innerHTML +=
    '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

message.addEventListener('keypress', function() {
  socket.emit('typing', handle.value);
});

socket.on('typing', function(handle) {
  feedback.innerHTML = '<p><em>' + handle + ' is typing a message..</em><p/>';
});
