import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css'; // Import global styles
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import EditProfile from './pages/EditProfile';
import AlienProfiles from './pages/AlienProfiles';
import AlienProfileDetail from './pages/AlienProfileDetail';
import EarthSightings from './pages/EarthSightings';
import SightingsMap from './pages/SightingsMap';
import Registration from './pages/Registration';
import LoginForm from './pages/LoginForm';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/user/profile" component={UserProfile} />
          <Route path="/user/edit-profile" component={EditProfile} />
          <Route path="/alien-profiles" exact component={AlienProfiles} />
          <Route path="/alien-profiles/:id" component={AlienProfileDetail} />
          <Route path="/earth-sightings" exact component={EarthSightings} />
          <Route path="/earth-sightings/map" component={SightingsMap} />
          <Route path="/register" component={Registration} />
          <Route path="/login" component={LoginForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
