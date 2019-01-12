import React from 'react';

import classes from './SideDrawer.css';
import NavigationItems from '../NavigationItems/NavigationItems'
import Logo from '../../../assets/images/logo.png';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];

    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <>
            <Backdrop show={props.show} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}> 
                <div className={classes.Logo}><img src={Logo} /></div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </>
    );
}

export default SideDrawer;