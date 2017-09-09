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
      );

class LoginForm extends React.Component {
  onSubmit = ({ email, password }) => {
    console.log(email, password);
    return;
    if (!email || !password) {
      return;
    }
  }
  
  emailField = ({ input, meta, ...rest }) => (
    <Input s={12} type="text" label="Email" { ...input } { ...rest } />
  )

  passwordField = ({ input, meta, ...rest }) => (
    <Input s={12} type="password" label="Password" { ...input } { ...rest } />
  )

  render() {
    const { handleSubmit, error, message } = this.props;
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
            <Error error={ error } message={ message } />
            <Col s={12}>
              <Button waves="light" className="right red darken-2" type="submit">
                Signup
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
});

export default reduxForm({ 
  form: "login"
})(connect(mapStateToProps)(LoginForm));
