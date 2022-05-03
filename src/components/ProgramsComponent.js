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
import { SearchParams } from '../shared/searchParams';
import adParams from '../shared/adParams';


function RenderProgramInList({ program, onClick }) {


    if (SearchParams.searchField === '' && SearchParams.programStatus === '') {
        return (
            <Media tag="li">
                <Media left middle>
                    <Media object src={baseUrl + "images/user.png"} alt={program.name} />
                </Media>
                <Link to={`/programs/${program._id}`} className='text-link' >
                    <Media body className="ml-5">
                        <Media heading>{program.name}</Media>
                        <p>{program.personalCode}</p>
                        <p>{program.programStatus}</p>
                        <p>SearchParams.searchField is empty {SearchParams.searchField}</p>
                    </Media>
                </Link>
            </Media>
        );
    }
    else if (SearchParams.searchField === '' && SearchParams.programStatus === program.programStatus) {
        return (
            <Media tag="li">
                <Media left middle>
                    <Media object src={baseUrl + "images/pic.jpg"} alt={program.name} />
                </Media>
                <Link to={`/programs/${program._id}`} className='text-link' >
                    <Media body className="ml-5">
                        <Media heading>{program.name}</Media>
                        <p>{program.personalCode}</p>
                        <p>{program.programStatus}</p>
                        <p>SearchParams.searchField: {SearchParams.searchField}</p>
                    </Media>
                </Link>
            </Media>
        );
    }
    else if (((program.name.toLowerCase()).includes(SearchParams.searchField.toLowerCase())
        || (program.personalCode.toLowerCase()).includes(SearchParams.searchField.toLowerCase()))
        && SearchParams.programStatus === '') {
        return (
            <Media tag="li">
                <Media left middle>
                    <Media object src={baseUrl + "images/pic.jpg"} alt={program.name} />
                </Media>
                <Link to={`/programs/${program._id}`} className='text-link' >
                    <Media body className="ml-5">
                        <Media heading>{program.name}</Media>
                        <p>{program.personalCode}</p>
                        <p>{program.programStatus}</p>
                        <p>SearchParams.searchField: {SearchParams.searchField}</p>
                    </Media>
                </Link>
            </Media>
        );
    }
    else if (((program.name.toLowerCase()).includes(SearchParams.searchField.toLowerCase())
        || (program.personalCode.toLowerCase()).includes(SearchParams.searchField.toLowerCase()))
        && SearchParams.programStatus === program.programStatus) {
        return (
            <Media tag="li">
                <Media left middle>
                    <Media object src={baseUrl + "images/pic.jpg"} alt={program.name} />
                </Media>
                <Link to={`/programs/${program._id}`} className='text-link' >
                    <Media body className="ml-5">
                        <Media heading>{program.name}</Media>
                        <p>{program.personalCode}</p>
                        <p>{program.programStatus}</p>
                        <p>SearchParams.searchField: {SearchParams.searchField}</p>
                    </Media>
                </Link>
            </Media>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}


class PostProgramForm extends Component {

    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
        // console.log("PATIENTS: " + JSON.stringify(this.props.patients))
        // console.log("PATIENT ID: " + JSON.stringify((this.props.patients.patients[0])))
    }
    
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        //use searchParams to store personalCode and filter patient_.id out of it
        adParams.personalCode = ((this.props.patients.patients.filter((patient) => patient.personalCode === values.patientId)[0])._id);
        // <p>{this.props.patients.filter((patient) => patient._id === this.props.program.patient)[0].fullName}</p>
        this.props.postProgram(values.name, values.personalCode, values.programStatus, adParams.personalCode);
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Nauja programa</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Naujos paciento programos registracija</ModalHeader>
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
                            <Row className="form-group">
                                <Label htmlFor="personalCode" md={2}>Asmens kodas</Label>
                                <Col md={10}>
                                    <Control.text model=".personalCode" id="personalCode" name="personalCode"
                                        placeholder="Asmens Kodas"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="programStatus" md={2}>Būsena</Label>
                                <Col md={6}>
                                    <Control.select model=".programStatus" id="programStatus" name="programStatus"
                                        className="form-control">
                                        <option value=""></option>
                                        <option value="Laukia">Laukia</option>
                                        <option value="Aktyvi">Aktyvi</option>
                                        <option value="Baigta">Baigta</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="patientId" md={2}>Paciento ID</Label>
                                <Col md={10}>
                                    <Control.text model=".patientId" id="patientId" name="patientId"
                                        placeholder="Paciento ID"
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

const Programs = (props) => {
    const programs = props.programs.programs.map((program) => {
        return (
            <Fade in key={program._id}>
                <div className="col-12 mt-2">
                    <RenderProgramInList program={program} />
                </div>
            </Fade>
        );
    });

    if (props.programs.programsErrMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.programs.programsErrMess}</h4>
                </div>
            </div>
        );
    }
    else
        return (
            <div className="container">
                <div className="row">
                </div>
                <div className="row">
                    <PostProgramForm programs={props.programs} postProgram={props.postProgram} patients={props.patients} />
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h2>Pacientų programos</h2>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {programs}
                        </div>
                    </div>
                </div>
            </div>
        );


}

export default Programs;