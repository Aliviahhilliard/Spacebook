import React, { useState, useEffect } from 'react';
import handlebars from 'handlebars'; // Import the Handlebars library
import './SightingsMap.css'; // Import the styles specific to this component

// Import the Handlebars template
import sightingsMapTemplate from '../handlebar-templates/sightingsmap.hbs';

const SightingsMap = () => {
  const [earthSightings, setEarthSightings] = useState([]);

  useEffect(() => {
    // Fetch Earth sightings from the server
    fetch('/api/earth-sightings')
      .then(response => response.json())
      .then(data => setEarthSightings(data))
      .catch(error => console.error('Error fetching Earth sightings:', error));
  }, []);

  // Initialize the map with Google Maps API
  const initializeMap = () => {
    const mapOptions = {
      center: { lat: 0, lng: 0 }, // Initial center coordinates
      zoom: 3 // Initial zoom level
    };

    const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);

    earthSightings.forEach(sighting => {
      const marker = new window.google.maps.Marker({
        position: { lat: sighting.latitude, lng: sighting.longitude },
        map: map,
        title: sighting.location
      });
    });
  };

  useEffect(() => {
    // Load Google Maps API script dynamically
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    script.onload = initializeMap;
    document.head.appendChild(script);
  }, [earthSightings]);

  // Compile the Handlebars template
  const compiledTemplate = handlebars.compile(sightingsMapTemplate);

  // Render the compiled Handlebars template
  const renderedHtml = compiledTemplate();

  return <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />;
};

export default SightingsMap;
