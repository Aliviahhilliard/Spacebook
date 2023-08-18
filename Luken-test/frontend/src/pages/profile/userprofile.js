import React, { useState, useEffect } from 'react';
import handlebars from 'handlebars'; // Import the Handlebars library
import './UserProfile.css'; // Import the styles specific to this component

// Import the Handlebars template
import userProfileTemplate from '../handlebar-templates/userprofile.hbs';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({
    username: '',
    email: '',
    bio: '',
    profileImage: '',  // Added profileImage property
    // Add more fields as needed
  });

  useEffect(() => {
    // Fetch user profile data from the server
    fetch('/api/user/profile')
      .then(response => response.json())
      .then(data => {
        // Assuming the returned data contains a profileImage property
        setUserProfile({
          username: data.username,
          email: data.email,
          bio: data.bio,
          profileImage: data.profileImage  // Updating profileImage from the fetched data
        });
      })
      .catch(error => console.error('Error fetching user profile:', error));
  }, []);

  // Compile the Handlebars template
  const compiledTemplate = handlebars.compile(userProfileTemplate);

  // Render the compiled Handlebars template
  const renderedHtml = compiledTemplate({ userProfile });

  return <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />;
};

export default UserProfile;
