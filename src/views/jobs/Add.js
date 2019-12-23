
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
import {createJob} from "../../actions/jobAction"


class AddJob extends React.Component {
    constructor(props) {
        super(props);
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
         date :"",
         startTime : "",
         endTime : "",
         email : "",
         phoneNumber :"",
         schoolName: "",
         schoolAddress : "",
         class :"",
         regularTeacherName : "",
         notes : ""
        };
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
        this.props.createJob(
          this.state.values
        ).catch((e)=>console.log(e))
      }

  render() {
      console.log(this.state)
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
                      <h3 className="mb-0">New Job</h3>
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

{(!this.props.errorState.status=== "created")?<Alert color="success">
        Job has been added successfully..
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
                             // defaultValue=""
                              name="date"
                              placeholder="mm/dd/yy"
                              type="date"
                              onChange={this.handleChange}
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
                              //defaultValue=""
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
                            <Input
                              className="form-control-alternative"
                              defaultValue=""
                              name="regularTeacherName"
                              placeholder="Mrs. White Topssy"
                              type="text"
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
                        <Input
                          
                          className="form-control-alternative"
                          placeholder="A few words about the topic to teach ..."
                          rows="4"
                          onChange={this.handleChange}
                          type="textarea"
                          name="notes"
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
      dispatch(createJob(data))
  });
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddJob);