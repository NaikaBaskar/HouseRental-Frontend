// import logo from './logo.svg';
import './App.css';
import {HashRouter as Router,Route,Switch} from 'react-router-dom'
import Home from './components/Home';
import {Component} from 'react'
import Student from './components/Student';
import OwnerLogin from './components/OwnerLogin';
import OwnerSignUp from './components/OwnerSignUp';
import TenantLogin from './components/TenantLogin';
import TenantSignUp from './components/TenantSignUp';
import ViewHouses from './components/ViewHouses';
import ViewOwners from './components/ViewOwners';
import ViewTenants from './components/ViewTenants';
import AddHouse from './components/AddHouse';
import SideNavbar from './components/SideNavbar';
import TenantHouses from './components/TenantHouses';
import Requests from './components/Requests';
import OwnerHouses from './components/OwnerHouses';
import FilledHousesOfOwner from './components/FilledHousesOfOwner';
import VacantHousesOfOwner from './components/VacantHousesOfOwner';
import Profile from './components/Profile';
import PendingHouses from './components/PendingHouses';
import ViewUser from './components/ViewUser';


class App extends Component {
  render(){
    
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Router>
      <div>
        {/* <SideNavbar/> */}
        <Switch>
          <Route exact path="/">
            <Home ></Home>
          </Route>
          <Route exact path="/student">
            <Student></Student>
          </Route>
           <Route exact path="/owner/login">
            <OwnerLogin ></OwnerLogin>
          </Route>
          <Route exact path="/user/profile">
            <Profile></Profile>
          </Route>
           <Route exact path="/owner/signUp">
            <OwnerSignUp ></OwnerSignUp>
          </Route>
           <Route exact path="/tenant/login">
            <TenantLogin ></TenantLogin>
          </Route>
           <Route exact path="/tenant/signUp">
            <TenantSignUp ></TenantSignUp>
          </Route>
          <Route exact path="/owner/getOwners">
            <ViewOwners ></ViewOwners>
          </Route>
          <Route exact path="/tenant/getTenants">
            <ViewTenants></ViewTenants>
          </Route>
          <Route exact path="/house/getHouses">
            <ViewHouses></ViewHouses>
          </Route>
          <Route exact path="/house/getHousesOfOwner">
            <OwnerHouses />
          </Route>
          <Route exact path="/house/add">
            <AddHouse></AddHouse>
          </Route>
          <Route exact path="/house/tenant/confirmedHouses">
            <TenantHouses/>
          </Route>
          <Route exact path="/housesOwned/requestedHouses">
            <Requests/>
          </Route>
          <Route exact path="/housesOwned/filledHouses">
            <FilledHousesOfOwner/>
          </Route>
          <Route exact path="/housesOwned/pendingHouses">
            <PendingHouses/>
          </Route>
          <Route exact path="/house/getVacantHousesOfOwner">
            <VacantHousesOfOwner/>
          </Route>
          <Route exact path="/viewUser">
            <ViewUser />
          </Route>
        </Switch>
      </div>
    </Router>
  );
  }
}

export default App;
