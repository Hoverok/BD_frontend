import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, Media, Form, Input, Label, FormGroup, Button } from "reactstrap";
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Component } from 'react';
import { SearchUsersParams} from '../shared/searchUsersParams';
import Users from './UsersComponent';

//tie search parameters to props like in conctacComponent

class SearchUsers extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChanged = this.handleNameChanged.bind(this);
    }

    handleNameChanged(event) {
        SearchUsersParams.searchField = event.target.value;
    }


    handleSubmit(event) {
        event.preventDefault();
        this.forceUpdate();
    }

    render() {
        return (
            <div className="container">
                <div className="col-12 justify-content-center">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <div className="col-10 mt-2" >
                                <Input type="text" className="form-control" id="searcName" name="searcName"
                                    placeholder="Įveskite paieškos parametrus" defaultValue={SearchUsersParams.searchField} onChange={this.handleNameChanged} />
                            </div>
                            <div className="col-2 mt-2">
                                <Button type="submit" className="btn btn-primary">
                                    <span className="fa fa-search fa-lg"></span>
                                </Button>
                            </div>
                        </FormGroup>
                    </Form>

                </div>

                <div className="row col-12 justify-content-center">
                    <Users
                        postUser={this.props.postUser}
                        users={this.props.users}
                        //patientsErrMess={this.props.patients.patientsErrMess}
                         />
                </div>


            </div>


        );
    }
}

export default SearchUsers;
