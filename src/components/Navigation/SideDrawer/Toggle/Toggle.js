import React from 'react';
import classes from './Toggle.css';

const Toggle = (props) => {
    let attachedClasses = [classes.Menu, classes.DrawerToggle];

    return (
        <div className={attachedClasses.join(' ')} onClick={props.toggleClick}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default Toggle;