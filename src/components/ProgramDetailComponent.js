import React, { Component } from 'react';
import {
    Card, CardImg, CardImgOverlay, CardHeader, CardText, CardBody, CardSubtitle,
    CardTitle, CardFooter, Breadcrumb, BreadcrumbItem, Label,
    Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Form, Media
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import adParams from '../shared/adParams';

function RenderProgram({ program, putProgram, deleteProgram, patients, users }) {
    return (
        <div className="col-12 m-1">
            <EditProgramForm program={program} putProgram={putProgram} deleteProgram={deleteProgram} patients={patients} users={users} />
            <div className="d-none d-sm-block">
                <span className="badge badge-info">{program.programStatus}</span>
            </div>

            {/* <h4>Paciento informacija:</h4>
            <p>Asmens Kodas: {program.personalCode}</p> */}
            {/* <div className="row">
                <div className="col-12 m-1">
                    <p>PatientID programoje: {program.patient}</p>
                    <p>{patient.fullName}</p>
                </div>
            </div> */}
            <hr />
        </div>
    );
}


class RenderPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div className="col-12">

                <div className='row'>
                    <div className="col-12 col-sm-2">
                        <h3>Pacientas:</h3>
                        <p>Pacientas:</p>
                        <p>Asmens Kodas:</p>
                        <p>Adresas:</p>
                        <p>Tel. numeris:</p>
                        <p>El. paštas:</p>
                    </div>
                    <div className="col-12 col-sm-4">
                        <h3><span>&nbsp;</span> </h3>
                        <p><b>{this.props.program.patient.fullName}</b></p>
                        <p><b>{this.props.program.patient.personalCode}</b></p>
                        <p><b>{this.props.program.patient.address}</b></p>
                        <p><b>{this.props.program.patient.telNum}</b></p>
                        <p><b>{this.props.program.patient.email}</b></p>
                    </div>
                    <div className="col-12 col-sm-2">
                        <h3>Gydytojas:</h3>
                        <p>Gydytojas:</p>
                        <p>Rašto Nr.:</p>
                    </div>
                    <div className="col-12 col-sm-4">
                        <h3><span>&nbsp;</span> </h3>
                        <p><b>{this.props.program.author.fullName}</b></p>
                        <p><b>{this.props.program.author.stampNr}</b></p>
                    </div>
                </div>
                <hr />
            </div>
        );
    }
}





function RenderExercises({ exercises, programId, postExercise, putExercise, deleteExercise, exerciseTypes }) {
    if (exercises != null)
        return (
            <div className="col-12 m-1">
                <h4>Pratimai</h4>
                <Stagger in>
                    {exercises.map((exercise) => {
                        return (
                            <Fade in key={exercise._id}>
                                <Card color="secondary">
                                    <Card body>
                                        <CardBody>
                                            <EditExerciseForm exercise={exercise} putExercise={putExercise} deleteExercise={deleteExercise} />
                                            <CardTitle tag="h5">
                                                Pavadinimas: {exercise.exerciseType.title}
                                            </CardTitle>
                                            <CardText>
                                                Intensyvumas: {exercise.exerciseType.intensity}/5 <br></br>
                                                Instrukijos: {exercise.instuructions}
                                            </CardText>
                                            <CardSubtitle
                                                className="mb-2 text-muted"
                                                tag="h6">
                                                Atnaujino: {exercise.author.firstname} {exercise.author.lastname} <br></br>
                                                Paskutinio atnaujinimo data ir laikas: {new Intl.DateTimeFormat('fr-CA',
                                                    { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
                                                    .format(new Date(Date.parse(exercise.updatedAt)))}
                                            </CardSubtitle>
                                            <CardFooter>
                                                <a href={exercise.exerciseType.ytLink} target="blank">Pratimo vaizdo įrašo nuoroda</a>
                                            </CardFooter>
                                        </CardBody>
                                    </Card>
                                </Card>
                            </Fade>
                        );
                    })}
                </Stagger>
                <ExerciseForm programId={programId} postExercise={postExercise} />
            </div>
        );
    else
        return (
            <div></div>
        );
}

class EditExerciseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            isDeleteModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        this.handleUpdateExercise = this.handleUpdateExercise.bind(this);
        this.handleDeleteExercise = this.handleDeleteExercise.bind(this);
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

    handleUpdateExercise(values) {
        this.toggleModal();
        this.props.putExercise(this.props.exercise._id, values.exerciseTypeId, values.instuructions);

        // this.forceUpdate();
    }

    handleDeleteExercise(event) {
        this.toggleDeleteModal();
        this.props.deleteExercise(this.props.exercise._id);

    }
    render() {
        return (
            <div>
                <Button className="mb-3" color="info" onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Redaguoti pratimą
                </Button>
                <Button className="mb-3 ml-1" color="danger" onClick={this.toggleDeleteModal}>
                    <span className="fa fa-trash fa-lg"></span> Ištrinti
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Redaguoti pratimo duomenis</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleUpdateExercise(values)}>
                            <Row className="form-group">
                                <Label htmlFor="exerciseTypeId" md={3}>Pratimo tipo ID</Label>
                                <Col md={9}>
                                    <Control.text model=".exerciseTypeId" id="exerciseTypeId" name="exerciseTypeId"
                                        placeholder="" defaultValue={this.props.exercise.exerciseType._id}
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="instuructions">Specialisto komentaras</Label>
                                    <Control.textarea model=".instuructions" id="instuructions" name="instuructions"
                                        rows="8" defaultValue={this.props.exercise.instuructions}
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Button type="submit" className="bg-primary">
                                Pateikti
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isDeleteModalOpen} toggle={this.toggleDeleteModal}>
                    <ModalHeader toggle={this.toggleDeleteModal}>Ištrinti pratim1</ModalHeader>
                    <ModalBody>
                        <p>  Ar tikrai norite ištrinti pratimą? </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn btn-secondary"
                            onClick={this.toggleDeleteModal}>Atšaukti</Button>
                        <Button className="bg-primary" onClick={this.handleDeleteExercise}>Ištrinti</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

class ExerciseForm extends Component {

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
        this.props.postExercise(this.props.programId, values.exerciseTypeId, values.instuructions);
    }

    render() {
        return (
            <div className="m-3">
                <Button color="success" onClick={this.toggleModal}>
                    <span className="fa fa-plus fa-lg "></span> Pridėti pratimą </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Pridėti pratimą</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="exerciseTypeId" md={3}>Pratimo tipo ID</Label>
                                <Col md={9}>
                                    <Control.text model=".exerciseTypeId" id="exerciseTypeId" name="exerciseTypeId"
                                        placeholder=""
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="instuructions">Specialisto komentaras</Label>
                                    <Control.textarea model=".instuructions" id="instuructions" name="instuructions"
                                        rows="8" className="form-control" />
                                </Col>
                            </Row>
                            <Button type="submit" className="bg-primary">
                                Pateikti
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

}

class EditProgramForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            isDeleteModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        this.handleUpdateProgram = this.handleUpdateProgram.bind(this);
        this.handleDeleteProgram = this.handleDeleteProgram.bind(this);
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

    handleUpdateProgram(values) {
        this.toggleModal();
        try {
            adParams.personalCode = ((this.props.patients.patients.filter((patient) => patient.personalCode === values.personalCode)[0])._id);
        }
        catch (err) {
            alert("Pacientas su " + values.patientId + " asmens kodo nerastas");
            return;
        }
        try {
            adParams.stampNr = ((this.props.users.users.filter((user) => user.stampNr === values.stampNr)[0])._id);
        }
        catch (err) {
            alert("Gydytojas su " + values.stampNr + " rašto kodu nerastas");
            return;
        }

        this.props.putProgram(this.props.program._id, values.description, values.duration, adParams.personalCode, adParams.stampNr);
    }

    handleDeleteProgram(event) {
        this.toggleDeleteModal();
        this.props.deleteProgram(this.props.program._id);
    }
    render() {
        return (
            <div>
                <Button className="mb-3" color="info" onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Redaguoti programą
                </Button>
                <Button className="mb-3 ml-1" color="danger" onClick={this.toggleDeleteModal}>
                    <span className="fa fa-trash fa-lg"></span> Ištrinti
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Redaguoti duomenis</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleUpdateProgram(values)}>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="description" md={3}>Aprašymas</Label>
                                    <Control.textarea model=".description" id="description" name="description"
                                        rows="6" defaultValue={this.props.program.description}
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="personalCode" md={4}>Paciento asm. kodas</Label>
                                <Col md={8}>
                                    <Control.text model=".personalCode" id="personalCode" name="personalCode"
                                        defaultValue={this.props.program.patient.personalCode}
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="stampNr" md={4}>Gydytojo Rašto Nr.</Label>
                                <Col md={8}>
                                    <Control.text model=".stampNr" id="stampNr" name="stampNr"
                                        defaultValue={this.props.program.author.stampNr}
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
                                <Label htmlFor="duration" md={4}>Trukmė</Label>
                                <Col md={8}>
                                    <Control.text model=".duration" id="duration" name="duration"
                                        className="form-control" defaultValue={this.props.program.duration}
                                    />
                                </Col>
                            </Row>
                            <Button type="submit" className="bg-primary">
                                Keisti
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isDeleteModalOpen} toggle={this.toggleDeleteModal}>
                    <ModalHeader toggle={this.toggleDeleteModal}>Ištrinti programą</ModalHeader>
                    <ModalBody>
                        <p>  Ar tikrai norite ištrinti programą? </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn btn-secondary"
                            onClick={this.toggleDeleteModal}>Atšaukti</Button>
                        <Button className="bg-primary" onClick={this.handleDeleteProgram}>Ištrinti</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const ProgramDetail = (props) => {
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.program != null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/programs'>Pacientų programos</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.program.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.program.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderProgram program={props.program}
                        putProgram={props.putProgram}
                        deleteProgram={props.deleteProgram}
                        patient={props.patient}
                        patients={props.patients}
                        users={props.users}
                    />
                </div>

                <div className="row">
                    <RenderPatient program={props.program} />
                </div>
                <div className="row">
                    <RenderExercises exercises={props.exercises}
                        exerciseTypes={props.exerciseTypes}
                        postExercise={props.postExercise}
                        putExercise={props.putExercise}
                        deleteExercise={props.deleteExercise}
                        programId={props.program._id} />
                </div>
            </div>
        );
    else
        return (
            <Redirect to='/programs' />
        );
}

export default ProgramDetail;