const router = require('express').Router();
const fetch = require('node-fetch');
const withAuth = require('../../utils/auth');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Use environment variable

/**
 * Generate an image URL from a given prompt using OpenAI's DALL·E API.
 * 
 * @param {string} promptText - The text to generate the image from.
 * @returns {Promise<string|null>} The generated image URL or null on failure.
 */
const generateImage = async (promptText) => {
    const endpoint = "https://api.openai.com/v1/images/generations";
    const requestBody = {
        prompt: promptText,
        n: 1,
        size: "1024x1024"
    };

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`OpenAI API responded with ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (data && data.data && data.data[0] && data.data[0].url) {
            return data.data[0].url;
        } else {
            console.warn("Unexpected data structure from OpenAI API:", data);
            return null;
        }
    } catch (error) {
        console.error('Error fetching generated image URL:', error);
        return null;
    }
};

router.get('/', withAuth, async (req, res) => {
    generateImage
});

module.exports =  router;
