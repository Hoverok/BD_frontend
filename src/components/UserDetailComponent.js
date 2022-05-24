import React, { Component } from 'react';
import {
    Card, CardImg, CardImgOverlay, CardHeader, CardText, CardBody, CardSubtitle,
    CardTitle, CardFooter, Breadcrumb, BreadcrumbItem, Label,
    Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Form, Media
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';



function RenderUser({ user, putPatient, deleteUser }) {
    return (
        <div className="col-12 m-1">
            <EditUserForm user={user} deleteUser={deleteUser} />
            <h3>Kineziterapeuto informacija:</h3>
            <br></br>
            <div className='row'>
                <div className="col-12 col-sm-2">
                    <p>Kineziterapeutas:</p>
                    <p>Rašto Nr.:</p>
                    <p>Prisijungimo vardas:</p>
                    <p>El. paštas:</p>
                </div>
                <div className="col-12 col-sm-6">
                    <p><b>{user.fullName}</b></p>
                    <p><b>{user.stampNr}</b></p>
                    <p><b>{user.username}</b></p>
                    <p><b>{user.email}</b></p>
                </div>
            </div>
            <hr />
        </div>
    );
}



class EditUserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            isDeleteModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        //this.handleUpdatePatient = this.handleUpdatePatient.bind(this);
        this.handleDeletePatient = this.handleDeletePatient.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    toggleDeleteModal() {
        this.setState({
            isDeleteModalOpen: !this.state.isDeleteModalOpen
        });
    }

    // handleUpdatePatient(values) {
    //     this.toggleModal();
    //     this.props.putPatient(this.props.patient._id, values.name, values.personalCode, values.address, values.telNum, values.email);
    // }

    handleDeletePatient(event) {
        this.toggleDeleteModal();
        this.props.deleteUser(this.props.user._id);

    }
    render() {
        return (
            <div>
                <Button className="mb-3" color="info" onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Redaguoti
                </Button>
                <Button className="mb-3 ml-1" color="danger" onClick={this.toggleDeleteModal}>
                    <span className="fa fa-trash fa-lg"></span> Ištrinti
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Redaguoti paciento duomenis</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleUpdatePatient(values)}>
                            {/* <Row className="form-group">
                                <Label htmlFor="name" md={2}>Vardas Pavardė</Label>
                                <Col md={10}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Vardas Pavardė"
                                        defaultValue={this.props.patient.fullName}
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="personalCode" md={2}>Asmens kodas</Label>
                                <Col md={10}>
                                    <Control.text model=".personalCode" id="personalCode" name="personalCode"
                                        placeholder="Asmens Kodas"
                                        defaultValue={this.props.patient.personalCode}
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="address" md={2}>Adresas</Label>
                                <Col md={10}>
                                    <Control.text model=".address" id="address" name="address"
                                        placeholder="Gatvė Namo Nr.-Būto Nr."
                                        defaultValue={this.props.patient.address}
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="telNum" md={2}>Telefono Numeris</Label>
                                <Col md={10}>
                                    <Control.text model=".telNum" id="telNum" name="telNum"
                                        placeholder="+370XXXXXXXX"
                                        defaultValue={this.props.patient.telNum}
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>El. Paštas</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="pavyzdys@email.com"
                                        defaultValue={this.props.patient.email}
                                        className="form-control"
                                    />
                                </Col>
                            </Row> */}
                            <Button type="submit" className="bg-primary">
                                Pateikti
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isDeleteModalOpen} toggle={this.toggleDeleteModal}>
                    <ModalHeader toggle={this.toggleDeleteModal}>Ištrinti</ModalHeader>
                    <ModalBody>
                        <p>  Ar tikrai norite ištrinti kineziterapeutą? </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn btn-secondary"
                            onClick={this.toggleDeleteModal}>Atšaukti</Button>
                        <Button className="bg-primary" onClick={this.handleDeletePatient}>Ištrinti</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const UserDetail = (props) => {
    // if (props.errMess) {
    //     return (
    //         <div className="container">
    //             <div className="row">
    //                 <h4>{props.errMess}</h4>
    //             </div>
    //         </div>
    //     );
    // }
    if (props.user != null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/users'>Kineziterapeutai</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.user.fullName}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.user.fullName}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderUser user={props.user}
                        // putPatient={props.putPatient}
                        deleteUser={props.deleteUser}
                    />
                </div>
            </div>
        );
    else
        return (
            <Redirect to='/users' />
        );
}

export default UserDetail;