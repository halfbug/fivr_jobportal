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
import Index from "views/Index.jsx";
import Profile from "views/examples/Profile.jsx";
import Maps from "views/examples/Maps.jsx";
import Register from "views/examples/Register.jsx";
import Login from "views/examples/Login.jsx";
import Tables from "views/examples/Tables.jsx";
import Icons from "views/examples/Icons.jsx";
import JobList from "./views/jobs/List"
import JobView from "./views/jobs/View"
import AddJobs from "./views/jobs/Add"

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
    sidebarDisplay : true
  },
  {
    path: "/jobs/add",
    name: "Jobs",
    icon: "ni ni-single-copy-04 text-red ",
    component: AddJobs,
    layout: "/admin",
    sidebarDisplay : false
  },
  {
    path: "/jobs/available",
    name: "Jobs",
    icon: "ni ni-single-copy-04 text-red ",
    component: JobList,
    layout: "/admin",
    sidebarDisplay : false
  },
  {
    path: "/jobs/scheduled",
    name: "Jobs",
    icon: "ni ni-single-copy-04 text-red ",
    component: JobList,
    layout: "/admin",
    sidebarDisplay : false
  },
  {
    path: "/jobs/past",
    name: "Jobs",
    icon: "ni ni-single-copy-04 text-red ",
    component: JobList,
    layout: "/admin",
    sidebarDisplay : false
  },
  {
    path: "/jobs/detail/:id",
    name: "Jobs",
    icon: "ni ni-single-copy-04 text-red ",
    component: JobView,
    layout: "/admin",
    sidebarDisplay : false
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    sidebarDisplay : false,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    sidebarDisplay : false,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    sidebarDisplay : false,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    sidebarDisplay : false, 
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    sidebarDisplay : false,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    sidebarDisplay : false,
    layout: "/auth"
  }
];
export default routes;
