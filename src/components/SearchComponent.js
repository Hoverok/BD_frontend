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
        this.handleLabelChanged = this.handleLabelChanged.bind(this);
    }

    handleNameChanged(event) {
        SearchParams.name = event.target.value;
    }

    handleLabelChanged(event) {
        SearchParams.label = event.target.value;
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
                            <div className="col-10">
                                <Input type="text" className="form-control" id="name" name="name"
                                    placeholder="Įveskite paieškos parametrus" defaultValue={SearchParams.name} onChange={this.handleNameChanged} />
                            </div>
                            <div className="col-2">
                                <Button type="submit" className="btn btn-primary">
                                    <span className="fa fa-search fa-lg"></span>
                                </Button>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div className="col-2">
                                <Label htmlFor="label">Progamos būsena </Label>
                            </div>
                            <div className="col-4">
                                <select onChange={this.handleLabelChanged} >
                                    <option value=""></option>
                                    <option value="Jėga">Jėga</option>
                                    <option value="Ištvermė">Ištvermė</option>
                                    <option value="H.I.I.T">H.I.I.T</option>
                                    <option value="Crossfit">Crossfit</option>
                                    <option value="Reabilitacija">Reabilitacija</option>
                                    <option value="Svorio metimas">Svorio metimas</option>
                                    <option value="Svorio priaugimas">Svorio priaugimas</option>
                                    <option value="Kūno skulptūra">Kūno skulptūra</option>
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
