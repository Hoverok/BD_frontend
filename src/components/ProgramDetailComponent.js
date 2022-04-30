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
                <EditProgramForm program={program} putProgram={putProgram} deleteProgram={deleteProgram}/>
                <div className="d-none d-sm-block">
                    <span className="badge badge-info">{program.programStatus}</span>
                </div>
                <h4>Paciento informacija:</h4>
                <p>Asmens Kodas: {program.personalCode}</p>
            </div>
        </div>
    );

}

function RenderComments({ comments, postComment, dishId }) {
    if (comments != null)
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in>
                        {comments.map((comment) => {
                            return (
                                <Fade in key={comment._id}>
                                    <li>
                                        <p>{comment.comment}</p>
                                        <p>{comment.rating} stars</p>
                                        <p>-- {comment.author.firstname} {comment.author.lastname} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.updatedAt)))}</p>
                                    </li>
                                </Fade>
                            );
                        })}
                    </Stagger>
                </ul>
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        );
    else
        return (
            <div></div>
        );
}

class CommentForm extends Component {

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
        this.props.postComment(this.props.dishId, values.rating, values.comment);
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" id="rating" className="form-control">
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
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" id="comment"
                                        rows="6" className="form-control" />
                                </Col>
                            </Row>
                            <Button type="submit" className="bg-primary">
                                Submit
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
        this.handleUpdateAd = this.handleUpdateAd.bind(this);
        this.handleDeleteAd = this.handleDeleteAd.bind(this);
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

    handleUpdateAd(values) {
        this.toggleModal();
        this.props.putProgram(this.props.program._id, values.name, values.personalCode, values.programStatus);
        //this.props.postProgram(values.name, values.personalCode, values.programStatus);
    }

    handleDeleteAd(event) {
        this.toggleDeleteModal();
        this.props.deleteProgram(this.props.program._id);

    }

    handleNameChanged(event) {
        adParams.name = event.target.value;
    }

    handlePersonalCodeChanged(event) {
        adParams.personalCode = event.target.value;
    }

    handleLabelProgramStatusChanged(event) {
        adParams.programStatus = event.target.value;
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
                        <LocalForm onSubmit={(values) => this.handleUpdateAd(values)}>
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
                        <Form onSubmit={this.handleDeleteAd}>
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
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderProgram program={props.program} putProgram={props.putProgram} deleteProgram={props.deleteProgram} />
                </div>
            </div>
        );
    else
        return (
            <Redirect to='/programs' />
        );
}

export default ProgramDetail;