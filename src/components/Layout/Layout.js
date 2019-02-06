import React, {Component} from 'react';

import classes from './Layout.css';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = { 
        showSideDrawer: false
    }
    
    sideDrawerOpenHandler = () => {
        this.setState({showSideDrawer: true});
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    render () {
        return (
            <>
                <Toolbar openSidebar={this.sideDrawerOpenHandler} />
                <SideDrawer show={this.state.showSideDrawer} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}    
                </main> 
            </>
        );
    }
}

export default Layout;