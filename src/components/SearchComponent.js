import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, Col, Input, Label, FormGroup, Button } from "reactstrap";
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Component } from 'react';
import { Control, LocalForm } from 'react-redux-form';
import { SearchParams } from '../shared/searchParams';
import Programs from './ProgramsComponent';

//tie search parameters to props like in conctacComponent

class Search extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChanged = this.handleNameChanged.bind(this);
    }

    handleNameChanged(event) {
        SearchParams.searchField = event.target.value;
    }

    handleSubmit(values) {
        SearchParams.newMessage = values.newMessage;
        //alert(SearchParams.newMessage);
        this.forceUpdate();
    }

    render() {
        return (
            <div className="container">
                <div className="col-12 justify-content-center">
                    <LocalForm onSubmit={this.handleSubmit}>
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
                        <FormGroup>
                            <div className="col-4 mt-2" >
                                <div className="form-check">
                                    <Label check>
                                        <Control.checkbox model=".newMessage" name="newMessage" 
                                            className="form-check-input" defaultValue={SearchParams.newMessage}
                                        /> {' '}
                                        <strong>Nauji pranešimai</strong>
                                    </Label>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div className="col-2">
                                <Label htmlFor="label">Progamos būsena </Label>
                            </div>
                            <div className="col-2">
                                <select onChange={this.handleMessageChanged} defaultValue={SearchParams.newMessage} >
                                    <option value="false">Visi</option>
                                    <option value="true">Nauji atsiliepimai</option>
                                </select>
                            </div>
                        </FormGroup>
                    </LocalForm>
                </div>
                <div className="row col-12 justify-content-center">
                    <Programs programs={this.props.programs}
                        postProgram={this.props.postProgram}
                        patients={this.props.patients}
                        programsErrMess={this.props.errMess}
                        messages={this.props.messages} />
                </div>
                {/* follow through errMess path */}

            </div>


        );
    }
}

export default Search;
