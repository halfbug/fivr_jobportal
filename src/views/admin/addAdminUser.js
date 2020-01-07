import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Card, CardHeader, Col, CardBody, Alert } from 'reactstrap';
import Header from "../../components/Headers/Header";
import { connect } from "react-redux";

import registerAdminAction from "../../actions/registerAdminAction"


export class addAdminUser extends Component {
    constructor(props) {
        super(props);
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = 
        { email : ""}
      }


    onChange = (stateName, value) => {
        this.setState({
          [stateName]: value
        });
      };

      handleSubmit(event, errors, values) {
        event.preventDefault();
        // this.setState({errors, values});
        this.props.registerAdminAction(
                    this.state.email,
          
        ).catch((e)=>console.log(e))
      }

    render() {
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
                      <h3 className="mb-0">Add Admin User </h3>
                    </Col>
                    <Col className="text-right" xs="4">
                                         </Col>
                  </Row>
                  </CardHeader>
                  <CardBody>


      <Form onSubmit={this.handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="exampleEmail"
        onChange={e => this.onChange("email", e.target.value)}
         placeholder="any registered user email " required />
      </FormGroup>
      
      <Button color="primary">Save</Button>
    </Form>
    </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
        </>
        )
    }
}
const mapStateToProps = state => ({
    ...state
  });
  const mapDispatchToProps = dispatch => ({
    registerAdminAction: (email) =>
      dispatch(registerAdminAction( email))
  });
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(addAdminUser)
