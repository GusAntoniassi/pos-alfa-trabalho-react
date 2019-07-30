import React, { Component } from 'react';

import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

import { Link } from "react-router-dom";

import LogoutButton from "./LogoutButton";

export default class Header extends Component {
    render() {
        return (
            <Navbar color="dark" dark expand="xs" className="mb-4">
                <NavbarBrand href="/">
                    <Link className="text-white text-decoration-none" style={{ letterSpacing: '2px' }} to='/'>
                        <span className="brand-name"><span class="web">Web</span>Dev</span>
                    </Link>
                </NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink>
                            <Link className="text-white" to='/tarefas'>Tarefas</Link>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink>
                            <Link className="text-white" to='/about'>Sobre</Link>
                        </NavLink>
                    </NavItem>
                    <LogoutButton />
                </Nav>
            </Navbar>
        );
    }
}