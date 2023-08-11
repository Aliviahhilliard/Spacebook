import React from 'react';
import handlebars from 'handlebars'; // Import the Handlebars library
import './Home.css'; // Import the styles specific to this component

// Import the Handlebars template
import homeTemplate from '../handlebar-templates/home.hbs';

const Home = () => {
  // Compile the Handlebars template
  const compiledTemplate = handlebars.compile(homeTemplate);

  // Create a context object for the template
  const templateContext = {
    buttonLabel: 'Get Started', // Customize the button label as needed
  };

  // Render the compiled Handlebars template
  const renderedHtml = compiledTemplate(templateContext);

  return <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />;
};

export default Home;
