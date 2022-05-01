import React, { Component } from 'react';
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Label,
    Modal, ModalHeader, ModalBody, Button, Row, Col, Form
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import adParams from '../shared/adParams';

function RenderProgram({ program, putProgram, deleteProgram }) {
    return (
        <div className="row">
            <div className="col-12 m-1">
                <EditProgramForm program={program} putProgram={putProgram} deleteProgram={deleteProgram} />
                <div className="d-none d-sm-block">
                    <span className="badge badge-info">{program.programStatus}</span>
                </div>
                <h4>Paciento informacija:</h4>
                <p>Asmens Kodas: {program.personalCode}</p>
            </div>
        </div>
    );
}

function RenderExercises({ exercises, programId, postExercise, putExercise }) {
    if (exercises != null)
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Exercises</h4>
                <ul className="list-unstyled">
                    <Stagger in>
                        {exercises.map((exercise) => {
                            return (
                                <Fade in key={exercise._id}>
                                    <EditExerciseForm exercise={exercise} putExercise={putExercise} />
                                    <li>
                                        <p>{exercise.name}</p>
                                        <p>{exercise.ytLink}</p>
                                        <p>{exercise.difficulty}/5</p>
                                        <p>{exercise.comment}</p>
                                        <p>-- {exercise.author.firstname} {exercise.author.lastname} , {new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(Date.parse(exercise.updatedAt)))}</p>
                                    </li>
                                </Fade>
                            );
                        })}
                    </Stagger>
                </ul>
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
        this.props.putExercise(this.props.exercise._id, values.name, values.ytLink, values.difficulty, values.comment);
    }

    handleDeleteExercise(event) {
        this.toggleDeleteModal();
        this.props.handleDeleteExercise(this.props.exercise._id);

    }
    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Redaguoti duomenis
                </Button>
                {"   "}
                <Button outline onClick={this.toggleDeleteModal}>
                    <span className="fa fa-trash fa-lg"></span> Ištrinti
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Redaguoti pratimo duomenis</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleUpdateExercise(values)}>
                            <Row className="form-group">
                                <Label htmlFor="name" md={3}>Pavadinimas</Label>
                                <Col md={9}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="pavadinimas"
                                        defaultValue={this.props.exercise.name}
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="difficulty" md={3}>Intensyvumas</Label>
                                <Col md={3}>
                                    <Control.select model=".difficulty" id="difficulty" name="difficulty"
                                        defaultValue={this.props.exercise.difficulty}
                                        className="form-control">
                                        <option></option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="ytLink" md={3}>Nuoroda</Label>
                                    <Control.textarea model=".ytLink" id="ytLink" name="ytLink"
                                        rows="2" defaultValue={this.props.exercise.ytLink}
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="comment">Specialisto komentaras</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="8" defaultValue={this.props.exercise.comment}
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
                    <ModalHeader toggle={this.toggleDeleteModal}>Redaguoti paciento duomenis</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleDeleteProgram}>
                            <div className="form-row">
                                <div className="form-group col-sm-12">
                                    <p>Ar tikrai norite ištrinti programą? </p>
                                </div>
                            </div>
                            <div className="form-row">
                                <Button type="cancel" className="btn btn-secondary btn-sm ml-auto"
                                    data-dismiss="modal">Atšaukti</Button>
                                <Button type="submit" className="bg-primary">Ištrinti</Button>
                            </div>
                        </Form>
                    </ModalBody>
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
        this.props.postExercise(this.props.programId, values.name, values.ytLink, values.difficulty, values.comment);
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Pridėti pratimą </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Pridėti pratimą</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="name" md={3}>Pavadinimas</Label>
                                <Col md={9}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="pavadinimas"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="difficulty" md={3}>Intensyvumas</Label>
                                <Col md={3}>
                                    <Control.select model=".difficulty" id="difficulty" name="difficulty"
                                        className="form-control">
                                        <option></option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="ytLink" md={3}>Nuoroda</Label>
                                    <Control.textarea model=".ytLink" id="ytLink" name="ytLink"
                                        rows="2" className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="comment">Specialisto komentaras</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment"
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
        this.props.putProgram(this.props.program._id, values.name, values.personalCode, values.programStatus);
        //this.props.postProgram(values.name, values.personalCode, values.programStatus);
    }

    handleDeleteProgram(event) {
        this.toggleDeleteModal();
        this.props.deleteProgram(this.props.program._id);

    }
    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Redaguoti duomenis
                </Button>
                {"   "}
                <Button outline onClick={this.toggleDeleteModal}>
                    <span className="fa fa-trash fa-lg"></span> Ištrinti
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Redaguoti duomenis</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleUpdateProgram(values)}>
                            <Row className="form-group">
                                <Label htmlFor="name" md={2}>Vardas</Label>
                                <Col md={10}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Vardas"
                                        defaultValue={this.props.program.name}
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="personalCode" md={2}>Asmens kodas</Label>
                                <Col md={10}>
                                    <Control.text model=".personalCode" id="personalCode" name="personalCode"
                                        placeholder="Asmens Kodas"
                                        defaultValue={this.props.program.personalCode}
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="programStatus" md={2}>Būsena</Label>
                                <Col md={6}>
                                    <Control.select model=".programStatus" id="programStatus" name="programStatus"
                                        defaultValue={this.props.program.programStatus}
                                        className="form-control">
                                        <option value=""></option>
                                        <option value="Laukia">Laukia</option>
                                        <option value="Aktyvi">Aktyvi</option>
                                        <option value="Baigta">Baigta</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Button type="submit" className="bg-primary">
                                Keisti
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isDeleteModalOpen} toggle={this.toggleDeleteModal}>
                    <ModalHeader toggle={this.toggleDeleteModal}>Redaguoti paciento duomenis</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleDeleteProgram}>
                            <div className="form-row">
                                <div className="form-group col-sm-12">
                                    <p>Ar tikrai norite ištrinti programą? </p>
                                </div>
                            </div>
                            <div className="form-row">
                                <Button type="cancel" className="btn btn-secondary btn-sm ml-auto"
                                    data-dismiss="modal">Atšaukti</Button>
                                <Button type="submit" className="bg-primary">Ištrinti</Button>
                            </div>
                        </Form>
                    </ModalBody>
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
                        <p>Program ID: {props.program._id}</p>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderProgram program={props.program}
                        putProgram={props.putProgram}
                        deleteProgram={props.deleteProgram} />
                    <RenderExercises exercises={props.exercises}
                        postExercise={props.postExercise}
                        putExercise={props.putExercise} />
                </div>
            </div>
        );
    else
        return (
            <Redirect to='/programs' />
        );
}

export default ProgramDetail;