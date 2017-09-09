import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col, Input, Button } from "react-materialize";
import { Field, reduxForm } from "redux-form";

import { Error } from "../utilities";

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
    console.log(email, password, passwordConfirm);
    return;
    if (!email || !password || !passwordConfirm) {
      return;
    }
    if (password !== passwordConfirm) {
      return;
    }
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
    const { handleSubmit, error, message } = this.props;
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
          <Error error={ error } message={ message } />
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
  handleSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
});

export default reduxForm({ 
  form: "register"
})(connect(mapStateToProps)(RegisterForm));
