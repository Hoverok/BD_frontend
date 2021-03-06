import React, { Component } from 'react';
import ProgramDetail from './ProgramDetailComponent';
import PatientDetail from './PatientDetailComponent';
import ExerciseTypeDetail from './ExerciseTypeDetail';
import PatientProgramDetail from './PatientProgramComponent';
import UserDetail from './UserDetailComponent';
import Search from './SearchComponent';
import SearchPatients from './SearchPatientsComponent';
import SearchExerciseTypes from './SearchExerciseTypesComponent';
import AuthLog from './AuthLogComponent';
import SearchUsers from './SearchUsersComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Favorites from './FavoriteComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchUsers, postUser, deleteUser,
  fetchPrograms, postProgram, putProgram, deleteProgram, fetchExercises, postExercise, putExercise, deleteExercise,
  fetchPatients, postPatient, putPatient, deletePatient, fetchExerciseTypes, postExerciseType, putExerciseType, deleteExerciseType,
  fetchMessages, postMessage, putMessage, deleteMessage,
  postComment, postFeedback, fetchDishes, fetchComments, fetchPromos, fetchLeaders,
  loginUser, logoutUser, fetchFavorites, postFavorite, deleteFavorite
} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup } from 'react-transition-group';

const mapStateToProps = state => { //maps redux store state to props that become available in this component
  return {
    users: state.users,
    programs: state.programs,
    exercises: state.exercises,
    patients: state.patients,
    exerciseTypes: state.exerciseTypes,
    messages: state.messages,

    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    favorites: state.favorites,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => ({ //obtain action object and dispatching it to store
  fetchUsers: () => { dispatch(fetchUsers()) },
  postUser: (username, password, stampNr, fullName, email) => dispatch(postUser(username, password, stampNr, fullName, email)),
  deleteUser: (userId) => dispatch(deleteUser(userId)),
  fetchPrograms: () => { dispatch(fetchPrograms()) },
  postProgram: (description, duration, patientId, startDate, endDate, programCode) => dispatch(postProgram(description, duration, patientId, startDate, endDate, programCode)),
  putProgram: (programId, description, duration, requirements, patientId, doctorId, startDate, endDate) =>
    dispatch(putProgram(programId, description, duration, requirements, patientId, doctorId, startDate, endDate)),
  deleteProgram: (programId) => dispatch(deleteProgram(programId)),
  fetchExercises: () => { dispatch(fetchExercises()) },
  postExercise: (programId, exerciseTypeId, instuructions, sets, reps, restBreak) => dispatch(postExercise(programId, exerciseTypeId, instuructions, sets, reps, restBreak)),
  putExercise: (exerciseId, exerciseTypeId, instuructions, sets, reps, restBreak) => dispatch(putExercise(exerciseId, exerciseTypeId, instuructions, sets, reps, restBreak)),
  deleteExercise: (exerciseId) => dispatch(deleteExercise(exerciseId)),
  fetchPatients: () => { dispatch(fetchPatients()) },
  postPatient: (fullName, personalCode, address, telNum, email) => dispatch(postPatient(fullName, personalCode, address, telNum, email)),
  putPatient: (patientId, fullName, address, personalCode, telNum, email) => dispatch(putPatient(patientId, fullName, address, personalCode, telNum, email)),
  deletePatient: (patientId) => dispatch(deletePatient(patientId)),
  fetchExerciseTypes: () => { dispatch(fetchExerciseTypes()) },
  postExerciseType: (ytLink, bodyPart, title, intensity, inventory) => dispatch(postExerciseType(ytLink, bodyPart, title, intensity, inventory)),
  putExerciseType: (exerciseTypeId, ytLink, bodyPart, title, intensity, inventory) => dispatch(putExerciseType(exerciseTypeId, ytLink, bodyPart, title, intensity, inventory)),
  deleteExerciseType: (exerciseTypeId) => dispatch(deleteExerciseType(exerciseTypeId)),
  fetchMessages: () => { dispatch(fetchMessages()) },
  postMessage: (programId, message) => dispatch(postMessage(programId, message)),
  putMessage: (messageId, message, messageSeen) => dispatch(putMessage(messageId, message, messageSeen)),
  deleteMessage: (messageId) => dispatch(deleteMessage(messageId)),



  postComment: (dishId, rating, comment) => dispatch(postComment(dishId, rating, comment)), //takes parameters in the left part, on the right dispatches through action creator
  fetchComments: () => { dispatch(fetchComments()) },
  fetchDishes: () => { dispatch(fetchDishes()) },
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
  fetchPromos: () => { dispatch(fetchPromos()) },
  fetchLeaders: () => dispatch(fetchLeaders()),
  postFeedback: (feedback) => dispatch(postFeedback(feedback)),
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  fetchFavorites: () => dispatch(fetchFavorites()),
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
});


class Main extends Component {

  componentDidMount() { //when react mounts Main component into the view, dishes,comments, etc get fetched and loaded into the store and become availabe for the application
    this.props.fetchUsers();
    this.props.fetchPrograms();
    this.props.fetchExercises();
    this.props.fetchPatients();
    this.props.fetchExerciseTypes();
    this.props.fetchMessages();


    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    this.props.fetchFavorites();
  }

  render() {

    const HomePage = () => {
      return (
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leaderLoading={this.props.leaders.isLoading}
          leaderErrMess={this.props.leaders.errMess}
        />
      );
    }

    const ProgramWithId = ({ match }) => {
      return (
        <ProgramDetail program={this.props.programs.programs.filter((program) => program._id === match.params.programId)[0]}
          users={this.props.users}
          putProgram={this.props.putProgram}
          deleteProgram={this.props.deleteProgram}
          errMess={this.props.programs.errMess}
          exercises={this.props.exercises.exercises.filter((exercise) => exercise.program === match.params.programId)}
          postExercise={this.props.postExercise}
          putExercise={this.props.putExercise}
          deleteExercise={this.props.deleteExercise}
          patients={this.props.patients}
          exerciseTypes={this.props.exerciseTypes}
          messages={this.props.messages.messages.filter((message) => message.program === match.params.programId)}
          putMessage={this.props.putMessage}
        />
      );
    }

    const PatientWithId = ({ match }) => {
      return (
        <PatientDetail patient={this.props.patients.patients.filter((patient) => patient._id === match.params.patientId)[0]}
          putPatient={this.props.putPatient}
          deletePatient={this.props.deletePatient}
          errMess={this.props.patients.errMess}
        />
      );
    }

    const UserWithId = ({ match }) => {
      return (
        <UserDetail user={this.props.users.users.filter((user) => user._id === match.params.userId)[0]}
          // putPatient={this.props.putPatient}
          deleteUser={this.props.deleteUser}
        // errMess={this.props.patients.errMess}
        />
      );
    }

    const PatientProgramWithId = ({ match }) => {
      return (
        <PatientProgramDetail program={this.props.programs.programs.filter((program) => program._id === match.params.programId)[0]}
          errMess={this.props.programs.errMess}
          exercises={this.props.exercises.exercises.filter((exercise) => exercise.program === match.params.programId)}
          messages={this.props.messages.messages.filter((message) => message.program === match.params.programId)}
          postMessage={this.props.postMessage}
          deleteMessage={this.props.deleteMessage}
        />
      );
    }

    const ExerciseTypeWithId = ({ match }) => {
      return (
        <ExerciseTypeDetail exerciseType={this.props.exerciseTypes.exerciseTypes.filter((exerciseType) => exerciseType._id === match.params.exerciseTypeId)[0]}
          putExerciseType={this.props.putExerciseType}
          deleteExerciseType={this.props.deleteExerciseType}
          errMess={this.props.exerciseTypes.errMess}
        />
      );
    }

    const DishWithId = ({ match }) => {
      if (this.props.favorites.favorites != null) {
        if (Array.isArray(this.props.favorites.favorites))
          this.props.favorites.favorites = this.props.favorites.favorites[0];
      }
      return (
        this.props.auth.isAuthenticated
          ?
          <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dish === match.params.dishId)}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
            favorite={this.props.favorites.favorites ? this.props.favorites.favorites.dishes.some((dish) => dish._id === match.params.dishId) : false}
            postFavorite={this.props.postFavorite}
          />
          :
          <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dish === match.params.dishId)}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
            favorite={false}
            postFavorite={this.props.postFavorite}
          />
      );
    }

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.auth.isAuthenticated
          ? <Component {...props} />
          : <Redirect to={{
            pathname: '/home',
            state: { from: props.location }
          }} />
      )} />
    );

    return (
      <div>
        <Header auth={this.props.auth}
          loginUser={this.props.loginUser}
          logoutUser={this.props.logoutUser}
        />
        <TransitionGroup>
          <Switch>
            <Route exact path="/welcome" component={() => <AuthLog auth={this.props.auth} loginUser={this.props.loginUser} logoutUser={this.props.logoutUser}
              programs={this.props.programs} />} />
            <Route path="/welcome/:programId" component={PatientProgramWithId} />
            <Route exact path="/programs" component={() => <Search programs={this.props.programs} postProgram={this.props.postProgram}
              programsErrMess={this.props.programs.errMess} patients={this.props.patients} messages={this.props.messages} />} />
            <Route path="/programs/:programId" component={ProgramWithId} />
            <Route exact path="/patients" component={() => <SearchPatients patients={this.props.patients} postPatient={this.props.postPatient}
              patientsErrMess={this.props.patients.errMess} />} />
            <Route path="/patients/:patientId" component={PatientWithId} />
            <Route exact path="/exercisetypes" component={() => <SearchExerciseTypes exerciseTypes={this.props.exerciseTypes} postExerciseType={this.props.postExerciseType}
              exerciseTypesErrMess={this.props.exerciseTypes.errMess} />} />
            <Route path="/exercisetypes/:exerciseTypeId" component={ExerciseTypeWithId} />
            <Route exact path="/users" component={() => <SearchUsers users={this.props.users} postUser={this.props.postUser} />} />
            <Route path="/users/:userId" component={UserWithId} />



            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
            <Route path="/menu/:dishId" component={DishWithId} />
            <Route path="/home" component={HomePage} />
            <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
            <PrivateRoute exact path="/favorites" component={() => <Favorites favorites={this.props.favorites} deleteFavorite={this.props.deleteFavorite} />} />
            <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
            <Redirect to="/welcome" />
          </Switch>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main)); //connects Main component to the redux store
