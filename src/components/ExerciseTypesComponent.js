import React, { Component } from 'react';
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, CardGroup, Label,
    Modal, ModalHeader, ModalBody, Button, Row, Col, Media, CardSubtitle
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { baseUrl } from '../shared/baseUrl';
import { Fade } from 'react-animation-components';
import { SearchExerciseTypesParams } from '../shared/searchExerciseTypesParams';
import Youtube from 'react-youtube';


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



function RenderExerciseTypeList({ exerciseType }) {
    if (((exerciseType.title.toLowerCase()).includes(SearchExerciseTypesParams.searchField.toLowerCase())) &&
    ((exerciseType.bodyPart).includes(SearchExerciseTypesParams.bodyPart))) {
        return (
            <Link to={`/exercisetypes/${exerciseType._id}`} className='text-link' >
                <Card color="success" inverse>
                    <CardBody>
                        <CardTitle tag="h5">
                            <ReactYoutube ytLink={exerciseType.ytLink} />
                            {exerciseType.bodyPart} <hr></hr>
                        </CardTitle>
                        <CardText>
                            <b>&nbsp; &nbsp;{exerciseType.title}<br></br>
                                &nbsp; &nbsp;{exerciseType.intensity}/5 <br></br>
                                &nbsp; &nbsp;{exerciseType.inventory}</b>
                        </CardText>
                    </CardBody>
                </Card>

            </Link>
        );
    }
    else if (((exerciseType.title.toLowerCase()).includes(SearchExerciseTypesParams.searchField.toLowerCase())) &&
    (exerciseType.bodyPart === '')) {
        return (
            <Link to={`/exercisetypes/${exerciseType._id}`} className='text-link' >

                <Card color="success">
                    <CardBody>
                        <CardTitle tag="h5">
                            <ReactYoutube ytLink={exerciseType.ytLink} />
                            {exerciseType.bodyPart}
                        </CardTitle>
                        <CardText>
                            <b>&nbsp; &nbsp;{exerciseType.title}<br></br>
                                &nbsp; &nbsp;{exerciseType.intensity}/5 <br></br>
                                &nbsp; &nbsp;{exerciseType.inventory}</b>
                        </CardText>
                    </CardBody>
                </Card>

            </Link>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}



class PostExerciseTypeForm extends Component {

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
        this.props.postExerciseType(values.ytLink, values.bodyPart, values.title, values.intensity, values.inventory);
    }

    render() {
        return (
            <div>
                <Button color="success" size="lg" onClick={this.toggleModal}><span className="fa fa-plus fa-lg"></span> Naujas pratimų tipas</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Naujos pratimų tipo įvedimas</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="ytLink" md={3}>Nuoroda</Label>
                                <Col md={9}>
                                    <Control.text model=".ytLink" id="ytLink" name="ytLink"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="bodyPart" md={3}>Kūno dalis</Label>
                                <Col md={9}>
                                    <Control.select model=".bodyPart" id="bodyPart" name="bodyPart"
                                        className="form-control">
                                        <option value=""></option>
                                        <option value="alkūnė/dilbis">Alkūnė/Dilbis</option>
                                        <option value="dubuo/šlaunis">Dubuo/Šlaunis</option>
                                        <option value="galva/kaklas">Galva/Kaklas</option>
                                        <option value="kulkšnis/pėda">Kulkšnis/Pėda</option>
                                        <option value="liemuo/nugara">Liemuo/Nugara</option>
                                        <option value="petys/žastas">Petys/Žastas</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="title" md={3}>Pavadinimas</Label>
                                <Col md={9}>
                                    <Control.text model=".title" id="title" name="title"
                                        placeholder=""
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="intensity" md={3}>Intensyvumas</Label>
                                <Col md={3}>
                                    <Control.select model=".intensity" id="intensity" name="intensity"
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
                                    <Label htmlFor="inventory" md={3}>Įrankiai</Label>
                                    <Control.textarea model=".inventory" id="inventory" name="inventory"
                                        rows="3"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Button type="submit" className="bg-primary">
                                Įvesti
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

}

const ExerciseTypes = (props) => {
    const exerciseTypes = props.exerciseTypes.exerciseTypes.map((exerciseType) => {
        return (
            <RenderExerciseTypeList exerciseType={exerciseType} />
        );
    });

    if (props.exerciseTypes.exerciseTypesErrMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.exerciseTypes.exerciseTypesErrMess}</h4>
                </div>
            </div>
        );
    }
    else
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <PostExerciseTypeForm postExerciseType={props.postExerciseType} exerciseTypes={props.exerciseTypes} />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h2 className="exerciseTypes-title">Pratimų tipai</h2>
                        <hr></hr>
                    </div>
                    <div className="row">

                        <CardGroup>
                            {exerciseTypes}
                        </CardGroup>

                    </div>
                </div>
            </div>
        );
}


export default ExerciseTypes;