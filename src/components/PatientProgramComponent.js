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
import { Fade, Stagger } from 'react-animation-components';
import Youtube from 'react-youtube';
//_nBlN9yp9R8
// <a href={exercise.ytLink} target="blank">Pratimo vaizdo įrašo nuoroda</a>

function RenderProgram({ program, putProgram, deleteProgram }) {
    return (
        <div className="row">
            <div className="col-12 m-1">
                <div className="d-none d-sm-block">
                    <span className="badge badge-info">{program.programStatus}</span>
                </div>
                <h4>Paciento informacija:</h4>
                <p>Asmens Kodas: {program.personalCode}</p>
                <hr />
            </div>
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


function RenderExercises({ exercises, programId, postExercise, putExercise, deleteExercise }) {
    if (exercises != null)
        return (
            <div className="row">
                <div className="col-12 m-1">
                    <h4>Pratimai</h4>
                    <Stagger in>
                        {exercises.map((exercise) => {
                            return (
                                <Fade in key={exercise._id}>
                                    <Card color="secondary">
                                        <Card body>
                                            <CardBody>
                                                <CardTitle tag="h5">
                                                    {exercise.name}<br></br>
                                                    Intensyvumas: {exercise.difficulty}/5
                                                </CardTitle>
                                                <CardText>
                                                    {exercise.comment}
                                                </CardText>
                                                <CardSubtitle
                                                    className="mb-2 text-muted"
                                                    tag="h6">
                                                    Atnaujino: {exercise.author.firstname} {exercise.author.lastname} <br></br>
                                                    Paskutinio atnaujinimo data ir laikas: {new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
                                                        .format(new Date(Date.parse(exercise.updatedAt)))}
                                                </CardSubtitle>
                                                <CardFooter className="d-flex justify-content-center">
                                                    <ReactYoutube ytLink={exercise.ytLink} />
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
                    <div className="col-12">
                        <h3>{props.program.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <RenderExercises exercises={props.exercises}
                            programId={props.program._id} />
                    </div>
                </div>
            </div>
        );
    else
        return (
            <div> </div>
        );
}

export default PatientProgramDetail;