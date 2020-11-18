const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const actionMessages = document.querySelector('.action-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const leave = document.getElementById('leave');

// Get username and room from URL
const { userId, username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io('http://localhost:3020/story');

// Join chatroom
socket.emit("joinAsPlayer",{storyRoom:room, username:username, userId:userId});

// Get room and users
/*socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});*/

// Message from server
socket.on('serverMessage-Story', message => {
    outputMessage(message);
    if(message.text.charAt(0) == "#"){
        outputActionMessage(message);
    }

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Action History from server
socket.on('actionHistory', message => {
    for(var i in message.history){
        if(message.history[i].message.charAt(0) == "#"){
            outputActionMessage({username:message.history[i].username, text:message.history[i].message});
        }
    }
    //outputActionMessage(message);
})

// Welcome from server
socket.on('welcome', (msg) =>{
    outputMessage(msg);
    outputUsers(msg.users);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Error from server
socket.on('Error', (msg) =>{
    outputMessage(msg);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// new user from server
socket.on('newUser', (msg) =>{
    outputMessage(msg);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// disconnect user 
socket.on('disconnectUser', (msg) =>{
    outputMessage(msg);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// story from server
socket.on('story', (msg) => {
    console.log(msg);

    outputMessage({username:msg.username,time:msg.time,text:msg.story.storyName});
    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
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
    if(msg.charAt(0) == "." && msg.charAt(1) == "d") {
        // request a dice roll 
        socket.emit('roll', {storyRoom:room,username:username});
    }
    else if(msg == ".story"){
        socket.emit('getStory', {room:room});
    }
    // sent message to server
    socket.emit('clientMessage-Story', {storyRoom:room,username:username,message:msg});

    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

leave.addEventListener("submit", e => {
    e.preventDefault();

    socket.emit('disconnect-Story',{storyRoom:room,username:username,});
    leave.action = "/index.html";

    leave.submit();
})

// Output chat message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.username;
    if(message.username == username){
        p.style.color = "blue";
    }
    else{
        p.style.color = "#132513";
    }
    p.innerHTML += `<span>  ${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
}

// Output action message to DOM
function outputActionMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.username;
    if(message.username == username){
        p.style.color = "blue";
    }
    //p.innerHTML += `<span>${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);
    console.log("skr");
    document.querySelector('.action-messages').appendChild(div);
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