import React from 'react';

export default (props) => {

    return (<div className="mainPopupOverlay">
        <div className="popUpMainContainer">
            {props.resp}
        </div>
    </div>
    )
}