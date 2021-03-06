import React, { Component } from 'react';
import {
    Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin(event) {
        this.toggleModal();
        this.props.loginUser({ username: this.username.value, password: this.password.value });
        event.preventDefault();

    }

    handleLogout() {
        this.props.logoutUser();
    }

    render() {
        return (
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            {!this.props.auth.isAuthenticated ?
                                <Nav navbar>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/welcome">
                                            <span className="fa fa-home fa-lg"></span> Pradinis
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                :
                                <Nav navbar>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/welcome">
                                            <span className="fa fa-home fa-lg"></span> Pradinis
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/programs">
                                            <span className="fa fa-address-card fa-lg"></span> Programos
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/patients">
                                            <span className="fa fa-user fa-lg"></span> Pacientai
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/exercisetypes">
                                            <span className="fa fa-video-camera fa-lg"></span> Pratimai
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/users">
                                            <span className="fa fa-video-camera fa-lg"></span> Gytytojai
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            }
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    {!this.props.auth.isAuthenticated ?
                                        <div></div>
                                        :
                                        <div>
                                            <div className="navbar-text mr-3">{this.props.auth.user.username}</div>
                                        </div>
                                    }
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1 className="jumbotron-text" >Nuotolini?? kineziterapijos u??si??mim?? sistema</h1>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                        innerRef={(input) => this.remember = input} />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Header;