import './audience.css';
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

import InfoBar from "../component/InfoBar/infoBar";
import Input from "../component/Input/input";
import Messages from "../component/Messages/messages";
import UserList from "../component/UserList/userList";
import { computeHeadingLevel } from '@testing-library/react';

const ENDPOINT = "http://localhost:3003/audience";
let socket;


function Audience() {
    const room = "123";
    const username = "giao";
    const [rooms, setRoom] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        socket = socketIOClient(ENDPOINT);
        console.log(`Connecting socket...`);
        socket.emit("joinRoom",{audienceRoom:room, username:username});

        setRoom(room);
        setName(username);

        return() => {
            socket.emit('disconnect', {audienceRoom:room, username:username});
            console.log("asdasdasdddddddddddd");
        }
    },[ENDPOINT]);

    useEffect(() => {

        socket.on('serverMessage', (msg) =>{
            setMessages(messages => [ ...messages, msg ]);
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

            console.log(userList);
        });

        socket.on('error', (msg) =>{
            console.log(msg);
        })
    },[]);

    const sendMessage = (event) => {
        event.preventDefault();
        if(message) {
            socket.emit('clientMessage', {audienceRoom:room,username:username,message:message});
            //setMessages(messages => [...messages, {username:username,time:"time",message:message}]);
            setMessage("");
        }
    }

    return(
        <div className="outerContainer">
            <InfoBar className="inforBar"/>
            <div className="innerContainer">
                <div className="leftContainer">
                    <Messages className messages={messages} name={name} />
                </div>

                <div className="rightContainer">
                    <UserList classname userList={userList} />
                </div>
            </div>
            <Input className="input" message={message} setMessage={setMessage} sendMessage={sendMessage}/>
        </div>
    )
};

export default Audience;