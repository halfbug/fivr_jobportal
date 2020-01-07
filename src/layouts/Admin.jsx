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
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { Route, Switch } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import AdminFooter from "components/Footers/AdminFooter.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import authAction from '../actions/authAction'
import routes from "routes.js";

class Admin extends React.Component {

  componentDidMount(){
    // console.log("##################################################")
    // console.log(this.props.authState)
       if(!this.props.authState.loggedIn)
    {
      this.props.authAction();
    }
  }
  componentDidUpdate(e,prevProps) {
    if(document){
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if(this.refs.mainContent)
    this.refs.mainContent.scrollTop = 0;
    }
    // console.log("##################################################")
    // console.log(this.props.authState)
       if(!this.props.authState.loggedIn)
    {
      this.props.authAction().then((res)=>{
        //  console.log("#@#@#@#A@#@#@#@#@#@#")
      });
    }
  }

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        // console.log(key)
        // console.log("/"+prop.role + prop.path)
        return (
          <Route
          exact 
            path={"/"+prop.role + prop.path}
            component={prop.component}
            key={key}
            
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  render() {
    // const { loaded , currentUser} = this.props.authState
    console.log(this.props.authState.loggedIn)
    console.log(this.props.authState.loaded)
    // const authenticated = this.props.authState.loaded === undefined? false: this.pr
    if (!this.props.authState.loggedIn ) {
       console.log("#############inside############")
      return <Redirect to="/auth/login" />;
    }
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/client/index",
            imgSrc: require("assets/img/brand/logo-blue.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
        
          <AdminNavbar
            {...this.props}
         //   brandText={this.getBrandText(this.props.location.pathname)}
          />

          <Switch>{this.getRoutes(routes)}</Switch>
          <Container fluid>
            
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  authAction: () =>
    dispatch(authAction())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);