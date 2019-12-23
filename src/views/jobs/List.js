
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
  
  Table,
  Container,
  Row,
  
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import UserHeader from "components/Headers/UserHeader.jsx";
import {listJobs} from "../../actions/jobAction"
import { connect } from "react-redux";

import moment from 'moment';
import { NavLink as NavLinkRRD, Link } from "react-router-dom";

class JobsList extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
        jobs : "",
        loaded : false
        };
      }

componentDidMount(prevprops){
  console.log(this.state.jobs)
  console.log(this.props)
  if (!this.state.jobs){
    this.props.listJobs("open");

  }
  
}


componentDidUpdate(prevProps) {
  if (prevProps.jobState !== this.props.jobState) {
  this.setState({
    jobs : this.props.jobState.availableJobs,
    loaded : true
  })
  
  }  
  else{
    console.log(this.props.jobState.availableJobs)
  }


}


    listAllJobs(){
      // const {jobState} = this.props;
        // console.log(this.state.jobs.length)
        console.log(this.state.jobs)
        if(this.state.jobs){
          console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
          return this.state.jobs.map((job)=>{
            console.log(job)
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
                    {job.schoolName}
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
console.log(date2)
var diff = date2.getTime() - date1.getTime();
console.log(diff)
var duration = moment.duration(diff).humanize()
return duration
                }(job.startTime,job.endTime))
                }

             </td>
            
            <td className="text-right">
              <UncontrolledDropdown>
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
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                  <Link to={`/admin/jobs/detail/${job.id}`}>View</Link> 
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
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
    return (
      <>
        <UserHeader 
        theme="classroom.jpg" 
        heading="Subtitute Teacher Jobs List" 
        detail = "Recent jobs listed below for the subtitute teacher protal"
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
      </>
    );
  }
}
// export default AddJob;
const mapStateToProps = state => ({
    ...state
  });
  const mapDispatchToProps = dispatch => ({
    listJobs: (type) =>
      dispatch(listJobs(type))
  });
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(JobsList);
