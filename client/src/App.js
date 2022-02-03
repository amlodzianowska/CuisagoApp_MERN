import './App.css';
import Registration from './components/Registration';
import Main from './components/Main';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateEvent from './components/CreateEvent';
import {BrowserRouter,Switch,Route,Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NeighborhoodEvents from './components/NeighborhoodEvents';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Main/>
          </Route>
          <Route exact path="/register">
            <Registration/>
          </Route>
          <Route exact path="/dashboard">
            <Dashboard/>
          </Route>
          <Route exact path="/create/event">
            <CreateEvent/>
          </Route>
          <Route exact path="/events/neighborhood/:neighborhoodId">
            <NeighborhoodEvents/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
