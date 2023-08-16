const toggleFontButtonHandler = (event) => {
    const contentType = event.target.getAttribute('data-content-type');
    const contentElements = document.querySelectorAll(`.${contentType}-content`);

    contentElements.forEach((element) => {
        element.classList.toggle('wingdings-font');
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const toggleFontButtons = document.querySelectorAll('.toggle-font-button');
    toggleFontButtons.forEach((button) => {
        button.addEventListener('click', toggleFontButtonHandler);
    });
});