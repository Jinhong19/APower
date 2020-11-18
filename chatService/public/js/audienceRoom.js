const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const playerMessages = document.querySelector('.player-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const leave = document.getElementById('leave');

// Get username and room from URL
const { userId, username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io('http://localhost:3020/story');

// Join chatroom
socket.emit("joinAsAudience",{audienceRoom:room, username:username, userId:userId});

// Get room and users
socket.on('audienceUserList', message=> {
    console.log(message.userList);
    outputUsers(message.userList);
});

// Message audience from server
socket.on('serverMessage-Audience', message => {
    outputMessage(message);
    if(message.text.charAt(0) == "#"){
        outputActionMessage(message);
    }

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message player from server
socket.on('serverMessage-Story', message => {
    outputPlayerMessage(message);
    // Scroll down
    playerMessages.scrollTop = playerMessages.scrollHeight;
});

// Welcome from server
socket.on('welcome-Audience', (msg) =>{
    console.log(msg);
    outputMessage(msg);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Error from server
socket.on('Error', (msg) =>{
    console.log(msg);
    outputMessage(msg);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// new user from server
socket.on('audienceNewUser', (msg) =>{
    console.log(msg);
    outputMessage(msg);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// disconnect audience 
socket.on('disconnectUser-Audience', (msg) =>{
    console.log("avvvvvvv");
    outputMessage(msg);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// player chat history
socket.on('chatHistory', (message) =>{
    for(var i in message.history){
        outputPlayerMessage({username:message.history[i].username, time:message.history[i].time,text:message.history[i].message});
    }
    playerMessages.scrollTop = playerMessages.scrollHeight;
});

leave.addEventListener("submit", e => {
    e.preventDefault();
    console.log("aaaaaaaaaaaaaaaaaaa");

    socket.emit('disconnect-Audience',{audienceRoom:room,username:username,userId:userId});
    leave.action = "/index.html";

    leave.submit();
})

// Message submit
chatForm.addEventListener('submit', e => {
    e.preventDefault();

    // Get message text
    let msg = e.target.elements.msg.value;
    
    msg = msg.trim();
    
    if (!msg){
        return false;
    }
    console.log(msg);
    // sent message to server
    socket.emit('clientMessage-Audience', {audienceRoom:room,username:username,message:msg});

    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

// Output chat message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.username;
    p.innerHTML += `<span>  ${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
}

// Output player message to DOM
function outputPlayerMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.username;
    p.innerHTML += `<span>  ${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);
    document.querySelector('.player-messages').appendChild(div);
}


// Add users to DOM
function outputUsers(users) {
    userList.innerHTML = '';
    users.forEach(user=>{
        const li = document.createElement('li');
        li.innerText = user;
        userList.appendChild(li);
    });
}