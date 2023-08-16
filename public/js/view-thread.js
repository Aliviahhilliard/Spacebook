const deleteCommentHandler = async (event) => {
    if (event.target.classList.contains('delete-comment-button')) {
        const commentId = event.target.getAttribute('data-comment-id');
        try {
            const response = await fetch(`/api/comments/${commentId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Reload the page or update the comment list after successful deletion
                location.reload();
            } else {
                // Handle error
                alert('Failed to delete comment. Please try again.');
            }
        } catch (error) {
            // Handle error
            console.error('Error deleting comment:', error);
            alert('An error occurred while deleting the comment.');
        }
    }
};

document.addEventListener('click', deleteCommentHandler);
