const createThreadFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#thread-title').value.trim();
    const content = document.querySelector('#thread-content').value.trim();

    if (title && content) {
        const response = await fetch('/api/threads', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile'); // Redirect to profile after successful thread creation
        } else {
            alert('Failed to create thread. Please try again.');
        }
    }
};

document
    .querySelector('.create-thread-form')
    .addEventListener('submit', createThreadFormHandler);
