import React from 'react';
import './infoBar.css';

import closeIcon from "../../icon/closeIcon.png";

const InfoBar =() => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <h3 className="web-name">Script World</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/"><img src={closeIcon} alt="close image"/></a>
        </div>
    </div>
)

export default InfoBar;