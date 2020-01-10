import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import { connect } from "react-redux";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  CardTitle,
  Jumbotron
} from "reactstrap";



// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.jsx";

import Header from "components/Headers/Header.jsx";

import Crousel from "../components/Carousel"
import Carousel from "../components/Carousel";
class Index extends React.Component {
  state = {
    activeNav: 1,
    chartExample1Data: "data1"
  };
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
    let wow = () => {
      console.log(this.state);
    };
    wow.bind(this);
    setTimeout(() => wow(), 1000);
    // this.chartReference.update();
  };
  componentWillMount() {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  render() {
    const {authState} = this.props
    return (
      <>
        {/* <Header /> */}
        {/* the stats cards */}
        <div className="header bg-gradient-info pb-2 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
            <Jumbotron  className="header bg-gradient-secondary">
        <h1 className="display-3">Hello, {authState.currentUser? authState.currentUser.email : ""} !</h1>
        <p className="lead">Welcome to the subtitute teachers job protal.</p>
        <hr className="my-2" />
        <p>Checkout our available job list and accept the job of your desire.</p>
        <p className="lead">
          <Button color="primary" onClick={(e)=>this.props.history.push('/client/jobs/available')}>Get Started</Button>
        </p>
      </Jumbotron>
     
            </div>
          </Container>
        </div>


        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
         
          </Row>
          <Row className="mt-7 pt-5" >
            <div className="col">
              <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">How it works</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      {/* <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        Save
                      </Button> */}
                    </Col>
                  </Row>
                  </CardHeader>
                  <CardBody>
<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda facilis magnam deleniti aliquid, qui sunt nesciunt sequi omnis quaerat recusandae! Molestias unde similique ut obcaecati vel, ducimus ex deserunt inventore.</p>
                  <h2>Lorem ipsum doloe.</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque repellendus voluptates in? Obcaecati quisquam exercitationem mollitia natus tempore, iure, qui aperiam repellat est, magni laudantium doloribus earum impedit quod?</p>
                  </CardBody>
              </Card>
            </div>
          </Row>

        </Container>
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
)(Index);
