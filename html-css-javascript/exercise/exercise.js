const result = document.querySelector('.js-button');
console.log(result.classList.contains('js-button'));

function toggleClass(button) {
    const buttonElement = document.querySelector(`.${button}`);
    if (buttonElement.classList.contains('is-toggled')) {
        buttonElement.classList.remove('is-toggled');
    } else {
        document.querySelectorAll('.gaming-music-tech-button').forEach((button) => {
            button.classList.remove('is-toggled');
        });
        buttonElement.classList.add('is-toggled');
    }
}