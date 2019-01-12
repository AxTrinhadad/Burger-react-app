import React from 'react';

import classes from './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems'
import Logo from '../../../assets/images/logo.png';

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}> 
            <div className={classes.Menu} onClick={props.openSidebar}>Menu</div>
            <div className={classes.Logo}><img src={Logo} /></div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
                
        </header>
    );
}

export default Toolbar;