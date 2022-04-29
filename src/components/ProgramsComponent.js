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


function RenderProgramInList({ program, onClick }) {
    return (

        <Media tag="li">
            <Media left middle>
                <Media object src={baseUrl + "images/pic.jpg"} alt={program.name} />
            </Media>
            <Link to={`/programs/${program._id}`} className='text-link' >
                <Media body className="ml-5">
                    <Media heading>{program.name}</Media>
                    <p>{program.name}</p>
                    <p>{program.name}</p>
                </Media>
            </Link>
        </Media>

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
        this.props.postProgram(values.name);
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Nauja programa</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Naujos paciento programos registracija</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="name" md={2}>Vardas</Label>
                                <Col md={10}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Vardas"
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
                    <RenderProgramInList program={program} />
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
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Pagrindinis</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Programos</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row">
                    <CommentForm programs={props.programs} postProgram={props.postProgram} />
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