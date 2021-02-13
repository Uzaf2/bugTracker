import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import ManageUserRoles from './pages/ManageUserRoles';
import UserList from './components/UserList';
import UserTable from './components/UserTable';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateProject from './pages/CreateProject';
import ViewProjectList from './pages/ViewProjectsList';
import SideAndNavbar from './components/SideAndNavbar';
import Users from './pages/Users';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import ProjectTable from './components/ProjectTable';

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
          <Route exact path="/Users" component={Users} />
          <Route exact path="/UserList" component={UserList} />
          <Route exact path="/CreateProject" component={CreateProject} />
          <Route exact path="/ProjectTable" component={ProjectTable} />
          <Route exact path="/SideAndNavbar" component={SideAndNavbar} />
          <Route exact path="/ViewProjectList" component={ViewProjectList} />
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
