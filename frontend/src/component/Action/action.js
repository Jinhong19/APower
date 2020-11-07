import React from 'react';
import './action.css';

import ScrollToBottom from 'react-scroll-to-bottom';

const Action =({actions}) => (
    <div className="actionContainer">
        <label className="actionLabel">Player Action</label>
        <div className="userActionList">
            <ScrollToBottom className="userActionScroll" >
                {actions.map((action, i) => <div key={i}>
                                                <p className="action">{action.username} : {action.action}</p>
                                            </div>)
                }
            </ScrollToBottom>
        </div>
    </div>
)

export default Action;