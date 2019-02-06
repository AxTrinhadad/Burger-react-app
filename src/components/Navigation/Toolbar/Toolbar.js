import React from 'react';

import classes from './Toolbar.css';
import Toggle from '../SideDrawer/Toggle/Toggle';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../../assets/images/logo.png';

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}> 
            <Toggle toggleClick={props.toggleSidebar} />
            <div className={classes.Logo}><img src={Logo} /></div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
                
        </header>
    );
}

export default Toolbar;