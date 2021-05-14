import React from 'react';

const Loadingbar = (props) => {
    return (
        <div className = "ui active dimmer whiter">
            <div className = "ui big text loader">{props.text}</div>
        </div>
    );
};

Loadingbar.defaultProps = {
    text: "Loading..."
};

export default Loadingbar;