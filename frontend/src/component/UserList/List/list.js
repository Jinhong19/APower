import React from 'react';
import './list.css';

const List =(user) => {
    console.log("in");
    console.log(user);
    return (
        <div className="userList">
            <ul>
               <li  className="user"> {user.user}</li>
            </ul>   
        </div>
    );
}

export default List;