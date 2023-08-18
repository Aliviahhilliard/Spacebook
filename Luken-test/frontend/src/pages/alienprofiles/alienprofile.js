import React, { useState, useEffect } from 'react';
import handlebars from 'handlebars';
import './AlienProfiles.css';

import alienProfilesTemplate from '../handlebar-templates/alienprofiles.hbs';

const AlienProfiles = () => {
  const [alienProfiles, setAlienProfiles] = useState([]);

  useEffect(() => {
    // Fetch alien profiles from the server
    fetch('/api/alien-profiles')
      .then(response => response.json())
      .then(data => setAlienProfiles(data))
      .catch(error => console.error('Error fetching alien profiles:', error));
  }, []);

  // Compile the Handlebars template
  const compiledTemplate = handlebars.compile(alienProfilesTemplate);

  // Create a context object for the template
  const templateContext = {
    alienProfiles,
  };

  // Render the compiled Handlebars template
  const renderedHtml = compiledTemplate(templateContext);

  return <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />;
};

export default AlienProfiles;
