import React, { Component } from 'react';
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Label,
    Modal, ModalHeader, ModalBody, Button, Row, Col, Media
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { baseUrl } from '../shared/baseUrl';
import { Fade } from 'react-animation-components';
import { SearchExerciseTypesParams } from '../shared/searchExerciseTypesParams';


function RenderExerciseTypeList({ exerciseType, onClick }) {
    if (SearchExerciseTypesParams.searchField === '') {
        return (
            <Media tag="li">
                <Media left middle>
                    <Media object src={baseUrl + "images/exercise.png"} alt={exerciseType.name} />
                </Media>
                <Link to={`/exercisetypes/${exerciseType._id}`} className='text-link' >
                    <Media body className="ml-5">
                        <Media heading>{exerciseType.title}</Media>
                        <p>{exerciseType.ytLink}</p>
                        <p>{exerciseType._id}</p>
                        <p> Atnaujinta: {new Intl.DateTimeFormat('fr-CA',
                            { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
                            .format(new Date(Date.parse(exerciseType.updatedAt)))}</p>
                    </Media>
                </Link>
            </Media>
        );
    }
    else if ((exerciseType.title.toLowerCase()).includes(SearchExerciseTypesParams.searchField.toLowerCase())) {
        return (
            <Media tag="li">
                <Media left middle>
                    <Media object src={baseUrl + "images/exercise.png"} alt={exerciseType.name} />
                </Media>
                <Link to={`/exercisetypes/${exerciseType._id}`} className='text-link' >
                    <Media body className="ml-5">
                        <Media heading>{exerciseType.title}</Media>
                        <p>{exerciseType.ytLink}</p>
                        <p> Atnaujinta: {new Intl.DateTimeFormat('fr-CA',
                            { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
                            .format(new Date(Date.parse(exerciseType.updatedAt)))}</p>
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
        this.props.postExerciseType(values.ytLink, values.title, values.intensity, values.inventory);
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-plus fa-lg"></span> Naujas pratimų tipas</Button>
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
                                <Label htmlFor="title" md={3}>Pavadinimas</Label>
                                <Col md={9}>
                                    <Control.text model=".title" id="title" name="title"
                                        placeholder="Pavadinimas"
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
        console.log("exerciseType._id " + exerciseType._id)
        return (
            <Fade in key={exerciseType._id}>
                <div className="col-12 mt-2">
                    <RenderExerciseTypeList exerciseType={exerciseType} />
                </div>
            </Fade>
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
                </div>
                <div className="row">
                    <PostExerciseTypeForm postExerciseType={props.postExerciseType} exerciseTypes={props.exerciseTypes} />
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h2>Pratimų tipai</h2>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {exerciseTypes}
                        </div>
                    </div>
                </div>
            </div>
        );
}


export default ExerciseTypes;