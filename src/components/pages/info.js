import React from "react";
import { Row, Col } from "react-materialize";
import { connect } from "react-redux";

import { Spinner } from "../utilities";
import { requestStatuses } from "../../actions/types";

const { SUCCESS, ERROR, PENDING, IDLE } = requestStatuses;

const Info = ({ infoData: { requestStatus, message, content: info } }) => {
  if (requestStatus === PENDING) return <Spinner />;
  return !info ? <div /> : (
    <div>
      <h4>Information</h4>
      <p>The Carnegie Mellon Informatics and Mathematics Competition (CMIMC) is an annual math and computer science competition held at <a href="http://www.cmu.edu/" target="_blank" className="red-text text-darken-2">Carnegie Mellon University</a> by CMU students. The CMIMC { info.year } will be held on { info.contest_date }. Contestants come in teams of 4-6 to participate in individual and team events. More information can be found in the <a href="docs/Official_Contest_Information.pdf" className="red-text text-darken-2" target="_self">Official Contest Information PDF</a> below. To stay updated, follow our <a href="https://www.facebook.com/CMIMC" target="_blank" className="red-text text-darken-2">Facebook page</a>.</p>
      <a href="docs/Official_Contest_Information.pdf" className="waves-effect waves-light btn red darken-2 contest-pdf" target="_self">Official Contest PDF</a>
      <h5>Important Dates</h5>
      <table className="info-table centered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ info.registration_open }</td>
            <td>Registration opens</td>
          </tr>
          <tr>
            <td>{ info.registration_close }</td>
            <td>Registration closes</td>
          </tr>
          <tr>
            <td>{ info.payment_deadline }</td>
            <td>Payment deadline</td>
          </tr>
          <tr>
            <td>{ info.contest_date }</td>
            <td>The contest</td>
          </tr>
        </tbody>
      </table>
      <Row>
        <Col l={6} s={12}>
          <div className="card">
            <div className="card-content">
              <h5>Individual Rounds</h5>
              <p>Each individual round consists of 10 short-answer problems in 60 minutes. Each competitor takes two individual rounds from the topics of algebra, combinatorics, geometry, number theory, and - most excitingly - the newest computer science round. We saw the lack of computer science in other math competitions, so we figured that CMU would be the perfect place for this to start. The round is designed to have no programming knowledge required. Also, due to the novelty of this field of competition math, we're excited to announce that we have provided sufficient preparation material through <a href="https://www.expii.com/map/9794" target="_blank" className="red-text text-darken-2">Expii.com</a>, covering all the necessary topics.</p>
            </div>
            <div className="card-image">
              <img src="assets/img/individual-round.png" />
            </div>
          </div>
        </Col>
        <Col l={6} s={12}>
          <div className="card">
            <div className="card-image">
              <img src="assets/img/team-round.png" />
            </div>
            <div className="card-content">
              <h5>Power/Team Rounds</h5>
              <p>In the power round, we present an interesting topic with all of its background information and then pose some proof-based problems exploring the different branches of the topic. It's up to the team to collaboratively solve these problems in 60 minutes.</p><br />
              <p>The team round consists of 10 short-answer problems from all five topics for the team to collaboratively solve in 30 minutes.</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = state => ({
        infoData: state.init.info
      });

export default connect(mapStateToProps)(Info);
