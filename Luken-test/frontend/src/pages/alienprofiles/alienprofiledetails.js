import React from 'react';
import handlebars from 'handlebars'; 
import './AlienProfileDetails.css'; 

import alienProfileDetailsTemplate from '../handlebar-templates/alienprofiledetails.hbs';

const AlienProfileDetail = ({ profile }) => {
  // Compile the Handlebars template
  const compiledTemplate = handlebars.compile(alienProfileDetailsTemplate);

  // Ensure the data passed to the template is in the expected format
  const templateData = { profile };  // This ensures we can access profile properties using profile.propertyName

  // Render the compiled Handlebars template
  const renderedHtml = compiledTemplate(templateData);

  return <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />;
};

export default AlienProfileDetail;
