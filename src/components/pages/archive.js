import React from "react";
import { 
  Row, 
  Col, 
  Tabs, 
  Tab, 
  Collection, 
  CollectionItem, 
  Collapsible, 
  CollapsibleItem
} from "react-materialize";

import { Spinner } from "../utilities";

const ProblemSolution = ({ subject }) => (
  <div>
    { subject.name } 
    <a 
      target="_self" 
      href={ `/docs/past-tests/${subject.solutions}` } 
      className="secondary-content red-text text-darken-2 solutions-link">
      Solutions
    </a>
    <a 
      target="_self" 
      href={ `/docs/past-tests/${subject.problems}` } 
      className="secondary-content red-text text-darken-2 problems-link">
      Problems
    </a>
  </div>
);

const Problems = ({ title, round }) => (
  <div>
    <span className="archive-header">{ title }</span>
    <Collection>
      {
        round.map((subject, key) => (
          <CollectionItem key={ key }>
            <ProblemSolution subject={ subject } />
          </CollectionItem>
        ))
      }
    </Collection>
  </div>
);

const ContestProblems = ({ problems }) => (
  <div>
    {
      problems.map((contest, key) => (
        <div key={ key }>
          <h5>{ contest.year } Problems</h5>
          
          <Row>
            <Col l={6} s={12}>
              <Problems 
                round={ contest.individuals } 
                title="Individuals" />
            </Col>
            <Col l={6} s={12}>
              <Problems 
                round={ contest.others } 
                title="Others" />
            </Col>
          </Row>
        </div>
      ))
    }
  </div>
);

const Results = ({ title, round }) => (
  <div>
    <span className="archive-header">{ title }</span>
    <Collapsible>
      {
        round.map((subject, key) => (
          <CollapsibleItem 
            header={(
              <div>
                <i className="fa fa-angle-down" aria-hidden="true" />{ subject.name }
              </div>
            )}
            key={ key }>
            <ul className="results-list">
              {
                Object.keys(subject.results).map((rank, key) => {
                  const winners = subject.results[rank];
                  return (
                    <li key={ key }>
                      { rank }. { winners.join(", ") }
                    </li>
                  );
                })
              }
            </ul>
          </CollapsibleItem>
        ))
      }
    </Collapsible>
  </div>
);

const ContestResults = ({ results }) => (
  <div>
    {
      results.map((contest, key) => ( <div key={ key }>
          <h5>{ contest.year } Results</h5>
          <Row>
            <Col s={12} l={6}>
              <Results title="Individuals" round={ contest.individuals } />
            </Col>
            <Col s={12} l={6}>
              <Results title="Teams" round={ contest.teams } />
            </Col>
          </Row>
        </div>
      ))
    }
  </div>
);

const Album = ({ album }) => (
  <div className="card">
    <div className="card-image gallery-thumbnail">
      <img src={ album.thumbnail } />
      <span className="card-title">{ album.year } Photos</span>
    </div>
    <div className="card-action">
      <a href={ album.link } target="_blank" className="red-text text-darken-2">
        <i className="fa fa-external-link" aria-hidden="true" /> View
      </a>
    </div>
  </div>
);

const ContestPhotos = ({ photos }) => (
  <Col s={12} className="white">
    <Row>
      {
        photos.map((album, key) => (
          <Col s={3} key={ key }>
            <Album album={ album } />
          </Col>
        ))
      }
    </Row>
  </Col>
);

class Archive extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pending: true };
  }

  componentWillMount() {
    fetch("/data/archive.json", { method: "get" })
    .then(
      res => res.json().then(data => {
        this.setState({ archive: data, pending: false });
      }),
      err => { 
        console.log(err); 
        this.setState({ pending: false });
      }
    );
  }

  render() {
    const { archive, pending } = this.state;
    if (pending) return <Spinner />;
    return !archive ? <div /> :  (
      <Tabs>
        <Tab title="Problems" className="grey-text text-darken-4" active>
          <ContestProblems problems={ archive.problems } />
        </Tab>
        <Tab title="Results" className="grey-text text-darken-4">
          <ContestResults results={ archive.results } />
        </Tab>
        <Tab title="Photos" className="grey-text text-darken-4">
          <ContestPhotos photos={ archive.photos } />
        </Tab>
      </Tabs>
    );
  }
}

export default Archive;
