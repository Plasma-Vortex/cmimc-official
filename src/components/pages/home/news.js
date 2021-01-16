import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-materialize";
import fetch from "isomorphic-fetch";

import { Spinner } from "../../utilities";

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pending: false };
  }

  componentWillMount() {
    fetch("/data/news.json", { method: "get" })
    .then(
      res => res.json().then(data => {
        this.setState({ news: data, pending: false });
      }),
      err => { 
        console.log(err); 
        this.setState({ pending: false });
      }
    );
  }

  render() {
    const { news, pending } = this.state;
    if (pending) return <Spinner />;
    if (!news) return <div />;
    return !news.news ? <div /> : (
      <div>
        <h4><i className="fa fa-newspaper-o" aria-hidden="true" /> News</h4>
        <ul className="news-feed">
          {
            news.news.map((post, key) => (
              <li key={key}>
                <Row>
                  <Col s={1}>
                    <i className="fa fa-rss" aria-hidden="true" />
                  </Col>
                  <Col s={11}>
                    <b>{ post.date }</b><p>dangerouslySetInnerHTML={{ __html: 'message' }}</p>
                  </Col>
                </Row>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

//@TODO request only once and save to state, same for others
const mapStateToProps = state => ({
  news: state.init.news
});

export default News;
