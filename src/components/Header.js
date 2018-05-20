import React, {Component} from 'react';

//material ui
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
//router
import {Link } from 'react-router-dom';
//components
import AccountIcon from './AccountIcon';

class Header extends Component {
    sidebar={
        textDecoration: "none",
        fontFamily:" Times New Roman",
        fontSize:"20px",
        
    }
constructor(props)
    {
        super(props);
        this.state={
            siderbarOpen:false,
            email: ''
        }
    }

    render(){
        return(
            <div>
                <AppBar
                title="Rebrandly" 
                iconElementRight={ <AccountIcon email={ this.state.email } />}
                onLeftIconButtonClick={
                    () => this.toggleSidebar() }
                />
                <Drawer
                open={this.state.sidebarOpen}
                docked={false}
                
                onRequestChange={() => this.toggleSidebar()}
                >
                    <MenuItem><Link to="/board" style={this.sidebar} >Home</Link></MenuItem>
                    <MenuItem><Link to="/link" style={this.sidebar}>Link</Link></MenuItem>
                    <MenuItem><Link to="/clink" style={this.sidebar}>Create Link</Link></MenuItem>
                </Drawer>
            </div>
        );
    }

toggleSidebar(){
    this.setState({sidebarOpen: !this.state.sidebarOpen})
}

    componentWillMount() {
        this.setState({
        email: sessionStorage.getItem('email')
    })
    }

}
export default Header