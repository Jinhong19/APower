import React, { useState, useEffect, useHistory } from "react";
import { render, screen } from '@testing-library/react';

import Player from '../PlayerChat/player';


function Join() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");

    return (
        <div className="Join">
            <form>
                <label>username</label>
                <input 
                    type="text" 
                    name="username"
                    onChange={(event) => setUsername(event.target.value)}
                    required
                    placeholder="Enter your username"
                    >
                </input>
                
            </form>
            <form>
                <label>Room</label>
                <input 
                    type="text" 
                    name="room"
                    onChange={(event) => setRoom(event.target.value)}
                    required
                    placeholder="Enter a room name"
                    >
                    </input>
            </form>

            <button className="join" onClick={(event) => console.log("aaaaaaaaaaaa")}>join</button>
        </div>
    );
}

export default Join;