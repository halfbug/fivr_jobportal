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
import registerAction from "actions/registerAction";
//validation components
import { AvForm, AvGroup, AvInput , AvFeedback} from 'availity-reactstrap-validation';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  // AvGroup,
  // AvForm,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

class Register extends React.Component {
  state = {
    name: "",
    email: "",
    password: ""
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      phone: "",
      password: ""
    };
  }
  onChange = (stateName, value) => {
    this.setState({
      [stateName]: value
    });
  };
  handleSubmit(event, errors, values) {
    // event.preventDefault();
    this.setState({errors, values});
    this.props.registerAction(
      this.state.fname,
      this.state.lname,
      this.state.phone,
      this.state.email,
      this.state.password
    ).catch((e)=>console.log(e))
  }
  render() {
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            {/* <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
                <small>Sign up with</small>
              </div>
              <div className="text-center">
                <Button
                  className="btn-neutral btn-icon mr-4"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/github.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Github</span>
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/google.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>
              </div>
            </CardHeader> */}
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Sign up with credentials</small>
              </div>
              <AvForm role="Form" onSubmit={this.handleSubmit}>
                <AvGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <AvInput
                    name = "fname"
                    required
                    //validate={{required: true}}
                    pattern="^[A-Za-z0-9]+$"
                    minLength="3"
                      placeholder="First Name"
                      type="text"
                      onChange={e => this.onChange("fname", e.target.value)}
                    />
                    <AvFeedback className="text-danger ml-3">Invalid Name</AvFeedback>
                  </InputGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-tie-bow" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Last Name"
                      type="text"
                      onChange={e => this.onChange("lname", e.target.value)}
                    />
                    <AvFeedback className="text-danger ml-3">Invalid Name</AvFeedback>
                  </InputGroup>

                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-calendar-grid-58" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <AvInput
                      required
                      name="bdate"
                      placeholder="Birth Date"
                      type="date"
                      onChange={e => this.onChange("bdate", e.target.value)}
                    />
                    <AvFeedback className="text-danger ml-3">Invalid Birth Date</AvFeedback>
                  </InputGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-mobile-button" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                     // placeholder="Phone Number"
                      type="number"
                      onChange={e => this.onChange("phone", e.target.value)}
                    />
                  </InputGroup>
                </AvGroup>
                <AvGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <AvInput
                      required
                      name="email"
                      placeholder="Email"
                      type="email"
                      onChange={e => this.onChange("email", e.target.value)}
                    />
                    <AvFeedback className="text-danger ml-3">Invalid Email</AvFeedback>
                  </InputGroup>
                </AvGroup>
                <AvGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <AvInput
                    required
                      name="password"
                      //placeholder="Password"
                      type="password"
                      onChange={e => this.onChange("password", e.target.value)}
                    />
                    <AvFeedback className="text-danger ml-3">Invalid Password</AvFeedback>
                  </InputGroup>
                </AvGroup>
                <div className="text-muted font-italic">
                  <small>
                    password strength:{" "}
                    <span className="text-success font-weight-700">strong</span>
                  </small>
                </div>
                <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          I agree with the{" "}
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row>
                <div className="text-center">
                  <Button
                    className="mt-4"
                    color="primary"
                    type="Submit"
                    
                  >
                    Create account
                  </Button>
                </div>
              </AvForm>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}
const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  registerAction: (fname, lname, phone, email, password) =>
    dispatch(registerAction(fname, lname, phone, email, password))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);