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
import { SearchUsersParams } from '../shared/searchUsersParams';


function RenderUserList({ user, onClick }) {
    if ((user.fullName.toLowerCase()).includes(SearchUsersParams.searchField.toLowerCase())
        || (user.stampNr.toLowerCase()).includes(SearchUsersParams.searchField.toLowerCase())) {
        return (
            <Link to={`/users/${user._id}`} className='text-link' >
                <div className='row patient-border'>
                    <div className="col-12 col-sm-8">
                        <h4>{user.fullName}</h4>
                    </div>
                    <div className="col-12 col-sm-3">
                        <h4>{user.stampNr}</h4>
                    </div>
                </div>
            </Link>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}


class PostUserForm extends Component {

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
        this.props.postUser(values.userName, values.password, values.stampNr, values.name, values.email);
    }

    render() {
        return (
            <div>
                <Button color="primary" size="lg" onClick={this.toggleModal}><span className="fa fa-plus fa-lg"></span> Naujas kineziterapeutas</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Naujos paciento registracija</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="userName" md={3}>Prisijungimo vardas</Label>
                                <Col md={9}>
                                    <Control.text model=".userName" id="userName" name="userName"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="password" md={3}>Slaptažodis</Label>
                                <Col md={9}>
                                    <Control.password model=".password" id="password" name="password"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" md={3}>Vardas Pavardė</Label>
                                <Col md={9}>
                                    <Control.text model=".name" id="name" name="name"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="stampNr" md={3}>Rašto Nr.</Label>
                                <Col md={9}>
                                    <Control.text model=".stampNr" id="stampNr" name="stampNr"

                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={3}>El. Paštas</Label>
                                <Col md={9}>
                                    <Control.text model=".email" id="email" name="email"

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

const Users = (props) => {
    const users = props.users.users.map((user) => {
        return (
            <Fade in key={user._id}>
                <div className="mt-2">
                    <RenderUserList user={user} />
                </div>
            </Fade>
        );
    });

    // if (props.patients.patientsErrMess) {
    //     return (
    //         <div className="container">
    //             <div className="row">
    //                 <h4>{props.patients.patientsErrMess}</h4>
    //             </div>
    //         </div>
    //     );
    // }
    return (
        <div className="container">
            <div className="row">
            </div>
            <div className="row">
                <PostUserForm postUser={props.postUser}/>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h2>Kineziterapeutai</h2>
                </div>
                <div className="row">
                    <div className="col-12">
                        {users}
                    </div>
                </div>
            </div>
        </div>
    );


}

export default Users;