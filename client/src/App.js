import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

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
     </Router>
    </div>
    </ApolloProvider>
  );
}

export default App;
