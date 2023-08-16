const addFriendHandler = async (event) => {
    if (event.target.classList.contains('add-friend-button')) {
        const userId = event.target.getAttribute('data-user-id');
        try {
            const response = await fetch(`/api/friends/${userId}`, {
                method: 'POST',
            });

            if (response.ok) {
                // Handle successful friend addition, e.g., update UI
                event.target.textContent = 'Friend Added';
                event.target.disabled = true;
            } else {
                // Handle error
                alert('Failed to add friend. Please try again.');
            }
        } catch (error) {
            // Handle error
            console.error('Error adding friend:', error);
            alert('An error occurred while adding the friend.');
        }
    }
};

document.addEventListener('click', addFriendHandler);