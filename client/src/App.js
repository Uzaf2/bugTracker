import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';

import { BrowserRouter as Router, Route } from 'react-router-dom';
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
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Route exact path="/" component={Login} />
          <Route exact path="/Register" component={Register} />
          <Route exact path="/ManageUserRoles" component={ManageUserRoles} />
          <Route exact path="/UserTable" component={UserTable} />
          <Route exact path="/ViewProjectList" component={ViewProjectList} />
          <Route exact path="/SideAndNavbar" component={SideAndNavbar} />
          <Route exact path="/Users" component={Users} />
          <Route exact path="/ProjectTable2" component={ProjectTable2} />
          <Route exact path="/TicketsTable" component={TicketsTable} />
          <Route exact path="/AssignedPersonnel" component={AssignedPersonnel} />
          <Route exact path="/ProjectTable" component={ProjectTable} />
          <Route exact path="/Accounts" component={Accounts} />
          <Route exact path="/TestUserTable" component={TestUserTable} />
          <Route exact path="/TestUserRoles" component={TestUserRoles} />
          <Route exact path="/ProjectDetails2" component={ProjectDetails2} />
          <Route exact path="/Dashboard" component={Dashboard} />
          <Route exact path="/TicketPriorityBarChart" component={TicketPriorityBarChart} />
          <Route exact path="/TicketTypePieChart" component={TicketTypePieChart} />
          <Route exact path="/TicketStatusBarChart" component={TicketStatusBarChart} />
          <Route exact path="/DeveloperTicketsPieChart" component={DeveloperTicketsPieChart} />
          <Route exact path="/ManageProjectUsers" component={ManageProjectUsers} />
          <Route exact path="/TicketDetails" component={TicketDetails} />
          <Route exact path="/CreateTicket" component={CreateTicket} />
          <Route exact path="/ProjectDetails" component={ProjectDetails} />
          <Route exact path="/AssignUser" component={AssignUser} />
          <Route exact path="/AssignUser2" component={AssignUser2} />
          <Route exact path="/ProjectUserAssign" component={ProjectUserAssign} />
          <Route exact path="/CreateProject" component={CreateProject} />
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
