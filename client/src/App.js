import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';
import ProtectedRoute from './util/ProtectedRoute';

import {AuthProvider} from './context/auth';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

import ManageUserRoles from './pages/ManageUserRoles';
import UserTable from './components/UserTable';
import ViewProjectList from './pages/ViewProjectsList';
import SideAndNavbar from './components/SideAndNavbar';
import Users from './pages/Users';
import ProjectTable2 from './components/ProjectTable2';
import TicketsTable from './components/TicketsTable';

import AssignedPersonnel from './components/AssignedPersonnel';
import ProjectTable from './components/ProjectTable';
import Accounts from './pages/Accounts';
import TestUserTable from './components/TestUserTable';
import TestUserRoles from './pages/TestUserRoles';
import ProjectDetails2 from './pages/ProjectDetails2';
import Dashboard from './pages/Dashboard';
import TicketPriorityBarChart from './components/TicketPriorityBarChart';
import TicketTypePieChart from './components/TicketTypePieChart';
import TicketStatusBarChart from './components/TicketStatusBarChart';
import DeveloperTicketsPieChart from './components/DeveloperTicketsPieChart';
import ManageProjectUsers from './pages/ManageProjectUsers';
import TicketDetails from './pages/TicketDetails';
import TicketDetailsComponent from './components/TicketDetailsComponent';
//////////////// They are causing problems with TextFields//////
import AssignUser from './pages/AssignUser';
import ProjectUserAssign from './pages/ProjectUserAssign';
import AssignUser2 from './pages/AssignUser2';
import CreateTicket from './pages/CreateTicket';
import ProjectDetails from './pages/ProjectDetails';
import CreateProject from './pages/CreateProject';
///////////////////////////////////////////////////////////


const client = new ApolloClient({
  uri: 'http://localhost:5000/',
  cache: new InMemoryCache()
});

function App() {
  return (
        <AuthProvider>
        <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/Register" component={Register} />
          <ProtectedRoute exact path="/ManageUserRoles" component={ManageUserRoles} />
          <ProtectedRoute exact path="/UserTable" component={UserTable} />
          <ProtectedRoute exact path="/ViewProjectList" component={ViewProjectList} />
          <ProtectedRoute exact path="/SideAndNavbar" component={SideAndNavbar} />
          <ProtectedRoute exact path="/Users" component={Users} />
          <ProtectedRoute exact path="/ProjectTable2" component={ProjectTable2} />
          <ProtectedRoute exact path="/TicketsTable" component={TicketsTable} />
          <ProtectedRoute exact path="/AssignedPersonnel" component={AssignedPersonnel} />
          <ProtectedRoute exact path="/ProjectTable" component={ProjectTable} />
          <ProtectedRoute exact path="/Accounts" component={Accounts} />
          <ProtectedRoute exact path="/TestUserTable" component={TestUserTable} />
          <ProtectedRoute exact path="/TestUserRoles" component={TestUserRoles} />
          <ProtectedRoute exact path="/ProjectDetails2" component={ProjectDetails2} />
          <ProtectedRoute exact path="/Dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/TicketPriorityBarChart" component={TicketPriorityBarChart} />
          <ProtectedRoute exact path="/TicketTypePieChart" component={TicketTypePieChart} />
          <ProtectedRoute exact path="/TicketStatusBarChart" component={TicketStatusBarChart} />
          <ProtectedRoute exact path="/DeveloperTicketsPieChart" component={DeveloperTicketsPieChart} />
          <ProtectedRoute exact path="/ManageProjectUsers" component={ManageProjectUsers} />
          <ProtectedRoute exact path="/TicketDetails" component={TicketDetails} />
          <ProtectedRoute exact path="/TicketDetailsComponent" component={TicketDetailsComponent} />
          <ProtectedRoute exact path="/CreateTicket" component={CreateTicket} />
          <ProtectedRoute exact path="/ProjectDetails" component={ProjectDetails} />
          <ProtectedRoute exact path="/AssignUser" component={AssignUser} />
          <ProtectedRoute exact path="/AssignUser2" component={AssignUser2} />
          <ProtectedRoute exact path="/ProjectUserAssign" component={ProjectUserAssign} />
          <ProtectedRoute exact path="/CreateProject" component={CreateProject} />
          </Switch>
        </Router>
        </AuthProvider>
  );
}

export default App;
