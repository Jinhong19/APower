import './player.css';
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

import InfoBar from "../component/InfoBar/infoBar";
import Input from "../component/Input/input";
import Messages from "../component/Messages/messages";
import UserList from "../component/UserList/userList";
import Action from "../component/Action/action";

const ENDPOINT = "http://localhost:3003/story";
let socket;


function Audience() {
    const room = "GdHYsOMi0hChMS76EYkc";
    const username = "giao";
    const [rooms, setRoom] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [actions, setActions] = useState([]);
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        socket = socketIOClient(ENDPOINT);
        console.log(`Connecting socket...`);
        socket.emit("joinRoom",{storyRoom:room, username:username});

        setRoom(room);
        setName(username);

        return() => {
            socket.emit('disconnect', {storyRoom:room, username:username});
        }
    },[ENDPOINT]);

    useEffect(() => {

        socket.on('serverMessage', (msg) =>{
            setMessages(messages => [ ...messages, msg ]);

            if(typeof msg.message != 'number'){
                if(msg.message.charAt(0) == '#'){
                    setActions(actions => [ ...actions, {username:msg.username,action:msg.message.slice(1)} ]);
                }
            }
            else{
                setActions(actions => [ ...actions, {username:msg.username,action:msg.message} ]); 
            }
        })

        socket.on('welcome', (msg) =>{
            setMessages(messages => [ ...messages, msg ]);
            
            if(!userList.includes(msg.username) && !msg.username == "bot"){
                setUserList(userList => [ ...userList, msg.username ]);
            }
          });

        socket.on('newUser', (msg) =>{
            setMessages(messages => [ ...messages, msg ]);
            
            if(!userList.includes(msg.username && !msg.username == "bot")){
                setUserList(userList => [ ...userList, msg.username ]);
            }
        });
    },[]);

    const sendMessage = (event) => {
        event.preventDefault();
        if(message.charAt(0) == "." && message.charAt(1) == "d") {
            socket.emit('roll', {storyRoom:room,username:username});
            //setMessages(messages => [...messages, {username:username,time:"time",message:message}]);
            setMessage("");
        }
        else{
            socket.emit('clientMessage', {storyRoom:room,username:username,message:message});
            //setMessages(messages => [...messages, {username:username,time:"time",message:message}]);
            setMessage("");
        }
    }

    return(
        <div className="outerContainer">
            <InfoBar className="inforBar"/>
            <div className="innerContainer">
                <div className="leftContainer">
                    <Action actions={actions}/>
                </div>

                <div className="middleContainer">
                    <Messages  messages={messages} name={name} />
                    <Input className="input" message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                </div>

                <div className="rightContainer">
                    <UserList  userList={userList} />
                </div>
            </div>
        </div>
    )
};

export default Audience;