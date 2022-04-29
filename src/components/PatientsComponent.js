import React, { Component } from 'react';
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Label,
    Modal, ModalHeader, ModalBody, Button, Row, Col, Media
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


function RenderPatientInList({ patient, onClick }) {
    return (
        <Link className= 'text-link' to={`/patients/${patient._id}`} >
        <Media tag="li">
            <Media left middle>
                <Media object src={baseUrl + "images/pic.jpg"} alt={patient.name} />
            </Media>
            <Media body className="ml-5">
                <Media heading>{patient.name}</Media>
                <p>{patient.name}</p>
                <p>{patient.name}</p>
            </Media>
        </Media>
        </Link>
    );
}


class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postPatient(values.name);
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Registruoti sesiją</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Registruoti sesiją</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="name" md={2}>Vardas</Label>
                                <Col md={10}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Vardas"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Button type="submit" className="bg-primary">
                                Registruoti
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

}

const Patients = (props) => {
    const patients = props.patients.patients.map((patient) => {
        return (
            <Fade in key={patient._id}>
                <div className="col-12 mt-2">
                    <RenderPatientInList patient={patient} />
                </div>
            </Fade>
        );
    });

    if (props.patients.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.patients.errMess}</h4>
                </div>
            </div>
        );
    }
    else
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Pagrindinis</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Pacientai</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row">
                    <CommentForm patients={props.patients} postPatient={props.postPatient} />
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h2>Pacientai</h2>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {patients}
                        </div>
                    </div>
                </div>
            </div>




        );
}

export default Patients;