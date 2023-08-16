const commentFormHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('.comment-input').value.trim();
    const thread_id = event.target.querySelector('[name=thread_id]').value;

    if (content) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ content, thread_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to submit comment. Please try again.');
        }
    }
};

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
