import React, { Component } from 'react';
import {
    Card, CardImg, CardImgOverlay, CardHeader, CardText, CardBody, CardSubtitle,
    CardTitle, CardFooter, Breadcrumb, BreadcrumbItem, Label, CardGroup,
    Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Form, Media
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import adParams from '../shared/adParams';
import currDate from '../shared/currDate';
import Youtube from 'react-youtube';


function RenderProgram({ program, putProgram, deleteProgram, patients, users }) {
    return (
        <div className="col-12 m-1">
            <div className="row">
                <div className="col-12 col-sm-6">
                    <h3>{program.description}</h3>
                </div>
                <div className="col-12 col-sm-6">
                    <h3>{new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
                        .format(new Date(Date.parse(program.startDate)))}</h3>
                    <h3>{new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
                        .format(new Date(Date.parse(program.endDate)))}</h3>
                    <h3>Trukmė - {program.duration} d.</h3>
                </div>
                <hr />
            </div>
            <div className="row">
                <div className="col-12">
                    <h4>Programos kodas {program.programCode}</h4>
                    <br></br>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <h4>Įrankiai:</h4> <p>{program.requirements}</p>
                    <br></br>
                </div>
            </div>
            <EditProgramForm program={program} putProgram={putProgram} deleteProgram={deleteProgram} patients={patients} users={users} />
            <hr />
        </div>
    );
}

function RenderMessages({ messages, putMessage }) {
    if (messages != null)
        return (
            <div className="col-12 col-md-5 m-1">
                <h3>Paciento atsiliepimai</h3>
                <ul className="list-unstyled">
                    <Stagger in>
                        {messages.map((message) => {
                            return (
                                <Fade in key={message._id}>
                                    <li>
                                        <p>{message.message}</p>
                                        {!message.messageSeen ?
                                            <p className="text-primary">
                                                Laukia gydytojo apdorojimo &nbsp; <Button outline color="success" data-toggle="tooltip" data-placement="bottom"
                                                    title="Ištrinti atsiliepimą" onClick={() => putMessage(message._id, message.message, true)}>
                                                    <span className="fa fa-check"></span>
                                                </Button></p>
                                            :
                                            <p className="text-success">Apdorotas</p>}
                                        <p>-- {new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
                                            .format(new Date(Date.parse(message.createdAt)))}</p>
                                    </li>
                                </Fade>
                            );
                        })}
                    </Stagger>
                </ul>
                <hr></hr>
            </div>
        );
    else
        return (
            <div className="col-12 col-md-5 m-1"><h3>Paciento atsiliepimų nėra</h3> <br></br></div>
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


class ReactYoutube extends Component {
    constructor(props) {
        super(props);
    }

    videoOnReady(event) {
        event.target.pauseVideo();
    }

    render() {
        const i = (this.props.ytLink).indexOf("=");
        let vidId = (this.props.ytLink).substring(i + 1, i + 12);

        if (i === -1 || vidId.length !== 11) {
            vidId = "jpF_cfyA2Dc";
        }
        const opts = {
            height: '200',
            width: '300',
            playerVars: {
                autoplay: 0
            }
        }
        return (
            <Youtube
                videoId={vidId}
                opts={opts}
                onReady={this.videoOnReady} />
        );
    }
}
function RenderExerciseList({ exercises, programId, postExercise, putExercise, deleteExercise, exerciseTypes }) {
    if (exercises != null) {
        return (
            <div className="col-12">
                <h4>Pratimai</h4>
                <hr></hr>
                <CardGroup>
                    {exercises.map((exercise) => {
                        return (
                            <div className="col-4">
                                <Fade in key={exercise._id}>
                                    <Card color="success" outline>
                                        <CardBody>
                                            <EditExerciseForm exercise={exercise} putExercise={putExercise} deleteExercise={deleteExercise} exerciseTypes={exerciseTypes} />
                                            <CardTitle tag="h5">
                                                <ReactYoutube ytLink={exercise.exerciseType.ytLink} />
                                            </CardTitle>
                                            <CardSubtitle
                                                className="mb-2 text-muted"
                                                tag="h6"
                                            >
                                                {exercise.exerciseType.bodyPart} <hr></hr>
                                            </CardSubtitle>
                                            <CardText>
                                                <b>&nbsp; &nbsp;{exercise.exerciseType.title}<br></br></b>
                                                &nbsp; &nbsp;{exercise.instuructions}<hr></hr>
                                                &nbsp; {exercise.sets} serijos po {exercise.reps} pakartojimų, {exercise.restBreak} pertrauka<hr></hr>
                                                &nbsp; &nbsp;{exercise.exerciseType.inventory}<br></br>
                                                &nbsp; &nbsp;Intensyvumas {exercise.exerciseType.intensity}/5
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </Fade>
                            </div>
                        );
                    })}
                </CardGroup>
                <ExerciseForm programId={programId} postExercise={postExercise} exerciseTypes={exerciseTypes} />
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
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
        try {
            adParams.exerciseTypeId = ((this.props.exerciseTypes.exerciseTypes.filter((exerciseType) => exerciseType._id === values.exerciseTypeSelect)[0])._id);
        }
        catch (err) {
            alert("Pasirinkite pratimų tipą");
            return;
        }

        this.toggleModal();
        this.props.putExercise(this.props.exercise._id, adParams.exerciseTypeId, values.instuructions, values.sets, values.reps, values.restBreak);

        // this.forceUpdate();
    }

    handleDeleteExercise(event) {
        this.toggleDeleteModal();
        this.props.deleteExercise(this.props.exercise._id);

    }
    render() {
        return (
            <div>
                <Button className="mb-3 ml-1" color="info" onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span>
                </Button>
                <Button className="mb-3 ml-1" color="danger" onClick={this.toggleDeleteModal}>
                    <span className="fa fa-trash fa-lg"></span>
                </Button>
                <Link to={`/exerciseTypes/${this.props.exercise.exerciseType._id}`} className='text-link' >
                    <Button className="mb-3 ml-1" color="primary">
                        <span className="fa fa-arrow-right fa-lg"></span>
                    </Button>
                </Link>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Redaguoti pratimo duomenis</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleUpdateExercise(values)}>
                            <Row className="form-group">
                                <Label htmlFor="exerciseTypeSelect" md={6}>Pratimų tipo pasirinkimas</Label>
                                <Col md={12}>
                                    <Control.select model=".exerciseTypeSelect" id="exerciseTypeSelect"
                                        name="exerciseTypeSelect" className="form-control"
                                        defaultValue={this.props.exercise.exerciseType._id}>
                                        {this.props.exerciseTypes.exerciseTypes.map((exerciseType) => (
                                            <option key={exerciseType._id} value={exerciseType._id}>
                                                {exerciseType.bodyPart} --{exerciseType.title}
                                            </option>
                                        ))}
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="sets" md={4}>Serijos</Label>
                                <Col md={8}>
                                    <Control.text model=".sets" id="sets" name="sets"
                                        defaultValue={this.props.exercise.sets}
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="reps" md={4}>Pakartojimai</Label>
                                <Col md={8}>
                                    <Control.text model=".reps" id="reps" name="reps"
                                        defaultValue={this.props.exercise.reps}
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="restBreak" md={4}>Pertrauka sek.</Label>
                                <Col md={8}>
                                    <Control.text model=".restBreak" id="restBreak" name="restBreak"
                                        defaultValue={this.props.exercise.restBreak}
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="instuructions">Pratimo instrukcijos</Label>
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
                    <ModalHeader toggle={this.toggleDeleteModal}>Ištrinti pratimą</ModalHeader>
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
        try {
            adParams.exerciseTypeId = ((this.props.exerciseTypes.exerciseTypes.filter((exerciseType) => exerciseType._id === values.exerciseTypeSelect)[0])._id);
        }
        catch (err) {
            alert("Pasirinkite pratimų tipą");
            return;
        }
        this.toggleModal();
        this.props.postExercise(this.props.programId, adParams.exerciseTypeId, values.instuructions, values.sets, values.reps, values.restBreak);
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
                                <Label htmlFor="exerciseTypeSelect" md={6}>Pratimų tipo pasirinkimas</Label>
                                <Col md={12}>
                                    <Control.select model=".exerciseTypeSelect" id="exerciseTypeSelect" name="exerciseTypeSelect">
                                        <option value="">
                                        </option>
                                        {this.props.exerciseTypes.exerciseTypes.map((exerciseType) => (
                                            <option key={exerciseType._id} value={exerciseType._id}>
                                                {exerciseType.bodyPart} --{exerciseType.title}
                                            </option>
                                        ))}
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="sets" md={4}>Serijos</Label>
                                <Col md={8}>
                                    <Control.text model=".sets" id="sets" name="sets"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="reps" md={4}>Pakartojimai</Label>
                                <Col md={8}>
                                    <Control.text model=".reps" id="reps" name="reps"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="restBreak" md={4}>Pertrauka sek.</Label>
                                <Col md={8}>
                                    <Control.text model=".restBreak" id="restBreak" name="restBreak"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="instuructions">Instrukcijos</Label>
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
            </div >
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
        this.handleStartDateChanged = this.handleStartDateChanged.bind(this);
        this.handleEndDateChanged = this.handleEndDateChanged.bind(this);
        adParams.startDate = new Date(this.props.program.startDate);
        adParams.endDate = new Date(this.props.program.endDate);
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

    handleStartDateChanged(event) {
        adParams.startDate = new Date(event.target.value);
        console.log(`start date ${adParams.startDate}`);
        console.log(typeof adParams.startDate);
    }

    handleEndDateChanged(event) {
        adParams.endDate = new Date(event.target.value);
        console.log(`end date ${adParams.endDate}`);
        console.log(typeof adParams.endDate);
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

        adParams.duration = (adParams.endDate - adParams.startDate) / 1000 / 60 / 60 / 24;

        this.props.putProgram(this.props.program._id, values.description, adParams.duration,
            values.requirements, adParams.personalCode, adParams.stampNr, adParams.startDate, adParams.endDate);
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
                                <Col>
                                    <Label htmlFor="requirements" md={3}>Įrankiai</Label>
                                    <Control.textarea model=".requirements" id="requirements" name="requirements"
                                        rows="3" defaultValue={this.props.program.requirements}
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
                            <Row>
                                <Label htmlFor="startDate" md={4}>Pradžia</Label>
                                <Col md={8}>
                                    <input type="date" className="form-control" id="startDate" name="startDate"
                                        min="2022-01-01" onChange={this.handleStartDateChanged}
                                        defaultValue={new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
                                            .format(new Date(Date.parse(this.props.program.startDate)))}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Label htmlFor="endDate" md={4}>Pabaiga</Label>
                                <Col md={8}>
                                    <input type="date" className="form-control" id="endDate" name="endDate"
                                        min="2022-01-01" onChange={this.handleEndDateChanged}
                                        defaultValue={new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
                                            .format(new Date(Date.parse(this.props.program.endDate)))}
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
                        <BreadcrumbItem active>{props.program.programCode}</BreadcrumbItem>
                    </Breadcrumb>
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
                    <RenderMessages messages={props.messages}
                        putMessage={props.putMessage}
                    />
                    <hr />
                </div>
                <div className="row">
                    <RenderPatient program={props.program} />
                </div>
                <div className="row">
                    <RenderExerciseList exercises={props.exercises}
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