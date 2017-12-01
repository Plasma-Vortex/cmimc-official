import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col, Button } from "react-materialize";
import { Field, reduxForm } from "redux-form";

import { Spinner, Error } from "../utilities";
import { teamPost, teamPut } from "../../actions";
import {
  USER_TEAM_POST,
  USER_TEAM_PUT,
  requestStatuses
} from "../../actions/types";
import { payload } from "../../actions/utilities";
import { TeamInput } from "./utilities";

const { SUCCESS, ERROR, PENDING, IDLE } = requestStatuses;

const verifyTeam = team => {
  if (!team) return "Team cannot be empty.";
  const {
    team_name, chaperone_name, chaperone_email, chaperone_number, members
  } = team;
  if (!team_name || !chaperone_name || !chaperone_email ||
      !chaperone_number || !members)
    return "Please fill out all fields.";
  else {
    for (let i in members) {
      const { name, email, subject1, subject2, age, tshirt } = members[i];
      if (!name || !email || !subject1 || !subject2 || !age || !tshirt) {
        return "Please fill out all fields for all students.";
      }
    }
    return null;
  }
}

class TeamForm extends React.Component {
  onSubmit = ({ team }) => {
    const {
            teamPost,
            teamPut,
            errorHandlerPost,
            errorHandlerPut,
            mode
          } = this.props,
          message = verifyTeam(team);
    switch(mode) {
      case "add":
        if (message) errorHandlerPost(message);
        else teamPost(team);
        break;
      case "edit":
        if (message) errorHandlerPut(message);
        else teamPut(team);
        break;
    }
  }

  teamField = ({ input, meta, ...rest }) => {
    const { defaultValue } = this.props;
    return <TeamInput
              registrationIsOpen={ this.props.registrationIsOpen }
              defaultValue={ defaultValue } { ...input } { ...rest } />;
  }

  render() {
    const {
      handleSubmit,
      postTeamData: { requestStatus: statusPost, message: messagePost, content: userPost },
      putTeamData: { requestStatus: statusPut, message: messagePut, content: userPut },
      resetTeamPost,
      resetTeamPut,
      mode
    } = this.props;
    const requestStatus = mode === "add" ? statusPost : statusPut,
          message = mode === "add" ? messagePost : messagePut,
          reset = mode === "add" ? resetTeamPost : resetTeamPut;
    if (mode === "add") {
      return (requestStatus === SUCCESS) ? (<p>Successfully added team. Click <a onClick={ reset }>here</a> to add another.</p>) : (
        <form onSubmit={ handleSubmit(this.onSubmit) }>
          <div>
            <Field name="team" component={ this.teamField } />
          </div>
          { requestStatus === PENDING && <Spinner /> }
          <Error error={ requestStatus === ERROR } message={ message } />
        </form>
      );
    } else {
      return (
        <form onSubmit={ handleSubmit(this.onSubmit) }>
          <div>
            <Field name="team" component={ this.teamField } />
          </div>
          { requestStatus === PENDING && <Spinner /> }
          <Error error={ requestStatus === ERROR } message={ message } />
        </form>
      );
    }
  }
}

TeamForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
        postTeamData: state.user.postTeam,
        putTeamData: state.user.putTeam
      }),
      mapDispatchToProps = dispatch => ({
        teamPost: team => { teamPost(team)(dispatch); },
        teamPut: team => { teamPut(team)(dispatch); },
        resetTeamPost: () => {
          dispatch(Object.assign({ type: USER_TEAM_POST }, payload.idle()));
        },
        resetTeamPut: () => {
          dispatch(Object.assign({ type: USER_TEAM_PUT }, payload.idle()));
        },
        errorHandlerPost: message => {
          dispatch(Object.assign({ type: USER_TEAM_POST }, payload.error(message)));
        },
        errorHandlerPut: message => {
          dispatch(Object.assign({ type: USER_TEAM_PUT }, payload.error(message)));
        },
      });

export default reduxForm({
  form: "team"
})(connect(mapStateToProps, mapDispatchToProps)(TeamForm));
