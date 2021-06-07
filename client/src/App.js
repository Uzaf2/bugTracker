import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';
import ProtectedRoute from './util/ProtectedRoute';
import {AuthProvider} from './context/auth';
import ManageUserRoles from './pages/ManageUserRoles';
import UserTable from './components/UserTable';
import SideAndNavbar from './components/SideAndNavbar';
import ProjectTable2 from './components/ProjectTable2';
import TicketsTable from './components/TicketsTable';
import AssignedPersonnel from './components/AssignedPersonnel';
import ProjectTable from './components/ProjectTable';
import Accounts from './pages/Accounts';
import ProjectDetails from './pages/ProjectDetails';
import Dashboard from './pages/Dashboard';
import TicketPriorityBarChart from './components/TicketPriorityBarChart';
import TicketTypePieChart from './components/TicketTypePieChart';
import TicketStatusBarChart from './components/TicketStatusBarChart';
import DeveloperTicketsPieChart from './components/DeveloperTicketsPieChart';
import ManageProjectUsers from './components/ManageProjectUsers';
import TicketDetails from './components/TicketDetails';
import TicketDetails2 from './components/TicketDetails2';
import TicketDetailsComponent from './components/TicketDetailsComponent';
import ProjectUserAssign from './pages/ProjectUserAssign';
import AssignUser from './components/AssignUser';
import CreateTicket from './components/CreateTicket';
import CreateProject from './components/CreateProject';
import TicketDetailsPage from './pages/TicketDetailsPage';
import UserProfile from './pages/UserProfile';
import TicketTypeNewPieChart from './components/TicketTypeNewPieChart';

function App() {
  return (
        <AuthProvider>
        <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/Register" component={Register} />
          <Route exact path="/Accounts" component={Accounts} />
          <ProtectedRoute exact path="/ManageUserRoles" component={ManageUserRoles} />
          <ProtectedRoute exact path="/UserProfile" component={UserProfile} />
          <ProtectedRoute exact path="/UserTable" component={UserTable} />
          <ProtectedRoute exact path="/SideAndNavbar" component={SideAndNavbar} />
          <ProtectedRoute exact path="/ProjectTable2" component={ProjectTable2} />
          <ProtectedRoute exact path="/TicketsTable" component={TicketsTable} />
          <ProtectedRoute exact path="/AssignedPersonnel" component={AssignedPersonnel} />
          <ProtectedRoute exact path="/ProjectTable" component={ProjectTable} />
          <ProtectedRoute exact path="/Accounts" component={Accounts} />
          <ProtectedRoute exact path="/ProjectDetails" component={ProjectDetails} />
          <ProtectedRoute exact path="/Dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/TicketPriorityBarChart" component={TicketPriorityBarChart} />
          <ProtectedRoute exact path="/TicketTypePieChart" component={TicketTypePieChart} />
          <ProtectedRoute exact path="/TicketStatusBarChart" component={TicketStatusBarChart} />
          <ProtectedRoute exact path="/DeveloperTicketsPieChart" component={DeveloperTicketsPieChart} />
          <ProtectedRoute exact path="/ManageProjectUsers" component={ManageProjectUsers} />
          <ProtectedRoute exact path="/TicketDetails" component={TicketDetails} />
          <ProtectedRoute exact path="/TicketDetails2" component={TicketDetails2} />
          <ProtectedRoute exact path="/TicketDetailsComponent" component={TicketDetailsComponent} />
          <ProtectedRoute exact path="/CreateTicket" component={CreateTicket} />
          <ProtectedRoute exact path="/AssignUser" component={AssignUser} />
          <ProtectedRoute exact path="/ProjectUserAssign" component={ProjectUserAssign} />
          <ProtectedRoute exact path="/CreateProject" component={CreateProject} />
          <ProtectedRoute exact path="/TicketDetailsPage" component={TicketDetailsPage} />
          <ProtectedRoute exact path="/TicketTypeNewPieChart" component={TicketTypeNewPieChart} />
          </Switch>
        </Router>
        </AuthProvider>
  );
}

export default App;
