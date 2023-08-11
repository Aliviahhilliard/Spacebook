import React, { useState, useEffect } from 'react';
import handlebars from 'handlebars'; // Import the Handlebars library
import './EarthSightings.css'; // Import the styles specific to this component

import earthSightingTemplate from '../handlebars-templates/earthSighting.hbs'; // Import your Handlebars template

const EarthSightings = () => {
  const [earthSightings, setEarthSightings] = useState([]);

  useEffect(() => {
    // Fetch Earth sightings from the server
    fetch('/api/earth-sightings')
      .then(response => response.json())
      .then(data => setEarthSightings(data))
      .catch(error => console.error('Error fetching Earth sightings:', error));
  }, []);

  // Compile the Handlebars template
  const compiledTemplate = handlebars.compile(earthSightingTemplate);

  return (
    <div className="earth-sightings-container">
      <header>
        <h1>Earth Sightings</h1>
      </header>
      <section>
        <ul>
          {earthSightings.map(sighting => (
            <li key={sighting.id} className="sighting-card">
              {/* Render the compiled Handlebars template */}
              <div dangerouslySetInnerHTML={{ __html: compiledTemplate(sighting) }} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default EarthSightings;
