
import React from "react";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";
import { withRouter } from 'react-router'

import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import { connect } from "react-redux";

import {isAdmin, isClient} from '../../utilities/auth'

class UserHeader extends React.Component {
  render() {
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "400px",
            backgroundImage:
              "url(" + require("assets/img/theme/"+this.props.theme) + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          {/* Header container */}
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="12" md="10">
                <h1 className="display-2 text-white">{this.props.heading}</h1>
                <p className="text-white mt-0 mb-2">
                 {this.props.detail}
                </p>
                {isAdmin(this.props.authState.currentUser)?
                <Button
                  color="info"
                  to={this.props.buttonLink}
                  tag={NavLinkRRD}
                  //onClick={e => e.preventDefault()}
                > 
                  {this.props.buttonTxt}
                </Button>
              : ""}
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({
  ...state
});

export default connect(
  mapStateToProps,
  null
)(UserHeader);
