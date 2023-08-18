import React, { useState, useEffect, useRef } from 'react';
import handlebars from 'handlebars';
import './EditProfile.css';
import editProfileTemplate from '../handlebar-templates/editprofile.hbs';
import { generateImage } from './api/openai';

const EditProfile = () => {
    const [userProfile, setUserProfile] = useState({
        username: '',
        email: '',
        bio: '',
        profileImage: null, // Add a field for profile image
    });

    const [generatedImageUrl, setGeneratedImageUrl] = useState(null);

    const containerRef = useRef(null); // Reference to the container div

    useEffect(() => {
        fetch('/api/user/profile')
            .then(response => response.json())
            .then(data => setUserProfile(data))
            .catch(error => console.error('Error fetching user profile:', error));
    }, []);

    const handleImageGeneration = async () => {
        try {
            const url = await generateImage("a random alien");
            setGeneratedImageUrl(url);
        } catch (error) {
            console.error('Error generating profile picture:', error);
        }
    };

    const handleSaveGeneratedImage = () => {
        // Update the user profile with the new profile image (backend logic)
        fetch('/api/user/updateProfileImage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageUrl: generatedImageUrl }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setUserProfile(prevState => ({
                    ...prevState,
                    profileImage: generatedImageUrl
                }));
                setGeneratedImageUrl(null); // Clear generated image URL after saving
            }
        })
        .catch(error => console.error('Error saving profile picture:', error));
    };

    const compiledTemplate = handlebars.compile(editProfileTemplate);
    const renderedHtml = compiledTemplate({ userProfile, generatedImageUrl });

    useEffect(() => {
        // Using a ref to bind the event after the component is rendered
        if (containerRef.current) {
            const button = containerRef.current.querySelector('#save-generated-picture-button');
            if (button) {
                button.addEventListener('click', handleSaveGeneratedImage);
            }
        }
    }, [renderedHtml]);

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: renderedHtml }}>
            <button id="generate-picture-button" onClick={handleImageGeneration}>
                Generate Image
            </button>
        </div>
    );
};

export default EditProfile;

