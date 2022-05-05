import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, Media, Form, Input, Label, FormGroup, Button } from "reactstrap";
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Component } from 'react';
import { SearchExerciseTypesParams} from '../shared/searchExerciseTypesParams';
import ExerciseTypes from './ExerciseTypesComponent';


class SearchExerciseTypes extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChanged = this.handleNameChanged.bind(this);
    }

    handleNameChanged(event) {
        SearchExerciseTypesParams.searchField = event.target.value;
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
                                    placeholder="Įveskite paieškos parametrus" defaultValue={SearchExerciseTypesParams.searchField} onChange={this.handleNameChanged} />
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
                    <ExerciseTypes
                        postExerciseType={this.props.postExerciseType}
                        exerciseTypes={this.props.exerciseTypes}
                        exerciseTypesErrMess={this.props.exerciseTypes.exerciseTypesErrMess} />
                </div>
            </div>


        );
    }
}

export default SearchExerciseTypes;
