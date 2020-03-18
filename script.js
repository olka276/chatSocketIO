const socket = io('http://localhost:4001')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('message-container')
const name = prompt('Type your username.')
appendMessage('You joined.')
socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`);
})

socket.on('user-connected', name => {
    appendMessage(`${name} has joined the chat`);
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} has left the chat`);
})

messageForm.addEventListener('submit', e=> {
    e.preventDefault();
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message
    messageContainer.append(messageElement);
}