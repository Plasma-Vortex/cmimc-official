import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Input, Button } from "react-materialize";
import { Field, reduxForm } from "redux-form";

import { Error } from "../utilities";
import { signup } from "../../actions";
import { AUTH_USER, requestStatuses } from "../../actions/types";
import { payload } from "../../actions/utilities";

const { ERROR } = requestStatuses;

const EmailField = ({ input, meta, ...rest }) => (
        <Input s={12} type="text" label="Email" { ...input } { ...rest } />
      ),
      PasswordField = ({ input, meta, ...rest }) => (
        <Input s={12} type="password" label="Password" { ...input } { ...rest } />
      ),
      PasswordConfirmField = ({ input, meta, ...rest }) => (
        <Input s={12} type="password" label="Password (confirm)" { ...input } { ...rest } />
      );

class RegisterForm extends React.Component {
  onSubmit = ({ email, password, passwordConfirm }) => {
    const { authData: { content }, signup, errorHandler, history } = this.props;
    if (content) errorHandler("Please sign out before signing up to a new account.");
    else if (!email || !password || !passwordConfirm) errorHandler("Please fill out all fields.");
    else if (password !== passwordConfirm) errorHandler("Passwords do not match.");
    else signup({ email, password, history });
  }
  
  emailField = ({ input, meta, ...rest }) => (
    <Input s={12} type="text" label="Email" { ...input } { ...rest } />
  )

  passwordField = ({ input, meta, ...rest }) => (
    <Input s={12} type="password" label="Password" { ...input } { ...rest } />
  )

  confirmField = ({ input, meta, ...rest }) => (
    <Input s={12} type="password" label="Password (confirm)" { ...input } { ...rest } />
  )

  render() {
    const { handleSubmit, authData: { requestStatus, message } } = this.props;
    return (
      <form onSubmit={ handleSubmit(this.onSubmit) }>
        <Row>
          <div>
            <Field name="email" component={ this.emailField } />
          </div>
          <div>
            <Field name="password" component={ this.passwordField } />
          </div>
          <div>
            <Field name="passwordConfirm" component={ this.confirmField } />
          </div>
          <Error error={ requestStatus === ERROR } message={ message } />
          <Col s={12}>
            <Button waves="light" className="right red darken-2" type="submit">
              Sign Up
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
        authData: state.auth.authenticated
      }),
      mapDispatchToProps = dispatch => ({
        errorHandler: message => {
          dispatch(Object.assign({ type: AUTH_USER }, payload.error(message)));
        },
        signup: ({ email, password, history }) => { 
          signup({ email, password, history })(dispatch); 
        }
      });

export default withRouter(
  reduxForm({ 
    form: "register"
  })(connect(mapStateToProps, mapDispatchToProps)(RegisterForm))
);
