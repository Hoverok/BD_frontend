import React, { Component } from 'react';
import {
    Card, Button, CardImgOverlay, CardHeader, CardText, CardBody, CardSubtitle,
    CardTitle, CardFooter, Breadcrumb, BreadcrumbItem, Label,
    Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Form, Media
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Fade, Stagger } from 'react-animation-components';
import Youtube from 'react-youtube';
//_nBlN9yp9R8
// <a href={exercise.ytLink} target="blank">Pratimo vaizdo įrašo nuoroda</a>

function RenderMessages({ messages, postMessage, deleteMessage, programId }) {
    if (messages != null)
        return (
            <div className="col-12 col-md-5 m-1">
                <ul className="list-unstyled">
                    <Stagger in>
                        {messages.map((message) => {
                            return (
                                <Fade in key={message._id}>
                                    <li>
                                        <p>{message.message}</p>
                                        {!message.messageSeen ?
                                            <p className="text-primary">
                                                Laukia gydytojo apdorojimo &nbsp;<Button outline color="danger" data-toggle="tooltip" data-placement="bottom"
                                                    title="Ištrinti atsiliepimą" onClick={() => deleteMessage(message._id)}>
                                                    <span className="fa fa-times"></span>
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
                <MessageForm programId={programId} postMessage={postMessage} />
                <hr></hr>
            </div>
        );
    else
        return (
            <div></div>
        );
}

class MessageForm extends Component {

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
        this.props.postMessage(this.props.programId, values.message);
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Parašyti gydytojui</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}> Parašyti atsiliepimą gydytojui apie programą</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="message">Atsiliepimas</Label>
                                    <Control.textarea model=".message" id="message"
                                        rows="3" className="form-control" />
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


function RenderExercises({ exercises }) {
    if (exercises != null)
        return (
            <div className="row">
                <div className="col-12 m-1">
                    <h2>Pratimai</h2>
                    <Stagger in>
                        {exercises.map((exercise) => {
                            return (
                                <Fade in key={exercise._id}>
                                    <Card color="secondary">
                                        <Card body>
                                            <CardBody>
                                                <CardTitle>
                                                    <h3>{exercise.exerciseType.title}<br></br></h3>
                                                </CardTitle>
                                                <CardText>
                                                    <b>Instrukijos:</b>&nbsp; {exercise.sets} serijos po {exercise.reps} pakartojimų, {exercise.restBreak} sek. pertrauka<hr></hr>
                                                    <h4>{exercise.instuructions}</h4>
                                                    <p><b>Įrankiai:</b> {exercise.exerciseType.inventory}</p>
                                                    <p><b>Intensyvumas:</b> {exercise.exerciseType.intensity}/5</p>
                                                </CardText>
                                                <CardSubtitle
                                                    className="mb-2 text-muted"
                                                    tag="h6">
                                                    Atnaujino: {exercise.author.fullName} <br></br>
                                                    Paskutinio atnaujinimo data ir laikas: {new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
                                                        .format(new Date(Date.parse(exercise.updatedAt)))}
                                                </CardSubtitle>
                                                <CardFooter className="d-flex justify-content-center">
                                                    <ReactYoutube ytLink={exercise.exerciseType.ytLink} />
                                                </CardFooter>
                                            </CardBody>
                                        </Card>
                                    </Card>
                                </Fade>
                            );
                        })}
                    </Stagger>
                </div>
            </div>
        );
    else
        return (
            <div></div>
        );
}


const PatientProgramDetail = (props) => {
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
                    <div className="col-12 col-sm-6">
                        <h2>{props.program.patient.fullName}</h2>
                        <h2>Trukmė - {props.program.duration} d.</h2><hr></hr>
                    </div>
                    <div className="col-12 col-sm-6">
                        <h2>Nuo {new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
                            .format(new Date(Date.parse(props.program.startDate)))} iki&nbsp; 
                        {new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
                            .format(new Date(Date.parse(props.program.endDate)))} </h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h3>{props.program.description}</h3><hr></hr>
                        <h5>Įrankiai: {props.program.requirements}</h5><hr></hr>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h3>Jųsų atsiliepimai</h3>
                    </div>
                    <RenderMessages messages={props.messages}
                        postMessage={props.postMessage}
                        deleteMessage={props.deleteMessage}
                        programId={props.program._id} />
                </div>
                <div className="row">
                    <div className="col-12">
                        <RenderExercises exercises={props.exercises}
                            programId={props.program._id} />
                    </div>
                </div>
            </div >
        );
    else
        return (
            <div> </div>
        );
}

export default PatientProgramDetail;