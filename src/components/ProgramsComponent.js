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
function RenderProgramInList({ program, messages, onClick }) {
    // if (SearchParams.searchField === '' && Number(SearchParams.newMessage) === -1) {
    //     return (
    //         <Media tag="li">
    //             <Media left middle>
    //                 <Media object src={baseUrl + "images/program.png"} alt={program.name} />
    //             </Media>
    //             <Link to={`/programs/${program._id}`} className='text-link' >
    //                 <Media body className="ml-5">
    //                     <Media heading>{program.patient.fullName}</Media>
    //                     {(((messages.map(message => message.messageSeen).indexOf(false)) === -1)) ?
    //                         <p></p>
    //                         :
    //                         <span className="badge badge-pill badge-warning">Naujas Atsiliepimas</span>
    //                     }
    //                     <p>Asmens1111 kodas: {program.patient.personalCode}</p>
    //                     <p>Gyd.: {program.author.fullName}</p>
    //                     <p>{new Intl.DateTimeFormat('fr-CA',
    //                         { year: 'numeric', month: '2-digit', day: '2-digit' })
    //                         .format(new Date(Date.parse(program.updatedAt)))}</p>
    //                     {/* <p>SearchParams.searchField is empty {SearchParams.searchField}</p> */}
    //                 </Media>
    //             </Link>
    //         </Media>
    //     );
    // }
    if ((((((program.patient.fullName.toLowerCase()).includes(SearchParams.searchField.toLowerCase())
        || (program.patient.personalCode.toLowerCase()).includes(SearchParams.searchField.toLowerCase()))
        || (program.author.stampNr.toLowerCase()).includes(SearchParams.searchField.toLowerCase()))
        && ((Number(SearchParams.newMessage) === 1) && (((messages.map(message => message.messageSeen).indexOf(false))) > -1)))
        && SearchParams.programStatus === program.programStatus)) {
        return (
            <Media tag="li">
                <Media left middle>
                    <Media object src={baseUrl + "images/program.png"} alt={program.name} />
                </Media>
                <Link to={`/programs/${program._id}`} className='text-link' >
                    <Media body className="ml-5">
                        {(program.programStatus === "Aktyvi") ?
                            <Media heading>
                                {program.patient.fullName} <span className="badge badge-success">Programa aktyvi</span>
                            </Media>
                            :
                            <Media heading>
                                {program.patient.fullName} <span className="badge badge-danger">Programa baigta</span>
                            </Media>
                        }
                        {(((messages.map(message => message.messageSeen).indexOf(false)) === -1)) ?
                            <p></p>
                            :
                            <span className="badge badge-pill badge-warning">Naujas atsiliepimas</span>
                        }
                        <p>Asmens kodas: {program.patient.personalCode}</p>
                        <p>Gyd.: {program.author.fullName}</p>
                        <p>Gyd.Rašto Nr.: {program.author.stampNr}</p>
                        <p>{new Intl.DateTimeFormat('fr-CA',
                            { year: 'numeric', month: '2-digit', day: '2-digit' })
                            .format(new Date(Date.parse(program.updatedAt)))}</p>
                        {/* <p>SearchParams.searchField is empty {SearchParams.searchField}</p> */}
                    </Media>
                </Link>
            </Media>

        );
    }
    else if ((((((program.patient.fullName.toLowerCase()).includes(SearchParams.searchField.toLowerCase())
        || (program.patient.personalCode.toLowerCase()).includes(SearchParams.searchField.toLowerCase()))
        || (program.author.stampNr.toLowerCase()).includes(SearchParams.searchField.toLowerCase()))
        && ((Number(SearchParams.newMessage) === 1) && (((messages.map(message => message.messageSeen).indexOf(false))) > -1)))
        && SearchParams.programStatus === "")) {
        return (
            <Media tag="li">
                <Media left middle>
                    <Media object src={baseUrl + "images/program.png"} alt={program.name} />
                </Media>
                <Link to={`/programs/${program._id}`} className='text-link' >
                    <Media body className="ml-5">
                        {(program.programStatus === "Aktyvi") ?
                            <Media heading>
                                {program.patient.fullName} <span className="badge badge-success">Programa aktyvi</span>
                            </Media>
                            :
                            <Media heading>
                                {program.patient.fullName} <span className="badge badge-danger">Programa baigta</span>
                            </Media>
                        }
                        {(((messages.map(message => message.messageSeen).indexOf(false)) === -1)) ?
                            <p></p>
                            :
                            <span className="badge badge-pill badge-warning">Naujas atsiliepimas</span>
                        }
                        <p>Asmens kodas: {program.patient.personalCode}</p>
                        <p>Gyd.: {program.author.fullName}</p>
                        <p>Gyd.Rašto Nr.: {program.author.stampNr}</p>
                        <p>{new Intl.DateTimeFormat('fr-CA',
                            { year: 'numeric', month: '2-digit', day: '2-digit' })
                            .format(new Date(Date.parse(program.updatedAt)))}</p>
                        {/* <p>SearchParams.searchField is empty {SearchParams.searchField}</p> */}
                    </Media>
                </Link>
            </Media>

        );
    }

    // else if (SearchParams.searchField === '' && SearchParams.programStatus === program.programStatus) {
    //     return (
    //         <Media tag="li">
    //             <Media left middle>
    //                 <Media object src={baseUrl + "images/program.png"} alt={program.name} />
    //             </Media>
    //             <Link to={`/programs/${program._id}`} className='text-link' >
    //                 <Media body className="ml-5">
    //                     <Media heading>{program.patient.fullName}</Media>
    //                     <p>Asmens kodas: {program.patient.personalCode}</p>
    //                     <p>{new Intl.DateTimeFormat('fr-CA',
    //                         { year: 'numeric', month: '2-digit', day: '2-digit'})
    //                         .format(new Date(Date.parse(program.updatedAt)))}</p>
    //                     {/* <p>SearchParams.searchField is empty {SearchParams.searchField}</p> */}
    //                 </Media>
    //             </Link>
    //         </Media>
    //     );
    // }
    else if ((((program.patient.fullName.toLowerCase()).includes(SearchParams.searchField.toLowerCase())
        || (program.patient.personalCode.toLowerCase()).includes(SearchParams.searchField.toLowerCase())
        || (program.author.stampNr.toLowerCase()).includes(SearchParams.searchField.toLowerCase()))
        && Number(SearchParams.newMessage) === -1)
        && SearchParams.programStatus === "") {
        return (
            <Media tag="li">
                <Media left middle>
                    <Media object src={baseUrl + "images/program.png"} alt={program.name} />
                </Media>
                <Link to={`/programs/${program._id}`} className='text-link' >
                    <Media body className="ml-5">
                        {(program.programStatus === "Aktyvi") ?
                            <Media heading>
                                {program.patient.fullName} <span className="badge badge-success">Programa aktyvi</span>
                            </Media>
                            :
                            <Media heading>
                                {program.patient.fullName} <span className="badge badge-danger">Programa baigta</span>
                            </Media>
                        }
                        {(((messages.map(message => message.messageSeen).indexOf(false)) === -1)) ?
                            <p></p>
                            :
                            <span className="badge badge-pill badge-warning">Naujas atsiliepimas</span>
                        }
                        <p>Asmens kodas: {program.patient.personalCode}</p>
                        <p>Gyd.: {program.author.fullName}</p>
                        <p>Gyd.Rašto Nr.: {program.author.stampNr}</p>
                        <p>{new Intl.DateTimeFormat('fr-CA',
                            { year: 'numeric', month: '2-digit', day: '2-digit' })
                            .format(new Date(Date.parse(program.updatedAt)))}</p>
                        {/* <p>SearchParams.searchField is empty {SearchParams.searchField}</p> */}
                    </Media>
                </Link>
            </Media>
        );
    }
    else if ((((program.patient.fullName.toLowerCase()).includes(SearchParams.searchField.toLowerCase())
        || (program.patient.personalCode.toLowerCase()).includes(SearchParams.searchField.toLowerCase())
        || (program.author.stampNr.toLowerCase()).includes(SearchParams.searchField.toLowerCase()))
        && Number(SearchParams.newMessage) === -1)
        && SearchParams.programStatus === program.programStatus) {
        return (
            <Media tag="li">
                <Media left middle>
                    <Media object src={baseUrl + "images/program.png"} alt={program.name} />
                </Media>
                <Link to={`/programs/${program._id}`} className='text-link' >
                    <Media body className="ml-5">
                        {(program.programStatus === "Aktyvi") ?
                            <Media heading>
                                {program.patient.fullName} <span className="badge badge-success">Programa aktyvi</span>
                            </Media>
                            :
                            <Media heading>
                                {program.patient.fullName} <span className="badge badge-danger">Programa baigta</span>
                            </Media>
                        }
                        {(((messages.map(message => message.messageSeen).indexOf(false)) === -1)) ?
                            <p></p>
                            :
                            <span className="badge badge-pill badge-warning">Naujas atsiliepimas</span>
                        }
                        <p>Asmens kodas: {program.patient.personalCode}</p>
                        <p>Gyd.: {program.author.fullName}</p>
                        <p>Gyd.Rašto Nr.: {program.author.stampNr}</p>
                        <p>{new Intl.DateTimeFormat('fr-CA',
                            { year: 'numeric', month: '2-digit', day: '2-digit' })
                            .format(new Date(Date.parse(program.updatedAt)))}</p>
                        {/* <p>SearchParams.searchField is empty {SearchParams.searchField}</p> */}
                    </Media>
                </Link>
            </Media>
        );
    }

    // else if (((program.patient.fullName.toLowerCase()).includes(SearchParams.searchField.toLowerCase())
    //     || (program.patient.personalCode.toLowerCase()).includes(SearchParams.searchField.toLowerCase()))
    //     && SearchParams.programStatus === '') {
    //     return (
    //         <Media tag="li">
    //             <Media left middle>
    //                 <Media object src={baseUrl + "images/program.png"} alt={program.name} />
    //             </Media>
    //             <Link to={`/programs/${program._id}`} className='text-link' >
    //                 <Media body className="ml-5">
    //                     <Media heading>{program.patient.fullName}</Media>
    //                     <p>Asmens kodas: {program.patient.personalCode}</p>
    //                     <p>{new Intl.DateTimeFormat('fr-CA',
    //                         { year: 'numeric', month: '2-digit', day: '2-digit' })
    //                         .format(new Date(Date.parse(program.updatedAt)))}</p>
    //                     {/* <p>SearchParams.searchField is empty {SearchParams.searchField}</p> */}
    //                 </Media>
    //             </Link>
    //         </Media>
    //     );
    // }

    // else if (((program.patient.name.toLowerCase()).includes(SearchParams.searchField.toLowerCase())
    //     || (program.patient.personalCode.toLowerCase()).includes(SearchParams.searchField.toLowerCase()))
    //     && SearchParams.programStatus === program.programStatus) {
    //     return (
    //         <Media tag="li">
    //             <Media left middle>
    //                 <Media object src={baseUrl + "images/program.png"} alt={program.name} />
    //             </Media>
    //             <Link to={`/programs/${program._id}`} className='text-link' >
    //                 <Media body className="ml-5">
    //                     <Media heading>{program.patient.fullName}</Media>
    //                     <p>Asmens kodas: {program.patient.personalCode}</p>
    //                     <p>{new Intl.DateTimeFormat('fr-CA',
    //                         { year: 'numeric', month: '2-digit', day: '2-digit'})
    //                         .format(new Date(Date.parse(program.updatedAt)))}</p>
    //                     {/* <p>SearchParams.searchField is empty {SearchParams.searchField}</p> */}
    //                 </Media>
    //             </Link>
    //         </Media>
    //     );
    // }
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
        try {
            console.log("hi");
            adParams.personalCode = ((this.props.patients.patients.filter((patient) => patient.personalCode === values.personalCode)[0])._id);
            // <p>{this.props.patients.filter((patient) => patient._id === this.props.program.patient)[0].fullName}</p>
            this.props.postProgram(values.description, values.duration, "Aktyvi", adParams.personalCode);
        }
        catch (err) {
            alert("Pacientas su " + values.personalCode + " asmens kodo nerastas");
        }
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
                                    <Label htmlFor="description" md={3}>Aprašymas</Label>
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
                            {/* <Row className="form-group">
                                <Label htmlFor="programStatus" md={2}>Būsena</Label>
                                <Col md={6}>
                                    <Control.select model=".programStatus" id="programStatus" name="programStatus"
                                        className="form-control">
                                        <option value=""></option>
                                        <option value="Aktyvi">Aktyvi</option>
                                        <option value="Baigta">Baigta</option>
                                    </Control.select>
                                </Col>
                            </Row> */}
                            <Row className="form-group">
                                <Label htmlFor="duration" md={2}>Trukmė</Label>
                                <Col md={10}>
                                    <Control.text model=".duration" id="duration" name="duration"
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