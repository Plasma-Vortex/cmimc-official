import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Input, Button } from "react-materialize";
import { Field, reduxForm } from "redux-form";

import { Error } from "../utilities";
import { login } from "../../actions";
import { AUTH_USER, requestStatuses } from "../../actions/types";
import { payload } from "../../actions/utilities";

const { ERROR } = requestStatuses;

const EmailField = ({ input, meta, ...rest }) => (
        <Input s={12} type="text" label="Email" { ...input } { ...rest } />
      ),
      PasswordField = ({ input, meta, ...rest }) => (
        <Input s={12} type="password" label="Password" { ...input } { ...rest } />
      );

class LoginForm extends React.Component {
  onSubmit = ({ email, password }) => {
    const { login, errorHandler, history } = this.props;
    if (!email || !password) errorHandler("Please fill out all fields.");
    else login({ email, password, history });
  }
  
  emailField = ({ input, meta, ...rest }) => (
    <Input s={12} type="text" label="Email" { ...input } { ...rest } />
  )

  passwordField = ({ input, meta, ...rest }) => (
    <Input s={12} type="password" label="Password" { ...input } { ...rest } />
  )

  render() {
    const { 
      handleSubmit, 
      authData: { requestStatus, message, content },
      history
    } = this.props;
    if (content) history.push("/account");
    return (
      <div className="card-content signup-card">
        <form onSubmit={ handleSubmit(this.onSubmit) }>
          <Row>
            <div>
              <Field name="email" component={ this.emailField } />
            </div>
            <div>
              <Field name="password" component={ this.passwordField } />
            </div>
            <Error error={ requestStatus === ERROR } message={ message } />
            <Col s={12}>
              <Button waves="light" className="right red darken-2" type="submit">
                Log In
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
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
        login: ({ email, password, history }) => {
          login({ email, password, history })(dispatch);
        }
      });

export default withRouter(
  reduxForm({ 
    form: "login"
  })(connect(mapStateToProps, mapDispatchToProps)(LoginForm))
);
