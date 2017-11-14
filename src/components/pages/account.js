import React from "react";
import { Row, Col, Card, Modal, Button } from "react-materialize";
import { connect } from "react-redux";

import { Spinner } from "../utilities";
import { userGet, teamDelete } from "../../actions";
import { USER_TEAM_POST, requestStatuses } from "../../actions/types";
import { payload } from "../../actions/utilities";
import TeamForm from "../forms/team";
import { subjects, tshirts } from "../../../constants";

const { SUCCESS, ERROR, PENDING, IDLE } = requestStatuses;

const REGISTRATION = true;

const AddTeamModal = () => {
  return (
    <Modal
      header="Add Team"
      trigger={<a disabled={!REGISTRATION} className="waves-effect waves-light btn right red darken-2" >Add Team</a>}>
      <TeamForm mode="add" />
    </Modal>
  );
}

const EditTeamModal = ({ team }) => {
  return (
    <Modal
      header="Edit Team"
      trigger={<a className="waves-effect waves-light btn red darken-2"><i className="fa fa-pencil-square-o" aria-hidden="true" /> Edit</a>}>
      <TeamForm mode="edit" defaultValue={ team } />
    </Modal>
  );
}

const DeleteTeamModal = ({ team, teamDelete }) => (
  <Modal
    trigger={<a disabled={!REGISTRATION} className="waves-effect waves-light btn red darken-2"><i className="fa fa-times" aria-hidden="true" /> Delete</a>}
    actions={
              <div>
                <Button flat modal="close" waves="light">Cancel</Button>
                <Button flat modal="close" waves="light"
                  onClick={ () => teamDelete(team) }>Confirm</Button>
              </div>
            }>
    Are you sure you want to delete the team { team.team_name }?
  </Modal>
);

const TeamProfile = ({ registration_price, team, teamDelete }) => {
  return (
    <Card className="account-team">
      <h5>
        { team.team_name } <ul className="team-btns right"><li><EditTeamModal team={ team } /></li><li><DeleteTeamModal team={ team } teamDelete={ teamDelete }/></li></ul>
      </h5>
      <p>Chaperone: <b>{ team.chaperone_name }</b> - { team.chaperone_email } / { team.chaperone_number }</p>
      <p>Registration Fee: ${ team.members ? registration_price * team.members.length : 0 } - { team.paid ? <span className="green-text text-accent-3">Paid</span> : <span className="red-text text-accent-3">Unpaid</span> }</p>
      {
        (!team.members || team.members.length === 0) ?
          ( <p>No members on this team.</p> ) : (
          <table className="striped">
            <thead>
              <tr>
                <th>Student</th>
                <th>Email</th>
                <th>Age</th>
                <th>Topics</th>
                <th>T-Shirt</th>
              </tr>
            </thead>
            <tbody>
              {
                team.members.map((member, idx) => (
                  <tr key={idx}>
                    <td>{ member.name }</td>
                    <td>{ member.email }</td>
                    <td>{ member.age }</td>
                    <td>{ subjects[member.subject1] }, { subjects[member.subject2] }</td>
                    <td>{ tshirts[member.tshirt] }</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )
      }
    </Card>
  );
}

class Account extends React.Component {
  componentWillMount() {
    const { userGet, userData: { requestStatus } } = this.props;
    if (requestStatus === IDLE) userGet();
  }

  render() {
    const {
      infoData: { content: info },
      userData: { requestStatus, message, content: user },
      teamDelete
    } = this.props;
    if (!user) return <Spinner />;
    if (requestStatus === PENDING) return <Spinner />;
    return (
      <div>
        <h4>Account<AddTeamModal /></h4>
        {
          (!user.teams || user.teams.length === 0) ? (<p>No teams on this account.</p>) : (
            user.teams.map((team, idx) => (
              <TeamProfile
                key={idx} team={team} teamDelete={teamDelete}
                registration_price={info.registration_price} />
            ))
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
        infoData: state.init.info,
        userData: state.user.user
      }),
      mapDispatchToProps = dispatch => ({
        userGet: () => { userGet()(dispatch); },
        teamDelete: team => { teamDelete(team)(dispatch); }
      });

export default connect(mapStateToProps, mapDispatchToProps)(Account);
