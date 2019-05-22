import React from "react";
import fetch from "isomorphic-fetch";
import { Row, Col, Tabs, Tab } from "react-materialize";
import _ from "lodash";

import { Spinner } from "../utilities";

const StaffCard = ({ staff: { name, photo, description, year } }) => (
  <Col s={12} m={6} l={3}>
    <div className="card">
      <div className="card-image">
        <img src={ `assets/img/staff/${photo}` } />
      </div>
      <div className="card-content center-align">
        <span className="card-title">{ name }</span>
        <p>{ description }</p>
      </div>
    </div>
  </Col>
);

const StaffP = ({ staff }) => (
  <div>
    { 
      _.chunk(staff, chunkSize).map((staffRow, idx) => (
        <Row className="staff-row" key={ idx }>
          {
            staffRow.map((staff, idx) => (
              <StaffCard staff={ staff } key={ idx } />
            ))
          }
        </Row>
      ))
    }
  </div>
);

class Staff extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pending: true };
  }

  componentWillMount() {
    fetch("/data/staff.json", { method: "get" })
    .then(
      res => res.json().then(data => {
        this.setState({ staff: data, pending: false });
      }),
      err => { 
        console.log(err); 
        this.setState({ pending: false });
      }
    );
  }

  render() {
    const { staff, pending } = this.state,
          chunkSize = 4, currYear = 2020;
    if (pending) return <Spinner />;
    if (!staff) return <div />;
    else {
      return ( <Tabs>
        <Tab title="Current Staff" className="grey-text text-darken-4" active>
          <StaffP staff={ staff.staff.filter((value, index, array) => 
            { return value.year.includes(currYear) === true; }) } />
        </Tab>
        <Tab title="Former Staff" className="grey-text text-darken-4">
          <StaffP staff={ staff.staff.filter((value, index, array) => 
            { return value.year.includes(currYear) === false; }) } />
        </Tab>
      </Tabs> )
    } 
  }
}

export default Staff;
