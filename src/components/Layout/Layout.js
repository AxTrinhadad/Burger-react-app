import React from 'react';

import classes from './Layout.css';

const layout = (props) => (
    <>
        <div className={[classes.Content, classes.Navigation].join(" ")}>
            Toolbar, SideDrawer, Backdrop
        </div>
        <main className={classes.Content}>
            {props.children}    
        </main>    
    </>
);

export default layout;