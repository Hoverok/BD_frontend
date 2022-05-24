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


// class PostPatientForm extends Component {

//     constructor(props) {
//         super(props);

//         this.toggleModal = this.toggleModal.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);

//         this.state = {
//             isNavOpen: false,
//             isModalOpen: false
//         };
//         // console.log("PATIENTS: " + JSON.stringify(this.props.patients))
//         // console.log("PATIENT ID: " + JSON.stringify((this.props.patients.patients[0])))
//     }

//     toggleModal() {
//         this.setState({
//             isModalOpen: !this.state.isModalOpen
//         });
//     }

//     handleSubmit(values) {
//         this.toggleModal();
//         this.props.postPatient(values.name, values.personalCode, values.address, values.telNum, values.email);
//     }

//     render() {
//         return (
//             <div>
//                 <Button color="primary" size="lg" onClick={this.toggleModal}><span className="fa fa-plus fa-lg"></span> Naujas pacientas</Button>
//                 <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
//                     <ModalHeader toggle={this.toggleModal}>Naujos paciento registracija</ModalHeader>
//                     <ModalBody>
//                         <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
//                             <Row className="form-group">
//                                 <Label htmlFor="name" md={2}>Vardas Pavardė</Label>
//                                 <Col md={10}>
//                                     <Control.text model=".name" id="name" name="name"
//                                         placeholder="Vardas Pavardė"
//                                         className="form-control"
//                                     />
//                                 </Col>
//                             </Row>
//                             <Row className="form-group">
//                                 <Label htmlFor="personalCode" md={2}>Asmens kodas</Label>
//                                 <Col md={10}>
//                                     <Control.text model=".personalCode" id="personalCode" name="personalCode"
//                                         placeholder="Asmens Kodas"
//                                         className="form-control"
//                                     />
//                                 </Col>
//                             </Row>
//                             <Row className="form-group">
//                                 <Label htmlFor="address" md={2}>Adresas</Label>
//                                 <Col md={10}>
//                                     <Control.text model=".address" id="address" name="address"
//                                         placeholder="Gatvė Namo Nr.-Būto Nr."
//                                         className="form-control"
//                                     />
//                                 </Col>
//                             </Row>
//                             <Row className="form-group">
//                                 <Label htmlFor="telNum" md={2}>Telefono Numeris</Label>
//                                 <Col md={10}>
//                                     <Control.text model=".telNum" id="telNum" name="telNum"
//                                         placeholder="+370XXXXXXXX"
//                                         className="form-control"
//                                     />
//                                 </Col>
//                             </Row>
//                             <Row className="form-group">
//                                 <Label htmlFor="email" md={2}>El. Paštas</Label>
//                                 <Col md={10}>
//                                     <Control.text model=".email" id="email" name="email"
//                                         placeholder="pavyzdys@email.com"
//                                         className="form-control"
//                                     />
//                                 </Col>
//                             </Row>
//                             <Button type="submit" className="bg-primary">
//                                 Registruoti
//                             </Button>
//                         </LocalForm>
//                     </ModalBody>
//                 </Modal>
//             </div>
//         );
//     }

// }

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
                {/* <PostPatientForm postPatient={props.postPatient} patients={props.patients} /> */}
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