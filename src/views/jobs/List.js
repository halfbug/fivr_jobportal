
import React from "react";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
    
  Table,
  Container,
  Row,
  
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import UserHeader from "components/Headers/UserHeader.jsx";
import {listJobs, deleteJob, acceptJob, rejectJob, doneJob, quitJob} from "../../actions/jobAction"
import { connect } from "react-redux";

import moment from 'moment';
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import {isAdmin, isClient} from '../../utilities/auth'
import ModalAlert from "../../components/ModalAlert";


class JobsList extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
        jobs : "",
        loaded : false,
        jtype : "open",
        role : "client",
        modal : false,
        selectedJob : "",
        actionCallback : "",
        alert : {
          title : "",
          message : ""
        }
        
        };

        
        this.handleDelete = this.handleDelete.bind(this);
      }

componentDidMount(prevprops){
  console.log(this.state.jobs)
  console.log(this.props)
  // console.log("(9999((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((")
  this.getJobsByType();  
}

getJobsByType(){
  console.log("this is type check")
  let jtype = ""
  switch(this.props.location.pathname.split('/')[3]){
    case "scheduled" : 
    jtype = "accepted"
    break;
    case "past" :
    jtype= "done"
    break;
    default:
    jtype= "open"
  }
console.log(this.state.jobs)
console.log(this.props.authState.loggedIn)
  if (this.state.jobs === "" && this.props.authState.loggedIn  ){
    this.props.listJobs(jtype);
    this.setState({
      jtype,
      // role : this.props.authState.currentUser.role
    })

  }

}



componentDidUpdate(prevProps,prevState) {
  console.log(this.props.jobState.status )
  console.log(this.props.authState.loggedIn)
  if( this.props.jobState === undefined && this.props.authState.loggedIn)
  this.getJobsByType();

  if (prevProps.jobState !== this.props.jobState) {
    this.getJobsByType();

    console.log("################ inside #######")
this.getJobsByType();
    this.setState({
    jobs : this.props.jobState.allJobs.filter((job)=>job.status === this.state.jtype),
    loaded : true,
    selectedJob : "",
    action : "",
    modal : false
  })
  
  }  
  else{
    console.log(this.props.jobState.availableJobs)
  }
}

    handleDelete(e){
      console.log("delete***************************")
      console.log(this.props)
      this.props.deleteJob(this.state.selectedJob)
      .catch((e)=>this.setState({errorMessage : e.message}))
      this.toggle();
    }

    
    listAllJobs(){
      // const {jobState} = this.props;
        // console.log(this.state.jobs.length)
        console.log(this.state.jobs)
        if(this.state.jobs.length > 0){
          // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
          return this.state.jobs.map((job)=>{
            // console.log(job)
            return <tr key={job.id}>
            <th scope="row">
              <Media className="align-items-center">
                <a
                  className="avatar rounded-circle mr-3"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  
                  <i className="ni ni-hat-3"/>
                </a>
                <Media>
                  <span className="mb-0 text-sm">
                    <Link to={`/admin/jobs/detail/${job.id}`}>{job.schoolName}</Link>
                  </span>
                </Media>
              </Media>
            </th>
            <td>{job.date}</td>
            <td>
              <Badge color="" className="badge-dot mr-4">
                <i className="bg-warning" />
                {job.status}
              </Badge>
            </td>
            <td>
             
              { (function(now,then) {
                var date1 = new Date("08/05/2015 "+now+":20");
var date2 = new Date("08/05/2015 "+then+":32");
//console.log(date2)
var diff = date2.getTime() - date1.getTime();
//console.log(diff)
var duration = moment.duration(diff).humanize()
return duration
                }(job.startTime,job.endTime))
                }

             </td>
            
            <td className="text-right">
             
            {isClient(this.props.authState.currentUser) && this.state.jtype === "open" ?   <>
              <Button color="default" size="sm"  onClick={(e)=>{this.toggle(); 
                this.setState({selectedJob:job,
                    alert:{
                      title:"Accept Job !!!",
                      message : <span>Are you sure you want to accept the job of <br/><b> {job.schoolName}</b>.
                     
                      </span>
                    },
                    actionCallback:()=>this.props.acceptJob(job)
                    })}} type="button">
                Accept</Button>{" "}
              <Button color="primary" size="sm" onClick={e => {this.toggle(); 
                this.setState({selectedJob:job,
                    alert:{
                      title:"Reject Job !!!",
                      message : <span>Are you sure you want to reject job of <b> {job.schoolName}</b>.
                      <br/> You will no longer see this job again.
                      </span>
                    },
                    actionCallback:()=>this.props.rejectJob(job)
                    })}}
                type="button">
                Reject</Button></>
:" "}

{isClient(this.props.authState.currentUser) && this.state.jtype === "accepted" ? <>  
<Button color="primary" size="sm" onClick={e => {this.toggle(); 
                this.setState({selectedJob:job,
                    alert:{
                      title:"Done Job !!!",
                      message : <span>Are you sure you want to make as done, the job of <b> {job.schoolName}</b>.
                      </span>
                    },
                    actionCallback:()=>this.props.doneJob(job)
                    })}} type="button">
                Done</Button>
              <Button color="danger" size="sm"  onClick={e => {this.toggle(); 
                this.setState({selectedJob:job,
                    alert:{
                      title:"Quit Job !!!",
                      message : <span>Are you sure you want to quit form the job of <b> {job.schoolName}</b>.
                      </span>
                    },
                    actionCallback:()=>this.props.quitJob(job)
                    })}} type="button">
                Quit </Button>
                </>
              
:" "}


{isAdmin(this.props.authState.currentUser)?<UncontrolledDropdown>
                <DropdownToggle
                  className="btn-icon-only text-light"
                  href="#pablo"
                  role="button"
                  size="sm"
                  color=""
                  onClick={e => e.preventDefault()}
                >
                  <i className="fas fa-ellipsis-v" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem
                  to={`/admin/jobs/detail/${job.id}`}
                  tag= {NavLinkRRD}
                  
                  >
                  View
                  </DropdownItem>
                  <DropdownItem
                  to={`/admin/jobs/edit/${job.id}`}
                  tag= {NavLinkRRD}
                  
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={e => {this.toggle(); this.setState({selectedJob:job,
                    alert:{
                      title:"Delete Job !!!",
                      message : <span>Are you sure you want to delete job of <b> {job.schoolName}</b></span>
                    },
                    actionCallback: this.handleDelete
                    })}}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>:" "}
              
            </td>
          </tr>
          })
        }
        else if(this.state.jobs==="")
        return <tr><td>loading...</td></tr>
        else
        return <tr><td>No record found</td></tr>
        // 
        
    }

  render() {
      console.log(this.state);
      // this.listAllJobs();
      const heading = function(str){
        return str.replace(str.charAt(0),str.charAt(0).toUpperCase())
        }(this.props.location.pathname.split('/')[3])
    return (
      <>
        <UserHeader 
        theme="classroom.jpg" 
        heading={heading}
        detail = "Jobs listed below for the subtitute teacher protal"
        buttonLink= '/admin/jobs/add'
        buttonTxt="Add Job"
         />
        
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Jobs List</h3>
                </CardHeader>
        

                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Location</th>
                      <th scope="col">Date Time</th>
                      <th scope="col">Status</th>
                      <th scope="col">Duration</th>
                      <th scope="col" />
                    </tr>
                  </thead>
             
                  <tbody>
                    
                    {this.listAllJobs()}
                                      </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
         
        </Container>
        <Modal isOpen={this.state.modal} toggle={this.toggle}  className="modal-dialog-centered text-white" >
        <ModalHeader toggle={this.toggle} className="modal-header bg-gradient-info ">{this.state.alert.title}</ModalHeader>
        <ModalBody className="modal-body bg-gradient-info">
        <div className="py-3 text-center">
                  <i className="ni ni-bell-55 ni-3x" />
                  <h4 className="heading mt-4">Please Confirm</h4>
                  <p>
         {this.state.alert.message}
         </p>
                </div>
          </ModalBody>
        <ModalFooter className="modal-footer bg-gradient-info">
          <Button onClick={this.state.actionCallback} className="btn-white" color="warnig" type="button">Ok</Button>{' '}
          <Button  onClick={this.toggle} className="text-white ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button" >Cancel</Button>
        </ModalFooter>
      </Modal>
      <ModalAlert>
        {"Check me i am alert"}
        {"are you sure to do this???"}
      </ModalAlert>
      </>
    );
  }

  toggle = () => this.setState({modal:!this.state.modal});
}
// export default AddJob;
const mapStateToProps = state => ({
    ...state
  });
  const mapDispatchToProps = dispatch => ({
    listJobs: (type) =>
      dispatch(listJobs(type)),
    deleteJob: (job)=>
      dispatch(deleteJob(job)),
    rejectJob: (job)=>
      dispatch(rejectJob(job)),
    acceptJob: (job)=>
      dispatch(acceptJob(job)),
    doneJob: (job)=>
      dispatch(doneJob(job)),
    quitJob: (job)=>
      dispatch(quitJob(job))



  });
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(JobsList);
