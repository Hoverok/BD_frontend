import React, { Component } from 'react';
import {
    Card, CardImg, CardImgOverlay, CardHeader, CardText, CardBody, CardSubtitle,
    CardTitle, CardFooter, Breadcrumb, BreadcrumbItem, Label,
    Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Form, Media
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import Youtube from 'react-youtube';



function RenderExerciseType({ exerciseType, putExerciseType, deleteExerciseType }) {
    return (
        <div className="col-12 m-1">
            <EditExerciseTypeForm exerciseType={exerciseType} putExerciseType={putExerciseType} deleteExerciseType={deleteExerciseType} />
            <h3>Pratimo informacija:</h3>
            <br></br>
            <div className='row'>
                <div className="col-12 col-sm-2">
                    <p>Pratimo ID:</p>
                    <p>Pavadinimas:</p>
                    <p>Intensyvumas:</p>
                    <p>Įrankiai:</p>
                    <p>Vaizdo įrašas</p>
                </div>
                <div className="col-12 col-sm-6">
                    <p><b>{exerciseType._id}</b></p>
                    <p><b>{exerciseType.title}</b></p>
                    <p><b>{exerciseType.intensity}/5</b></p>
                    <p><b>{exerciseType.inventory}</b></p>
                    <br></br>
                    <ReactYoutube ytLink={exerciseType.ytLink} />
                </div>
            </div>
            <hr />
        </div>
    );
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
            height: '500',
            width: '800',
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

class EditExerciseTypeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            isDeleteModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        this.handleUpdateExerciseType = this.handleUpdateExerciseType.bind(this);
        this.handleDeleteExerciseType = this.handleDeleteExerciseType.bind(this);
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

    handleUpdateExerciseType(values) {
        this.toggleModal();
        this.props.putExerciseType(this.props.exerciseType._id, values.ytLink, values.title, values.intensity, values.inventory);
    }

    handleDeleteExerciseType(event) {
        this.toggleDeleteModal();
        this.props.handleDeleteExerciseType(this.props.exerciseType._id);

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
                        <LocalForm onSubmit={(values) => this.handleUpdateExerciseType(values)}>
                            <Row className="form-group">
                                <Label htmlFor="ytLink" md={3}>Nuoroda</Label>
                                <Col md={9}>
                                    <Control.text model=".ytLink" id="ytLink" name="ytLink"
                                        className="form-control"
                                        defaultValue={this.props.exerciseType.ytLink}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="title" md={3}>Pavadinimas</Label>
                                <Col md={9}>
                                    <Control.text model=".title" id="title" name="title"
                                        placeholder="Pavadinimas"
                                        className="form-control"
                                        defaultValue={this.props.exerciseType.title}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="intensity" md={3}>Intensyvumas</Label>
                                <Col md={3}>
                                    <Control.select model=".intensity" id="intensity" name="intensity"
                                        className="form-control"
                                        defaultValue={this.props.exerciseType.intensity}>
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
                                    <Label htmlFor="inventory" md={3}>Įrankiai</Label>
                                    <Control.textarea model=".inventory" id="inventory" name="inventory"
                                        rows="3"
                                        className="form-control"
                                        defaultValue={this.props.exerciseType.inventory}
                                    />
                                </Col>
                            </Row>
                            <Button type="submit" className="bg-primary">
                                Įvesti
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
                        <Button className="bg-primary" onClick={this.handleDeleteExerciseType}>Ištrinti</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const ExerciseTypeDetail = (props) => {
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.exerciseType != null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/exercisetypes'>Pratimai</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.exerciseType.title}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.exerciseType.title}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderExerciseType exerciseType={props.exerciseType}
                        putExerciseType={props.putExerciseType}
                        deleteExerciseType={props.deleteExerciseType}
                    />
                </div>
            </div>
        );
    else
        return (
            // <Redirect to='/exercisetypes' />
            <div></div>
        );
}

export default ExerciseTypeDetail;