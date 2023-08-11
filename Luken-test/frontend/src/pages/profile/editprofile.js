import React, { useState, useEffect } from 'react';
import handlebars from 'handlebars'; // Import the Handlebars library
import './EditProfile.css'; // Import the styles specific to this component

// Import the Handlebars template
import editProfileTemplate from '../handlebar-templates/editprofile.hbs';

const EditProfile = () => {
  const [userProfile, setUserProfile] = useState({
    username: '',
    email: '',
    bio: '',
    // Add more fields as needed
  });

  useEffect(() => {
    // Fetch user profile data from the server
    fetch('/api/user/profile')
      .then(response => response.json())
      .then(data => setUserProfile(data))
      .catch(error => console.error('Error fetching user profile:', error));
  }, []);

  // Compile the Handlebars template
  const compiledTemplate = handlebars.compile(editProfileTemplate);

  // Render the compiled Handlebars template
  const renderedHtml = compiledTemplate({ userProfile });

  return <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />;
};

export default EditProfile;
