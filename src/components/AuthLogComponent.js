import React, { Component } from 'react';
import {
    Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label, Row, Col,
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { SearchParams } from '../shared/searchParams';
import { programsFailed } from '../redux/ActionCreators';

class AuthLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            isPatientModalOpen: false,
            isRedirect: false,
            prograId: ''
        };
        console.log('redirect?  ' + this.state.isRedirect);
        this.toggleModal = this.toggleModal.bind(this);
        this.togglePatientModal = this.togglePatientModal.bind(this);
        this.toggleRedirect = this.toggleRedirect.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleToPatientProgram = this.handleToPatientProgram.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

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
        console.log("this is getting called?" + this.state.isRedirect)
    }

    toggleRedirect() {
        this.setState({
            isRedirect: !this.state.isRedirect
        });
        console.log("this is getting called?" + this.state.isRedirect)
    }

    handleLogin(event) {
        this.toggleModal();
        this.props.loginUser({ username: this.username.value, password: this.password.value });
        event.preventDefault();
    }

    handleToPatientProgram(values) {
        this.togglePatientModal();
        SearchParams.patientCode = values.patientCode;
        this.toggleRedirect();
        console.log('redirect?  ' + this.state.isRedirect)
        this.forceUpdate();
        console.log('patient code: ' + SearchParams.patientCode)
        console.log('redirect?  ' + this.state.isRedirect)
    }

    handleLogout() {
        this.props.logoutUser();
    }

    render() {
        return (
            <div className="container">
                {!this.state.isRedirect ?
                    <div>
                        {!this.props.auth.isAuthenticated ?
                            <div className="row">
                                <div className="col-12 m-1">
                                    <button type="button" className="btn btn-success btn-lg btn-block"
                                        data-toggle="tooltip" data-placement="right" title="Rasti pacientui priskirtą programą"
                                        onClick={this.togglePatientModal}>Pacientas</button>
                                    <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.toggleModal}>Gydytojas</button>
                                </div>
                            </div>
                            :
                            <div>
                                <div className="row">
                                    <div className="col-12 m-1">
                                        <h4><b><i>{this.props.auth.user.username}</i></b> prijungtas prie sistemos.</h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 m-1">
                                        <button type="button" className='btn btn-secondary btn-lg btn-block' onClick={this.handleLogout} >
                                            <span className="fa fa-sign-out fa-lg"></span> Atsijungti
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 m-1">
                                        <Link to={`/programs`} className='text-link'>
                                            <button type="button" className="btn btn-info btn-lg btn-block">Pacientų programos</button></Link>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 m-1">
                                        <button type="button" className="btn btn-success btn-lg btn-block"
                                            data-toggle="tooltip" data-placement="right" title="Rasti pacientui priskirtą programą"
                                            onClick={this.togglePatientModal}>Pacientas</button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    :
                    <div>
                        <Redirect to={`/welcome/${SearchParams.patientCode}`} />
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
                        <LocalForm onSubmit={(values) => this.handleToPatientProgram(values)}>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="patientCode">Programos kodas</Label>
                                    <Control.text model=".patientCode" id="patientCode" name="patientCode"
                                        placeholder=""
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Pateikti</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

}

export default AuthLog;