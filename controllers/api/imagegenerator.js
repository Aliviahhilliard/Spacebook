import { generateImage } from './api/openai';

document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-picture-button');
    const generatedImageContainer = document.getElementById('generated-image-container');

    generateButton.addEventListener('click', async () => {
        try {
            const generatedImageUrl = await generateImage("a random alien");
            
            if (generatedImageUrl) {
                generatedImageContainer.innerHTML = `<img src="${generatedImageUrl}" alt="Generated Profile" />`;
            } else {
                console.log("Image URL is not available.");
            }
        } catch (error) {
            console.error('Error generating profile picture:', error);
        }
    });
});
