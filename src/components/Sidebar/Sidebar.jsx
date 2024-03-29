/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
import { connect } from "react-redux";
import logoutAction from "../../actions/logoutAction";
import { withRouter } from 'react-router'

import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

var ps;

class Sidebar extends React.Component {
  state = {
    collapseOpen: false,
  };
  constructor(props) {
    super(props);
    this.state  = {
      collapseOpen: false,
      roleNav: "",
    };
    this.activeRoute.bind(this);
  }
componentDidUpdate(){
console.log(this.props.authState.currentUser)
}

  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };
  // creates the links that appear in the left menu / Sidebar
  createLinks = routes => {
    return routes.map((prop, key) => {
      // console.log(prop)
      const rolelink = this.props.authState.currentUser ? prop.role === this.props.authState.currentUser.role : false
      if(prop.sidebarDisplay && rolelink)
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
      else
      return("");
    });
  };
  render() {
    const { bgColor, routes, logo } = this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: "_blank"
      };
    }
    console.log(this.props.authState)
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Brand */}
          {logo ? (
            <NavbarBrand className="pt-0" {...navbarBrandProps}>
              <img
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={logo.imgSrc}
              />
            </NavbarBrand>
          ) : null}
          {/* User */}
          <Nav className="align-items-center d-md-none">
           
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={require("assets/img/default_profile.png")}
                    />
                  </span>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={ (e) => {
                  {/* this.props.history.push('/auth/login'); */}
                    this.props.logoutAction()
                  console.log(this.props)
                  
                  }}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/* Collapse */}
          <Collapse navbar isOpen={this.state.collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {logo ? (
                  <Col className="collapse-brand" xs="6">
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </Link>
                    ) : (
                      <a href={logo.outterLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </a>
                    )}
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={this.toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            {/* Form */}
            <Form className="mt-4 mb-3 d-md-none">
              <InputGroup className="input-group-rounded input-group-merge">
                <Input
                  aria-label="Search"
                  className="form-control-rounded form-control-prepended"
                  placeholder="Search"
                  type="search"
                />
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <span className="fa fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Form>
            {/* Navigation */}
            <Nav navbar>{this.createLinks(routes)}</Nav>
            {/* Divider */}
            <hr className="my-3" />
            {/* Heading */}
            <h6 className="navbar-heading text-muted">Jobs</h6>
            {/* Navigation */}
            {this.props.authState.currentUser?this.props.authState.loaded && this.props.authState.currentUser.role === "admin"?
            <>
            <Nav className="mb-md-3" navbar>
            
              <NavItem>
                <NavLink to="/admin/jobs/available"
                onClick={this.closeCollapse}
                tag={NavLinkRRD}
                activeClassName="active"
                >
                  <i className="ni ni-hat-3 text-red" />
                  Available Jobs
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/admin/jobs/scheduled"
                onClick={this.closeCollapse}
                tag={NavLinkRRD}
                activeClassName="active"
                >
                  <i className="ni ni-watch-time text-green"  />
                  Scheduled Jobs
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/admin/jobs/past"
                onClick={this.closeCollapse}
                tag={NavLinkRRD}
                activeClassName="active"
                >
                  <i className="ni ni-folder-17 text-blue" />
                  Past Jobs
                </NavLink>
              </NavItem>
            </Nav>
            <h6 className="navbar-heading text-muted">Users</h6>
          
            <Nav className="mb-md-3" navbar>
            
              <NavItem>
                <NavLink to="/admin/addAdminUser"
                onClick={this.closeCollapse}
                tag={NavLinkRRD}
                activeClassName="active"
                >
                  <i className="ni text-info ni-key-25" />
                  Add Admin
                </NavLink>
              </NavItem>
              
            </Nav>
            </>
            :
            <Nav className="mb-md-3" navbar>
            
              <NavItem>
                <NavLink to="/client/jobs/available"
                onClick={this.closeCollapse}
                tag={NavLinkRRD}
                activeClassName="active"
                >
                  <i className="ni ni-hat-3 text-red" />
                  Available Jobs
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/client/jobs/scheduled"
                onClick={this.closeCollapse}
                tag={NavLinkRRD}
                activeClassName="active"
                >
                  <i className="ni ni-watch-time text-green"  />
                  Scheduled Jobs
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/client/jobs/past"
                onClick={this.closeCollapse}
                tag={NavLinkRRD}
                activeClassName="active"
                >
                  <i className="ni ni-folder-17 text-blue" />
                  Past Jobs
                </NavLink>
              </NavItem>
            </Nav>
:""
            }
            

          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}]
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};


const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  logoutAction: () => dispatch(logoutAction())
});
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar));
