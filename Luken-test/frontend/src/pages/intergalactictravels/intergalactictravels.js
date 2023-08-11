import React, { useState, useEffect } from 'react';
import handlebars from 'handlebars'; // Import the Handlebars library
import './IntergalacticTravels.css'; // Import the styles specific to this component

// Import the Handlebars template
import intergalacticTravelsTemplate from '../handlebar-templates/intergalactictravels.hbs';

const IntergalacticTravels = () => {
  const [intergalacticTravels, setIntergalacticTravels] = useState([]);

  useEffect(() => {
    // Fetch intergalactic travels from the server
    fetch('/api/intergalactic-travels')
      .then(response => response.json())
      .then(data => setIntergalacticTravels(data))
      .catch(error => console.error('Error fetching intergalactic travels:', error));
  }, []);

  // Compile the Handlebars template
  const compiledTemplate = handlebars.compile(intergalacticTravelsTemplate);

  // Create a context object for the template
  const templateContext = {
    intergalacticTravels,
  };

  // Render the compiled Handlebars template
  const renderedHtml = compiledTemplate(templateContext);

  return <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />;
};

export default IntergalacticTravels;
