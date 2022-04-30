import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, Media, Form, Input, Label, FormGroup, Button } from "reactstrap";
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Component } from 'react';
import { SearchParams } from '../shared/searchParams';
import Programs from './ProgramsComponent';

//tie search parameters to props like in conctacComponent

class Search extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChanged = this.handleNameChanged.bind(this);
        this.handleProgramStatusChanged = this.handleProgramStatusChanged.bind(this);
    }

    handleNameChanged(event) {
        SearchParams.searchField = event.target.value;
    }

    handleProgramStatusChanged(event) {
        SearchParams.programStatus = event.target.value;
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
                                <Input type="text" className="form-control" id="name" name="name"
                                    placeholder="Įveskite paieškos parametrus" defaultValue={SearchParams.searchField} onChange={this.handleNameChanged} />
                            </div>
                            <div className="col-2 mt-2">
                                <Button type="submit" className="btn btn-primary">
                                    <span className="fa fa-search fa-lg"></span>
                                </Button>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div className="col-2">
                                <Label htmlFor="label">Progamos būsena </Label>
                            </div>
                            <div className="col-2">
                                <select onChange={this.handleProgramStatusChanged} defaultValue={SearchParams.programStatus} >
                                    <option value=""></option>
                                    <option value="Laukia">Laukia</option>
                                    <option value="Aktyvi">Aktyvi</option>
                                    <option value="Baigta">Baigta</option>
                                </select>
                            </div>
                        </FormGroup>
                    </Form>

                </div>

                <div className="row col-12 justify-content-center">
                    <Programs programs={this.props.programs}
                        postProgram={this.props.postProgram}
                        programsErrMess={this.props.programs.errMess} />
                </div>


            </div>


        );
    }
}

export default Search;
