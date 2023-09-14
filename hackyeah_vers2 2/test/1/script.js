const select = document.querySelector('#options');
const textInput = document.querySelector('#otherInput');
const textField = document.querySelector('#textInput');

select.addEventListener('input', () => {
    if (select.value === 'inne') {
        textInput.classList.remove('hidden');
        textField.removeAttribute('disabled');
    } else {
        textInput.classList.add('hidden');
        textField.setAttribute('disabled', 'true');
    }
});
