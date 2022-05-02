import React, { Component } from 'react';
import {
    Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';

class AuthLog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            isPatientModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.togglePatientModal = this.togglePatientModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }


    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    togglePatientModal() {
        this.setState({
            isPatientModalOpen: !this.state.isPatientModalOpen
        });
    }

    handleLogin(event) {
        this.toggleModal();
        this.props.loginUser({ username: this.username.value, password: this.password.value });
        event.preventDefault();
    }

    render() {
        return (
            <div className="container">
                {!this.props.auth.isAuthenticated ?
                    <div className="col-12 m-1">
                        <button type="button" className="btn btn-success btn-lg btn-block"
                            data-toggle="tooltip" data-placement="right" title="Rasti pacientui priskirtą programą"
                            onClick={this.togglePatientModal}>Pacientas</button>
                        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.toggleModal}>Gydytojas</button>
                    </div>
                    :
                    <div>
                    <div className="col-12 m-1">
                        <button type="button" className="btn btn-success btn-lg btn-block"
                            data-toggle="tooltip" data-placement="right" title="Rasti pacientui priskirtą programą"
                            onClick={this.togglePatientModal}>Pacientas</button>
                    </div>
                    </div>
                }
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Prisijungimas</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Naudotojo vardas</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Slaptažodis</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input} />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Prisijungti</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isPatientModalOpen} toggle={this.togglePatientModal}>
                    <ModalHeader toggle={this.togglePatientModal}>Programos paieška</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="patientCode">Programos kodas</Label>
                                <Input type="text" id="patientCode" name="patientCode"
                                    innerRef={(input) => this.patientCode = input} />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Pateikti</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

}

export default AuthLog;