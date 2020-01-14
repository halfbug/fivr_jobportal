
import React from "react";
import { connect } from "react-redux";
// import logoutAction from "../../actions/logoutAction";
import {getUser} from "../../actions/userAction"
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  CardTitle,
  Badge
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";

import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import moment from 'moment';

class JobDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      job : "",
      userDetail: ""
    };
  }

  componentDidMount () {
    console.log(this.props.jobState.allJobs)
    console.log(this.props.match.params.id)
    let job = this.props.jobState.allJobs.filter((j)=>j.id === this.props.match.params.id)[0]
    console.log(job)
    if(this.state.job === "")
    this.setState({job})
    
//     if(this.state.job !== "" && this.state.userDetail === "" && this.props.authState.currentUser.role === "admin")
//     this.props.getUser(this.state.job.acceptedBy)
// if(this.props.userState.userDetail  && this.state.userDetail === "")  
//     this.setState({userDetail: this.props.userState.userDetail})
  
  }
  componentDidUpdate (prevpros,prevstate) {
    console.log(this.props.jobState.allJobs)
    console.log(this.props.match.params.id)
    let job = this.props.jobState.allJobs.filter((j)=>j.id === this.props.match.params.id)[0]
    console.log(job)
    if(this.state.job === "" )
      this.setState({job})
      console.log(this.state )
     
    if(this.state.job !== "" 
   && this.state.userDetail === ""
    && this.props.authState.currentUser.role === "admin"){
      console.log("inside")
      this.props.getUser(this.state.job.acceptedBy)
    }
          

          console.log( prevstate)
          console.log(prevpros.userState)
          console.log(this.props.userState)
      // 
      if(this.props.userState.loaded 
        && this.state.userDetail !== this.props.userState.userDetail
        )
      //   )  {
        this.setState({userDetail: this.props.userState.userDetail})
    
         
  
    
    
  }

    getStatus(status){
      switch(status){
        case "accepted" : 
        return <Badge className="badge-default" pill>
        Sheduled
      </Badge>
        
        case "done" :
        return <Badge color="success" pill>
        Done
      </Badge>
        
        default:
        return <Badge color="info" pill>
        Open
      </Badge>
      }
    }

  render() {
      const {job} = this.state;
   return (
      <>
      <Header />  
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("assets/img/theme/blackboard.png")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    <p></p>
                    {this.getStatus(job.status)}
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                <Row className="mt-5">
                <Col lg="12" xl="12" className="mb-2">
                  <Card className="card-stats mb-4 mb-xl-0 ">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Schedule
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {job.date}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-calendar-alt" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-clock" /> { (function(now,then) {
                var date1 = new Date("08/05/2015 "+now+":20");
var date2 = new Date("08/05/2015 "+then+":32");
console.log(date2)
var diff = date2.getTime() - date1.getTime();
console.log(diff)
var duration = moment.duration(diff).humanize()
return duration
                }(job.startTime,job.endTime))
                }

                        </span>{" "}
                        <span className="text-nowrap">Duration</span>
                      </p>
                      <p className="mt-1 mb-0 text-muted text-sm">
                      <span className="text-nowrap mr-2">{job.startTime}</span>
                        
                        <span className="text-success mr-2">
                          <i className="fa fa-long-arrow-alt-right" />
                        </span>
                        <span className="text-nowrap">{job.endTime}</span>

                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="12" xl="12" className="mb-2">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Location
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                           {job.schoolName}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-map-marked-alt" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-muted mr-2">
                          <i className="fa fa-phone" /> {job.phoneNumber}
                        </span><br/>
                          <span className="text-nowrap">{job.schoolAddress}</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="12" xl="12" className="mb-2">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            About To Teach
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{job.class}</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-chalkboard-teacher" />
                          </div>
                        </Col>
                      </Row>
                      <div class=" mt-3 mb-0 text-muted text-sm">
                        <div class="card-text">
                          <dl class="row mb-0">
                            <dt class="col-sm-3 text-md-left ">Teacher Name</dt>
                            <dd class="col-sm-9 text-md-left">{job.regularTeacherName}</dd>
                          </dl>
                          <dl class="row mb-0">
                            <dt class="col-sm-3 text-md-left ">Email</dt>
                            <dd class="col-sm-9 text-md-left">{job.email}</dd>
                          </dl>
                          <dl class="row mb-0">
                            <dt class="col-sm-3 text-md-left ">Notes</dt>
                            <dd class="col-sm-9 text-md-left">{job.notes}</dd>
                          </dl>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                {(this.props.authState.currentUser.role === "admin")?
                <Col lg="12" xl="12" className="mb-2">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Detail 
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0"> Administration </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-green text-white rounded-circle shadow">
                            <i className="fas fa-lock" />
                          </div>
                        </Col>
                      </Row>
                      <div class=" mt-3 mb-0 text-muted text-sm">
                        <div class="card-text">
                        <dl class="row mb-0">
                            <dt class="col-sm-3 text-md-left ">Status</dt>
                            <dd class="col-sm-9 text-md-left">{job.status}</dd>
                          </dl>
                          <dl class="row mb-0">
                            <dt class="col-sm-3 text-md-left ">Aceepted By</dt>
                            <dd class="col-sm-9 text-md-left">{this.state.userDetail?this.state.userDetail.fname+" "+this.state.userDetail.lname :"-"}</dd>
                          </dl>
                          <dl class="row mb-0">
                            <dt class="col-sm-3 text-md-left ">Email</dt>
                            <dd class="col-sm-9 text-md-left">{this.props.userState.userDetail?this.props.userState.userDetail.email:"-"} </dd>
                          </dl>
                          <dl class="row mb-0">
                            <dt class="col-sm-3 text-md-left ">Phone Number</dt>
                            <dd class="col-sm-9 text-md-left">{this.state.userDetail?this.state.userDetail.phone:"-"} </dd>
                          </dl>
                          <dl class="row mb-0">
                            <dt class="col-sm-4 text-md-left ">Firebase Auth Id</dt>
                            <dd class="col-sm-8 text-md-left">{this.state.userDetail?this.state.userDetail.userId:"-"} </dd>
                          </dl>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>  
                : ""}
              </Row>

                </CardBody>
              </Card>
            </Col>
            
          </Row>
        </Container>


      </>
    );
  }
}


const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  getUser: (uid) => dispatch(getUser(uid))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobDetail);