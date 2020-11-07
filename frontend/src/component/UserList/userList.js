import React from 'react';
import './userList.css';

import ScrollToBottom from 'react-scroll-to-bottom';
import List from './List/list'

const UserList =({userList}) => {
    return(
    <ScrollToBottom className="userList">
        {userList.map((user, i) => <div key={i}><List user={user}/></div>)}
    </ScrollToBottom>)
}

export default UserList;