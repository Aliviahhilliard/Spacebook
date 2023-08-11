import React from 'react';
import handlebars from 'handlebars'; // Import the Handlebars library
import './AlienProfileDetails.css'; // Import the styles specific to this component

// Import the Handlebars template
import alienProfileDetailsTemplate from '../handlebar-templates/alienprofiledetails.hbs';

const AlienProfileDetail = ({ profile }) => {
  // Compile the Handlebars template
  const compiledTemplate = handlebars.compile(alienProfileDetailsTemplate);

  // Render the compiled Handlebars template
  const renderedHtml = compiledTemplate(profile);

  return <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />;
};

export default AlienProfileDetail;
