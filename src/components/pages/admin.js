import React from "react";
import { Row, Col, Card, Modal, Button } from "react-materialize";
import { connect } from "react-redux";

import { Spinner } from "../utilities";
import { resetDatabase } from "../../actions";
import { USER_TEAM_POST, requestStatuses } from "../../actions/types";
import { payload } from "../../actions/utilities";
import Unauthorized from "./unauthorized";

const { SUCCESS, ERROR, PENDING, IDLE } = requestStatuses;

const ResetDBModal = ({ resetDB, registrationIsOpen }) => (
  <Modal
    trigger={<a disabled={ registrationIsOpen } className="waves-effect waves-light btn red darken-2">Reset Database</a>}
    actions={
              <div>
                <Button flat modal="close" waves="light">Cancel</Button>
                <Button flat modal="close" waves="light"
                  onClick={ () => resetDB() }>Confirm</Button>
              </div>
            }>
    Are you sure you want to reset the database?
  </Modal>
);

function parseJwt (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
        };

class Admin extends React.Component {
  render() {
    const {
      infoData: { content: info },
      serverInfoData: { content: serverInfo },
      resetDB
    } = this.props;
    // allow for whitelisting users
    const registrationIsOpen = serverInfo.registration_status,
          token = localStorage.getItem("token"),
          admin = parseJwt(token).admin;
    if (!admin) return <Unauthorized />
    else {
      return (
        <div>
          <h4>Admin</h4>
          <ResetDBModal resetDB={ resetDB } registrationIsOpen={ registrationIsOpen } />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
        infoData: state.init.info,
        serverInfoData: state.init.server_info
      }),
      mapDispatchToProps = dispatch => ({
        resetDB: () => { resetDatabase()(dispatch); }
      });

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
