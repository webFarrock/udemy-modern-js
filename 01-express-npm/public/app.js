'use strict';

const socket = io();

const chatInput = document.querySelector('.chat-form input[type=text]');

chatInput.addEventListener('keypress', e => {
    if(e.keyCode !== 13)
        return;

    e.preventDefault();

    const text = e.target.value.trim();

    if(text.length === 0)
        return;

    socket.emit('chat:add', {
        message: text,
    });

    e.target.value = '';
});



const chatList = document.querySelector('.chat-list ul');

socket.on('chat:added', data => {
    const messageElement = document.createElement('li');
    messageElement.innerHTML = data.message;
    chatList.appendChild(messageElement);
    chatList.scrollTop = chatList.scrollHeight;
});