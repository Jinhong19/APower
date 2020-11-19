const joinForm = document.getElementById('form-join');

console.log(typeof joinForm)

joinForm.addEventListener("submit", e => {
    e.preventDefault();

    let userId = e.target.elements.userId.value;
    let username = e.target.elements.username.value;
    let room = e.target.elements.room.value;
    let nameSpace = e.target.elements.nameSpace.value;
    
    if(nameSpace == "story"){
        joinForm.action = "/chat.html";
    }
    else if(nameSpace == "audience"){
        joinForm.action = "/audience.html";
    }

    joinForm.submit();
});

