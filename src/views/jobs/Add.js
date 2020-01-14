
import React from "react";
import { connect } from "react-redux";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  Input,
  FormGroup,
  Form,
  Alert,
  Container,
  Row,
  Col,
  Button,
  CardBody,
  UncontrolledTooltip
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
// import DatePicker from "../../components/daterangePicker";
// import 'bootstrap-daterangepicker/daterangepicker.css';
// import DateRangePicker from 'react-bootstrap-daterangepicker';
// import DatePicker from "../../components/datePicker" 
import { AvForm, AvGroup, AvInput , AvFeedback} from 'availity-reactstrap-validation';
import {createJob , updateJob} from "../../actions/jobAction"

const initialState = {
  date :"",
  startTime : "",
  endTime : "",
  email : "",
  phoneNumber :"",
  schoolName: "",
  schoolAddress : "",
  class :"",
  regularTeacherName : "",
  notes : "",
  errorMessage : "",
  heading : "Add",
  errors : [],
  values : []
         };

class AddJob extends React.Component {
    constructor(props) {
        super(props);
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = initialState
      }

      componentDidMount () {
        console.log(this.props.jobState.allJobs)
        // console.log(this.props.match.params.id)
        console.log(this.props);
        if(this.props.match.path.indexOf("edit")>-1)
        {
          let job = this.props.jobState.allJobs.filter((j)=>j.id === this.props.match.params.id)[0]
          console.log(job)
          const {date,
          startTime,
          endTime,
          email,
          phoneNumber,
          schoolName,
          schoolAddress,
           regularTeacherName,
          notes} = job;
          
          this.setState({date,
            startTime,
            endTime,
            email,
            phoneNumber,
            schoolName,
            schoolAddress,
            class : job.class,
            regularTeacherName,
            notes,
            heading : "Edit"
          })
        }
      }

      handleChange = (e) => {
          
        this.setState({
          [e.target.name]: e.target.value
        });
      };
      
      handleSubmit(event, errors, values) {
        event.preventDefault();
        
        this.setState({errors, values});
        console.log(this.state)
        if(this.state.errors.length<1)
        if(this.props.match.path.indexOf("edit")>-1)
        {
          this.props.updateJob({
            ...this.state.values,
            id: this.props.match.params.id
          }
          ).catch((e)=>this.setState({errorMessage : e.message}))
        }
        else {
          this.props.createJob(
            this.state.values
          ).catch((e)=>this.setState({errorMessage : e.message}))
          this.setState(initialState)
        }
      
      }

  render() {
      console.log(this.state)
      const {date,
        startTime,
        endTime,
        email,
        phoneNumber,
        schoolName,
        schoolAddress,
       
        regularTeacherName,
        notes} = this.state
    return (
      <>
        <Header />  
        {/* Page content */}
        <Container className="mt--7" fluid> 
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">{this.state.heading} Job</h3>
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

{(this.props.jobState.status=== "created")?<Alert color="success">
        Job has been save successfully..
        </Alert>:""}

        {this.state.errorMessage?<Alert color="danger">
        {this.state.errorMessage}
        </Alert>:""}

                  <AvForm role="Form" onSubmit={this.handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">
                      Shecdule information
                    </h6>

                   
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="12">
                        {/* <AvGroup>
                        
                                  <DatePicker className="form-control-alternative" />
                        </AvGroup> */}
                          <AvGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-date"
                            >
                              Date
                            </label>
                            <AvInput
                              className="form-control-alternative"
                             required
                              name="date"
                              placeholder="mm/dd/yy"
                              type="date"
                              onChange={this.handleChange}
                              value={date}
                              min={Date.now()}
                            />
                            <AvFeedback className="text-danger ml-3">Invalid </AvFeedback>
                          </AvGroup>
                        </Col> 
                        
                      </Row>
                      <Row>
                        <Col lg="6">
                          <AvGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-strat-time"
                            >
                              Start Time
                            </label>
                            <AvInput
                            required
                              className="form-control-alternative"
                              //defaultValue=""
                              name="startTime"
                              onChange={this.handleChange}
                              type="time"
                              value={startTime}
                            />
                            <AvFeedback className="text-danger ml-3">Invalid </AvFeedback>
                          </AvGroup>
                        </Col>
                        <Col lg="6">
                          <AvGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              End Time
                            </label>
                            <AvInput
                            required
                              className="form-control-alternative"
                              value={endTime}
                              name="endTime"
                              placeholder="Last name"
                              type="time"
                              onChange={this.handleChange}
                            />
                            <AvFeedback className="text-danger ml-3">Invalid </AvFeedback>
                          </AvGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Location information
                    </h6>
                    <div className="pl-lg-4">
                    <Row>
                        <Col lg="6">
                          <AvGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-strat-time"
                            >
                              School Name
                            </label>
                            <AvInput
                            required
                    //validate={{required: true}}
                   // pattern="^[A-Za-z0-9]+$"
                    minLength="3"
                              className="form-control-alternative"
                              name="schoolName"
                              placeholder="School Name"
                              type="text"
                              value={schoolName}
                              onChange={this.handleChange}
                            />
                            <AvFeedback className="text-danger ml-3">Invalid </AvFeedback>
                          </AvGroup>
                        </Col>
                        <Col lg="6">
                          <AvGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Phone Number
                            </label>
                            <AvInput
                              required
                              minLength="6"
                              className="form-control-alternative"
                              //defaultValue="Jesse"
                              name="phoneNumber"
                             // placeholder="Last name"
                              type="number"
                              value={phoneNumber}
                              onChange={this.handleChange}
                            />
                            <AvFeedback className="text-danger ml-3">Invalid </AvFeedback>
                          </AvGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <AvGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address
                            </label>
                            <AvInput
                              className="form-control-alternative"
                           //   defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                              name="schoolAddress"
                             // placeholder="Home Address"
                              type="text"
                              value={schoolAddress}
                              onChange={this.handleChange}
                            />
                            <AvFeedback className="text-danger ml-3">Invalid </AvFeedback>
                          </AvGroup>
                        </Col>
                      </Row>
                      
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">About To Teach</h6>
                    <div className="pl-lg-4">
                    <Row>
                        <Col lg="4">
                          <AvGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              Class
                            </label>
                            <AvInput
                              className="form-control-alternative"
                              //defaultValue=""
                              name="class"
                              placeholder="Chemistry / Spanish"
                              type="text"
                              value={this.state.class}
                              onChange={this.handleChange}
                            />
                            <AvFeedback className="text-danger ml-3">Invalid </AvFeedback>
                          </AvGroup>
                        </Col>
                        <Col lg="4">
                          <AvGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Regular Teacher Name
                            </label>
                            <AvInput
                              className="form-control-alternative"
                              defaultValue=""
                              name="regularTeacherName"
                              placeholder="Mrs.White Topssy"
                              type="text"
                              value={regularTeacherName}
                              onChange={this.handleChange}
                            />
                            <AvFeedback className="text-danger ml-3">Invalid </AvFeedback>
                          </AvGroup>
                        </Col>
                        <Col lg="4">
                          <AvGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Email
                            </label>
                            <AvInput
                              className="form-control-alternative"
                              name="email"
                             // placeholder="Postal code"
                              type="email"
                              value={email}
                              onChange={this.handleChange}
                            />
                            <AvFeedback className="text-danger ml-3">Invalid </AvFeedback>
                          </AvGroup>
                        </Col>
                      </Row>
                      
                      <AvGroup>
                      <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >Notes</label>
                        <AvInput
                          
                          className="form-control-alternative"
                          placeholder="A few words about the topic to teach ..."
                          rows="4"
                          onChange={this.handleChange}
                          type="textarea"
                          name="notes"
                          value={notes}
                        />
                        <AvFeedback className="text-danger ml-3">Invalid </AvFeedback>
                      </AvGroup>
                    </div>
                    <div className="text-center">
                  <Button
                    className="mt-4"
                    color="primary"
                    type="Submit"
                    
                  >
                    Save
                  </Button>
                </div>
                  </AvForm>
                  </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

// export default AddJob;
const mapStateToProps = state => ({
    ...state
  });
  const mapDispatchToProps = dispatch => ({
    createJob: (data) =>
      dispatch(createJob(data)),
    updateJob: (data) =>
      dispatch(updateJob(data)),  
  });
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddJob);