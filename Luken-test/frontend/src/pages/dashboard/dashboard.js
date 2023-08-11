import React, { useEffect, useState } from 'react';
import handlebars from 'handlebars'; // Import the Handlebars library
import './Dashboard.css'; // Import the styles specific to this component

// Import the Handlebars template
import dashboardTemplate from '../handlebar-templates/dashboard.hbs';

const Dashboard = () => {
  const [alienProfiles, setAlienProfiles] = useState([]);
  const [intergalacticTravels, setIntergalacticTravels] = useState([]);
  const [earthSightings, setEarthSightings] = useState([]);

  useEffect(() => {
    // Fetch alien profiles
    fetch('/api/alien-profiles')
      .then(response => response.json())
      .then(data => setAlienProfiles(data))
      .catch(error => console.error('Error fetching alien profiles:', error));

    // Fetch intergalactic travels
    fetch('/api/intergalactic-travels')
      .then(response => response.json())
      .then(data => setIntergalacticTravels(data))
      .catch(error => console.error('Error fetching intergalactic travels:', error));

    // Fetch Earth sightings
    fetch('/api/earth-sightings')
      .then(response => response.json())
      .then(data => setEarthSightings(data))
      .catch(error => console.error('Error fetching Earth sightings:', error));
  }, []);

  // Compile the Handlebars template
  const compiledTemplate = handlebars.compile(dashboardTemplate);

  // Create a context object for the template
  const templateContext = {
    alienProfiles,
    intergalacticTravels,
    earthSightings,
  };

  // Render the compiled Handlebars template
  const renderedHtml = compiledTemplate(templateContext);

  return <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />;
};

export default Dashboard;
