import React from "react";
import { Grid, Row, Col } from "react-flexbox-grid";

function Header(props) {
  return (
    <div className="header">
      <Grid fluid>
        <Row>
          <Col xsOffset={4} xs={1} onClick={() => props.updatePage("home")} className="header-btn">
            Home
          </Col>
          <Col xs={2} onClick={() => props.updatePage("articles")} className="header-btn">
            Articles
          </Col>
          <Col xs={1} onClick={() => props.updatePage("aboutme")} className="header-btn">
            About Me
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default Header;
