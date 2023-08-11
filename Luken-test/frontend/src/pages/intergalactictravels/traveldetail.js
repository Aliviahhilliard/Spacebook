import React from 'react';
import handlebars from 'handlebars'; // Import the Handlebars library
import './TravelDetails.css'; // Import the styles specific to this component

// Import the Handlebars template
import travelDetailsTemplate from '../handlebar-templates/traveldetails.hbs';

const TravelDetails = ({ travel }) => {
  // Compile the Handlebars template
  const compiledTemplate = handlebars.compile(travelDetailsTemplate);

  // Render the compiled Handlebars template
  const renderedHtml = compiledTemplate({ travel });

  return <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />;
};

export default TravelDetails;
