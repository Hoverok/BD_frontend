import React, { Component } from 'react';
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, Input, Label,
    Modal, ModalHeader, ModalBody, Button, Row, Col, Media
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { SearchParams } from '../shared/searchParams';
import adParams from '../shared/adParams';
import currDate from '../shared/currDate';


function RenderProgramInList({ program, messages, onClick }) {
    if ((((((program.patient.fullName.toLowerCase()).includes(SearchParams.searchField.toLowerCase())
        || (program.patient.personalCode.toLowerCase()).includes(SearchParams.searchField.toLowerCase()))
        || (program.author.stampNr.toLowerCase()).includes(SearchParams.searchField.toLowerCase()))
        && ((Number(SearchParams.newMessage) === 1) && (((messages.map(message => message.messageSeen).indexOf(false))) > -1))))) {
        return (
            <Media tag="li">
                <Media left middle>
                    <Media object src={baseUrl + "images/program.png"} alt={program.name} />
                </Media>
                <Link to={`/programs/${program._id}`} className='text-link' >
                    <Media body className="ml-5">
                        <Media heading>
                        {program.patient.fullName}, {program.patient.personalCode} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </Media>
                        {(((messages.map(message => message.messageSeen).indexOf(false)) === -1)) ?
                            <p></p>
                            :
                            <span className="badge badge-pill badge-warning">Naujas atsiliepimas</span>
                        }
                        <p>Programa: <b>{program.description}</b></p>
                        <p>Gyd.Ra??to Nr.:  <b>{program.author.stampNr}</b></p>
                        <p>Nuo <b>{new Intl.DateTimeFormat('fr-CA',
                            { year: 'numeric', month: '2-digit', day: '2-digit' })
                            .format(new Date(Date.parse(program.startDate)))}</b> iki<b>&nbsp;
                                {new Intl.DateTimeFormat('fr-CA',
                                    { year: 'numeric', month: '2-digit', day: '2-digit' })
                                    .format(new Date(Date.parse(program.endDate)))}</b></p><hr></hr>
                        {/* <p>SearchParams.searchField is empty {SearchParams.searchField}</p> */}
                    </Media>
                </Link>
            </Media>

        );
    }
    else if ((((((program.patient.fullName.toLowerCase()).includes(SearchParams.searchField.toLowerCase())
        || (program.patient.personalCode.toLowerCase()).includes(SearchParams.searchField.toLowerCase()))
        || (program.author.stampNr.toLowerCase()).includes(SearchParams.searchField.toLowerCase()))
        && ((Number(SearchParams.newMessage) === 1) && (((messages.map(message => message.messageSeen).indexOf(false))) > -1))))) {
        return (
            <Media tag="li">
                <Media left middle>
                    <Media object src={baseUrl + "images/program.png"} alt={program.name} />
                </Media>
                <Link to={`/programs/${program._id}`} className='text-link' >
                    <Media body className="ml-5">
                        <Media heading>
                        {program.patient.fullName}, {program.patient.personalCode} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </Media>
                        {(((messages.map(message => message.messageSeen).indexOf(false)) === -1)) ?
                            <p></p>
                            :
                            <span className="badge badge-pill badge-warning">Naujas atsiliepimas</span>
                        }
                        <p>Programa: <b>{program.description}</b></p>
                        <p>Gyd.Ra??to Nr.:  <b>{program.author.stampNr}</b></p>
                        <p>Nuo <b>{new Intl.DateTimeFormat('fr-CA',
                            { year: 'numeric', month: '2-digit', day: '2-digit' })
                            .format(new Date(Date.parse(program.startDate)))}</b> iki<b>&nbsp;
                                {new Intl.DateTimeFormat('fr-CA',
                                    { year: 'numeric', month: '2-digit', day: '2-digit' })
                                    .format(new Date(Date.parse(program.endDate)))}</b></p><hr></hr>
                        {/* <p>SearchParams.searchField is empty {SearchParams.searchField}</p> */}
                    </Media>
                </Link>
            </Media>

        );
    }

    else if ((((program.patient.fullName.toLowerCase()).includes(SearchParams.searchField.toLowerCase())
        || (program.patient.personalCode.toLowerCase()).includes(SearchParams.searchField.toLowerCase())
        || (program.author.stampNr.toLowerCase()).includes(SearchParams.searchField.toLowerCase()))
        && Number(SearchParams.newMessage) === -1)) {
        return (
            <Media tag="li">
                <Media left middle>
                    <Media object src={baseUrl + "images/program.png"} alt={program.name} />
                </Media>
                <Link to={`/programs/${program._id}`} className='text-link' >
                    <Media body className="ml-5">
                        <Media heading>
                            {program.patient.fullName}, {program.patient.personalCode} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </Media>
                        {(((messages.map(message => message.messageSeen).indexOf(false)) === -1)) ?
                            <p></p>
                            :
                            <span className="badge badge-pill badge-warning">Naujas atsiliepimas</span>
                        }
                        <p>Programa: <b>{program.description}</b></p>
                        <p>Gyd.Ra??to Nr.:  <b>{program.author.stampNr}</b></p>
                        <p>Nuo <b>{new Intl.DateTimeFormat('fr-CA',
                            { year: 'numeric', month: '2-digit', day: '2-digit' })
                            .format(new Date(Date.parse(program.startDate)))}</b> iki<b>&nbsp;
                                {new Intl.DateTimeFormat('fr-CA',
                                    { year: 'numeric', month: '2-digit', day: '2-digit' })
                                    .format(new Date(Date.parse(program.endDate)))}</b></p><hr></hr>
                        {/* <p>SearchParams.searchField is empty {SearchParams.searchField}</p> */}
                    </Media>
                </Link>
            </Media>
        );
    }
    else if ((((program.patient.fullName.toLowerCase()).includes(SearchParams.searchField.toLowerCase())
        || (program.patient.personalCode.toLowerCase()).includes(SearchParams.searchField.toLowerCase())
        || (program.author.stampNr.toLowerCase()).includes(SearchParams.searchField.toLowerCase()))
        && Number(SearchParams.newMessage) === -1)) {
        return (
            <Media tag="li">
                <Media left middle>
                    <Media object src={baseUrl + "images/program.png"} alt={program.name} />
                </Media>
                <Link to={`/programs/${program._id}`} className='text-link' >
                    <Media body className="ml-5">
                        <Media heading>
                        {program.patient.fullName}, {program.patient.personalCode} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </Media>
                        {(((messages.map(message => message.messageSeen).indexOf(false)) === -1)) ?
                            <p></p>
                            :
                            <span className="badge badge-pill badge-warning">Naujas atsiliepimas</span>
                        }
                        <p>Programa: <b>{program.description}</b></p>
                        <p>Gyd.Ra??to Nr.:  <b>{program.author.stampNr}</b></p>
                        <p>Nuo <b>{new Intl.DateTimeFormat('fr-CA',
                            { year: 'numeric', month: '2-digit', day: '2-digit' })
                            .format(new Date(Date.parse(program.startDate)))}</b> iki<b>&nbsp;
                                {new Intl.DateTimeFormat('fr-CA',
                                    { year: 'numeric', month: '2-digit', day: '2-digit' })
                                    .format(new Date(Date.parse(program.endDate)))}</b></p><hr></hr>
                        {/* <p>SearchParams.searchField is empty {SearchParams.searchField}</p> */}
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
        this.handleStartDateChanged = this.handleStartDateChanged.bind(this);
        this.handleEndDateChanged = this.handleEndDateChanged.bind(this);

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
    handleStartDateChanged(event) {
        adParams.startDate = new Date(event.target.value);
    }

    handleEndDateChanged(event) {
        adParams.endDate = new Date(event.target.value);

    }



    handleSubmit(values) {
        this.toggleModal();
        try {
            adParams.personalCode = ((this.props.patients.patients.filter((patient) => patient.personalCode === values.personalCode)[0])._id);
            adParams.programCode = values.personalCode + (((this.props.programs.programs.filter((program) => program.patient.personalCode === values.personalCode))).length + 1);
        }
        catch (err) {
            alert("Pacientas su " + values.personalCode + " asmens kodo nerastas");
            return;
        }
        adParams.duration = (adParams.endDate - adParams.startDate) / 1000 / 60 / 60 / 24;
        this.props.postProgram(values.description, adParams.duration, adParams.personalCode, adParams.startDate, adParams.endDate, adParams.programCode);
    }

    render() {
        return (
            <div>
                <Button color="primary" size="lg" onClick={this.toggleModal}><span className="fa fa-plus fa-lg"></span> Nauja programa</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Naujos paciento programos registracija</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="description" md={3}>Apra??ymas</Label>
                                    <Control.textarea model=".description" id="description" name="description"
                                        rows="6"
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
                            <Row>
                                <Label htmlFor="startDate" md={2}>Prad??ia</Label>
                                <Col md={10}>
                                    <input type="date" className="form-control" id="startDate" name="startDate"
                                        min="2022-01-01" onChange={this.handleStartDateChanged}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Label htmlFor="endDate" md={2}>Pabaiga</Label>
                                <Col md={10}>
                                    <input type="date" className="form-control" id="endDate" name="endDate"
                                        min="2022-01-01" onChange={this.handleEndDateChanged}
                                    />
                                </Col>
                            </Row>
                            <Button type="submit" className="bg-primary">
                                Sukurti
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
                <div className="col-12 mt-2 round-borders">
                    <RenderProgramInList program={program} messages={props.messages.messages.filter((message) => message.program === program._id)} />
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
                    <div className="col-12">
                        <PostProgramForm programs={props.programs} postProgram={props.postProgram} patients={props.patients} />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h2>Pacient?? programos</h2>
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