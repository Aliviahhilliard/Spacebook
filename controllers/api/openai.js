const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Use environment variable

export const generateImage = async (promptText) => {
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

        const data = await response.json();

        if (data && data.data && data.data[0] && data.data[0].url) {
            return data.data[0].url;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching generated image URL:', error);
        return null;
    }
};
