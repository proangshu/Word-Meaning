const apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const searchBtn = document.getElementById('searchBtn');
const wordInput = document.getElementById('wordInput');
const resultDiv = document.getElementById('result');
const wordElement = document.getElementById('word');
const definitionElement = document.getElementById('definition');
const errorMessage = document.getElementById('errorMessage');

searchBtn.addEventListener('click', () => {
    const word = wordInput.value.trim();
    if (word === '') {
        showError('Please enter a word.');
        return;
    }

    fetch(apiUrl + word)
        .then(response => response.json())
        .then(data => {
            if (data.title === 'No Definitions Found') {
                showError('No definition found. Please try another word.');
                return;
            }
            showResult(data[0]);
        })
        .catch(() => {
            showError('An error occurred. Please try again later.');
        });
});

function showResult(data) {
    errorMessage.classList.add('hidden');
    resultDiv.classList.remove('hidden');
    wordElement.textContent = data.word;
    definitionElement.textContent = data.meanings[0].definitions[0].definition;
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    resultDiv.classList.add('hidden');
}
