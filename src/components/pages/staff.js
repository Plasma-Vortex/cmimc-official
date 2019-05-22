import React from "react";
import fetch from "isomorphic-fetch";
import { Row, Col } from "react-materialize";
import _ from "lodash";

import { Spinner } from "../utilities";

const StaffCard = ({ staff: { name, photo, description } }) => (
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
    else return (
      <div>
        { 
          _.chunk(staff.staff.filter((value, index, array) => {value.year === currYear;}), 
                  chunkSize).map((staffRow, idx) => (
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
  }
}

export default Staff;
