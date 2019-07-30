import React, { Component } from 'react';

import { NavItem, NavLink } from "reactstrap";

import { withRouter, Link } from "react-router-dom";

import * as auth from '../services/auth';

class LogoutButton extends Component {
    onClickSair = () => {
        auth.logout();
        this.props.history.push('/login');
    }

    render() {
        if (!auth.isAuthenticated()) {
            return '';
        }

        return (
            <NavItem>
                <NavLink>
                    <Link className="text-warning" onClick={this.onClickSair}>Sair</Link>
                </NavLink>
            </NavItem>    
        );
    }
}

export default withRouter(LogoutButton);