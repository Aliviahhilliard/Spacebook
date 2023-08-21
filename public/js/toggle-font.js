const toggleFontButtonHandler = (event) => {
    const contentType = event.target.getAttribute('data-content-type');

    // Check if it's the "Translate All" button
    if (contentType === 'all') {
        const contentElements = document.querySelectorAll('.thread-content, .comment-content');

        contentElements.forEach((element) => {
            element.classList.toggle('font-wingdings');
        });
    } else {
        const contentElements = document.querySelectorAll(`.${contentType}-content`);

        contentElements.forEach((element) => {
            element.classList.toggle('font-wingdings');
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const toggleFontButton = document.querySelector('.toggle-font-button');

    toggleFontButton.addEventListener('click', () => {
        const contentElements = document.querySelectorAll('.font-toggle');
        contentElements.forEach((element) => {
            //element.classList.toggle('font-default');
            element.classList.toggle('font-wingdings');
        });
    });
});