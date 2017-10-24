import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Input, Button } from "react-materialize";
import { Field, reduxForm } from "redux-form";

import { Error } from "../utilities";
import { changePassword } from "../../actions";
import { CHANGE_PASS, requestStatuses } from "../../actions/types";
import { payload } from "../../actions/utilities";

const { ERROR, SUCCESS } = requestStatuses;

class ChangePassForm extends React.Component {
  onSubmit = ({ oldPassword, newPassword }) => {
    const { changePassword } = this.props;
    if (!oldPassword || !newPassword) errorHandler("Please fill out all fields.");
    else changePassword({ oldPassword, newPassword });
  }

  oldPasswordField = ({ input, meta, ...rest }) => (
    <Input s={12} type="password" label="Old Password" { ...input } { ...rest } />
  )

  newPasswordField = ({ input, meta, ...rest }) => (
    <Input s={12} type="password" label="New Password" { ...input } { ...rest } />
  )

  render() {
    const { handleSubmit, authData: { requestStatus, message } } = this.props;
    return (
      <form onSubmit={ handleSubmit(this.onSubmit) }>
        <Row>
          <div>
            <Field name="oldPassword" component={ this.oldPasswordField } />
          </div>
          <div>
            <Field name="newPassword" component={ this.newPasswordField } />
          </div>
          <Error error={ requestStatus === ERROR } message={ message } />
          {
            requestStatus === SUCCESS && <p>Password updated!</p>
          }
          <Col s={12}>
            <Button waves="light" className="right red darken-2" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

ChangePassForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
        authData: state.auth.changePassword
      }),
      mapDispatchToProps = dispatch => ({
        errorHandler: message => {
          dispatch(Object.assign({ type: AUTH_USER }, payload.error(message)));
        },
        changePassword: ({ oldPassword, newPassword }) => {
          changePassword({ oldPassword, newPassword })(dispatch);
        }
      });

export default withRouter(
  reduxForm({
    form: "changePassword"
  })(connect(mapStateToProps, mapDispatchToProps)(ChangePassForm))
);
