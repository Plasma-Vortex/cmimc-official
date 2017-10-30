import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "react-materialize";
import Input from "./react-materialize-custom/ControlledInput";

import { Error } from "../utilities";
import { login } from "../../actions";
import { AUTH_USER, requestStatuses } from "../../actions/types";
import { payload } from "../../actions/utilities";

import { subjects, tshirts } from "../../../constants";

const { ERROR } = requestStatuses;

class StudentInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value || {} };
  }

  componentDidUpdate() {
    if (this.props.value) this.state.value = this.props.value;
  }

  onFieldChange = field => {
    return (evt, val) => {
      const { onChange } = this.props;
      this.state.value[field] = val;
      this.forceUpdate();
      if (onChange) onChange(this.state.value);
    }
  }

  render() {
    const { idx, onRemove, value } = this.props;
    return (
      <Row>
        <Col s={12}>
          <h6>Student {idx+1}<a className="grey-text text-lighten-2" onClick={ onRemove }><i className="fa fa-times right" aria-hidden="true" /></a></h6>
        </Col>
        <Input
          l={6} s={12} type="text" label="Name"
          onChange={ this.onFieldChange("name") }
          defaultValue={ value.name } />
        <Input
          l={6} s={12} validate type="email" label="Email"
          onChange={ this.onFieldChange("email") }
          defaultValue={ value.email } />
        <Input
          l={3} s={6} type="select" label="Subject 1"
          onChange={ this.onFieldChange("subject1") }
          defaultValue={ value.subject1 } >
          <option value="">Subject 1</option>
          {
            Object.keys(subjects).map((subject, idx) => (
              <option
                disabled={ subject === value.subject2 }
                value={subject} key={idx}>{subjects[subject]}</option>
            ))
          }
        </Input>
        <Input
          l={3} s={6} type="select" label="Subject 2"
          onChange={ this.onFieldChange("subject2") }
          defaultValue={ value.subject2 }>
          <option value="">Subject 2</option>
          {
            Object.keys(subjects).map((subject, idx) => (
              <option
                disabled={ subject === value.subject1 }
                value={subject} key={idx}>{subjects[subject]}</option>
            ))
          }
        </Input>
        <Input
          l={3} s={6} type="number" label="Age" min={0} max={20}
          onChange={ this.onFieldChange("age") }
          defaultValue={ value.age } />
        <Input
          l={3} s={6} type="select" label="T-Shirt"
          onChange={ this.onFieldChange("tshirt") }
          defaultValue={ value.tshirt } >
          <option value="">T-Shirt</option>
          {
            Object.keys(tshirts).map((tshirt, idx) => (
              <option value={tshirt} key={idx}>{tshirts[tshirt]}</option>
            ))
          }
        </Input>
      </Row>
    );
  }
}

class TeamInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.defaultValue || { members: [] } };
  }

  onFieldChange = field => {
    return (evt, val) => {
      const { onChange } = this.props;
      this.state.value[field] = val;
      this.forceUpdate();
      if (onChange) onChange(this.state.value);
    }
  }

  addStudent = () => {
    return;
    if (!this.state.value.members) this.state.value.members = [];
    this.state.value.members.push({});
    this.forceUpdate();
    const { onChange } = this.props;
    if (onChange) onChange(this.state.value);
  }

  removeStudent = idx => {
    return;
    this.state.value.members = this.state.value.members.filter((member, i) => {
      return idx !== i;
    });
    this.forceUpdate();
    const { onChange } = this.props;
    if (onChange) onChange(this.state.value);
  }

  onChangeStudent = idx => {
    return val => {
      const { onChange } = this.props;
      this.state.value.members[idx] = val;
      if (onChange) onChange(this.state.value);
    }
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        <Row>
          <Input
            l={6} s={12} type="text" label="Team Name"
            defaultValue={ this.state.value.team_name }
            onChange={ this.onFieldChange("team_name") }/>
          <Input l={6} s={12} type="text" label="Chaperone Name"
            defaultValue={ this.state.value.chaperone_name }
            onChange={ this.onFieldChange("chaperone_name") }/>
          <Input l={6} s={12} validate type="email" label="Chaperone Email"
            defaultValue={ this.state.value.chaperone_email }
            onChange={ this.onFieldChange("chaperone_email") }/>
          <Input l={6} s={12} validate type="tel" label="Chaperone Number"
            defaultValue={ this.state.value.chaperone_number }
            onChange={ this.onFieldChange("chaperone_number") }/>
        </Row>
        {
          (!value.members || value.members.length === 0) ? <p>No members on this team.</p> : (
            value.members.map((member, idx) => (
              <StudentInput
                key={idx} idx={idx} value={ member }
                onRemove={ () => { this.removeStudent(idx); } }
                onChange={ this.onChangeStudent(idx) } />
            ))
          )
        }
        <Row>
          <Col s={6}>
            <a
              disabled={ this.state.value.members && this.state.value.members.length >= 6 }
              onClick={ this.addStudent }
              className="waves-effect waves-light btn red darken-2 disabled">
              Add Student
            </a>
          </Col>
          <Col s={6}>
            <Button waves="light" className="right red darken-2" type="submit">Submit</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export { TeamInput };
