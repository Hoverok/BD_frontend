import React, { Component } from 'react';
import ProgramDetail from './ProgramDetailComponent';
import Search from './SearchComponent'; //redo search export from class to constant
import AuthLog from './AuthLogComponent';
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
  postProgram, putProgram, deleteProgram, fetchPrograms, fetchExercises, postExercise, putExercise, deleteExercise,
  postComment, postFeedback, fetchDishes, fetchComments, fetchPromos, fetchLeaders,
  loginUser, logoutUser, fetchFavorites, postFavorite, deleteFavorite
} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup } from 'react-transition-group';

const mapStateToProps = state => { //maps redux store state to props that become available in this component
  return {
    programs: state.programs,
    exercises: state.exercises,
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    favorites: state.favorites,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => ({ //obtain action object and dispatching it to store
  fetchPrograms: () => { dispatch(fetchPrograms()) },
  postProgram: (name, personalCode, programStatus) => dispatch(postProgram(name, personalCode, programStatus)),
  putProgram: (programId, name, personalCode, programStatus) => dispatch(putProgram(programId, name, personalCode, programStatus)),
  deleteProgram: (programId) => dispatch(deleteProgram(programId)),
  fetchExercises: () => { dispatch(fetchExercises()) },
  postExercise: (programId, name, ytLink, difficulty, comment) => dispatch(postExercise(programId, name, ytLink, difficulty, comment)),
  putExercise: (exerciseId, name, ytLink, difficulty, comment) => dispatch(putExercise(exerciseId, name, ytLink, difficulty, comment)),
  deleteExercise: (exerciseId) => dispatch(deleteExercise(exerciseId)),
  


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
    this.props.fetchPrograms();
    this.props.fetchExercises();
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
          putProgram={this.props.putProgram}
          deleteProgram={this.props.deleteProgram}
          errMess={this.props.programs.errMess}
          exercises={this.props.exercises.exercises.filter((exercise) => exercise.program === match.params.programId)}
          postExercise={this.props.postExercise}
          putExercise={this.props.putExercise}
          deleteExercise={this.props.deleteExercise}
          //exercisesErrMess={this.props.exercises.errMess}
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
            <Route exact path="/programs" component={() => <Search programs={this.props.programs} postProgram={this.props.postProgram} programsErrMess={this.props.programs.errMess} />} />
            <Route path="/programs/:programId" component={ProgramWithId} />
            <Route exact path="/welcome" component={() => <AuthLog auth={this.props.auth} loginUser={this.props.loginUser} />} />
            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
            <Route path="/menu/:dishId" component={DishWithId} />
            <Route path="/home" component={HomePage} />
            <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
            <PrivateRoute exact path="/favorites" component={() => <Favorites favorites={this.props.favorites} deleteFavorite={this.props.deleteFavorite} />} />
            <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
            <Redirect to="/home" />
          </Switch>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main)); //connects Main component to the redux store
