let targetWord;     // Загаданное слово
let attempts = 6;   // Оставшиеся попытки
let currentRow = 0; // Текущая строка
let gameOver = false;
let gameStartTime; // время игры
// 1. Инициализация журнала
let gameJournal = JSON.parse(localStorage.getItem('wordlyJournal')) || [];
const words = {
    4: ['СНЕГ', 'МОЗГ', 'ТОРТ', 'ГРОМ', 'НОЧЬ', 'ДЕНЬ', 'ОБЕД'],
    5: ['КОШКА', 'БАНАН', 'КНИГА', 'ИНТЕХ', 'ЗЕМЛЯ', 'БЕЛКА', 'ЛОДКА'],
    6: ['ЯБЛОКО', 'СОЛНЦЕ', 'МЕБЕЛЬ', 'КРОЛИК', 'ЛИСИЦА', 'МОЛОКО', 'ЛАВИНА']
};
function initGame() {
    const modal = document.getElementById('settingsModal');
    modal.style.display = 'flex'; // Показываем модальное окно
    document.getElementById('board').classList.remove('win-effect');
    document.querySelectorAll('.confetti').forEach(el => el.remove());
    winGif.classList.remove('visible');
}
function chclose() {
    document.getElementById('settingsModal').style.display = 'none';
}
function startNewGame() {
    const selectedLength = document.querySelector('input[name="length"]:checked').value;
    wordLength = parseInt(selectedLength);
    document.getElementById('settingsModal').style.display = 'none';

    gameStartTime = Date.now(); // Фиксируем время начала

    // Генерация игрового поля
    const board = document.getElementById('board');
    board.innerHTML = '';

    for (let i = 0; i < 6; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        row.id = `row${i}`;

        for (let j = 0; j < wordLength; j++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.dataset.position = j;
            row.appendChild(tile);
        }
        board.appendChild(row);
    }

    // Сброс состояния игры
    currentRow = 0;
    attempts = 6;
    gameOver = false;
    targetWord = words[wordLength][Math.floor(Math.random() * words[wordLength].length)];
    document.getElementById('remainingAttempts').textContent = attempts;
}

function checkGuess() {
    if (gameOver) return;

    let input = document.getElementById('guessInput');
    let guess = input.value.toUpperCase().trim();

    // 2. Проверка на пустоту
    input.value = guess.replace(/\s/g, ''); // Убираем все пробелы

    // Проверка на пустоту после обработки
    if (guess === '') {
        alert("Введите слово!");
        input.value = ''; // Очищаем поле
        return;
    }
    guess = input.value;
    // 3. Проверка на русские буквы
    if (!/^[А-ЯЁ]+$/.test(guess)) {
        alert('Используйте только русские буквы!');
        return;
    }
    // 4. Проверка длины слова
    if (guess.length !== wordLength) {
        alert(`Слово должно содержать ${wordLength} букв!`);
        return;
    }
    // Проверка на 3 одинаковые буквы подряд
    if (/([А-ЯЁ])\1{2}/.test(guess)) {
        alert('Запрещено использовать три одинаковые буквы подряд!');
        return;
    }
    // 6. Получаем текущую строку для отображения
    const row = document.getElementById(`row${currentRow}`);
    const tiles = row.querySelectorAll('.tile');

    // 7. Заполняем плитки буквами
    for (let i = 0; i < wordLength; i++) {
        tiles[i].textContent = guess[i];
    }

    // 8. Анализ букв (двухэтапная проверка)
    let remainingLetters = targetWord.split('');
    const results = [];

    // 8.1 Первый проход: точные совпадения
    for (let i = 0; i < wordLength; i++) {
        if (guess[i] === targetWord[i]) {
            tiles[i].classList.add('correct');
            remainingLetters[i] = null; // Помечаем как обработанную
            results[i] = 'correct';
        }
    }

    // 8.2 Второй проход: другие позиции
    for (let i = 0; i < wordLength; i++) {
        if (results[i]) continue; // Пропускаем уже обработанные

        const foundIndex = remainingLetters.indexOf(guess[i]);
        if (foundIndex > -1) {
            tiles[i].classList.add('present');
            remainingLetters[foundIndex] = null;
            results[i] = 'present';
        } else {
            tiles[i].classList.add('absent');
            results[i] = 'absent';
        }
    }
    // 9. Обновление состояния игры
    attempts--;
    currentRow++;
    document.getElementById('remainingAttempts').textContent = attempts;
    document.getElementById('guessInput').value = '';

    // 10. Проверка условий завершения
    if (guess === targetWord) {
        endGame(true);
    } else if (attempts === 0) {
        endGame(false);
    }

    //
    //document.getElementById('remainingAttempts').innerText = `${guess}, ${targetWord}, ${attempts}`;

}
function displayWordList() {
    const wordListContainer = document.getElementById('wordList');
    wordListContainer.innerHTML = ''; // Очистка контейнера

    // Перебираем все длины слов (4, 5, 6)
    for (const length in words) {
        // Создаем элементы для каждой группы слов
        const group = document.createElement('div');
        const title = document.createElement('h3');
        const list = document.createElement('ul');

        title.textContent = `${length}-буквенные:`;
        list.className = 'word-group';

        // Добавляем слова в список
        words[length].forEach(word => {
            const item = document.createElement('li');
            item.textContent = word;
            list.appendChild(item);
        });

        group.appendChild(title);
        group.appendChild(list);
        wordListContainer.appendChild(group);
    }
}

// Вызываем функцию при загрузке страницы
window.onload = displayWordList;

document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') checkGuess();
});

// Завершение игры
function endGame(won) {
    gameOver = true;

    const gameEndTime = Date.now();
    saveGameRecord(gameStartTime, gameEndTime, targetWord, won);

    const message = won ?
        `🎉 Поздравляем! Вы угадали слово «${targetWord}»` :
        `😞 Игра окончена. Загаданное слово: «${targetWord}»`;
    alert(message);
    if (won) {
        document.body.style.overflow = "hidden";
        // Показываем GIF
        const winGif = document.getElementById('winGif');
        winGif.classList.add('visible');

        // Добавляем анимацию к доске
        document.getElementById('board').classList.add('win-effect');

        // Дополнительный эффект с конфетти (опционально)
        createConfetti();

        // Скрываем GIF через 5 сек
        setTimeout(() => {
            winGif.classList.remove('visible');
        }, 5000);
    }

}
// Функция для создания конфетти (опционально)
function createConfetti() {
    const colors = ['#ffd700', '#ff69b4', '#7cfc00', '#00bfff'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.appendChild(confetti);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('themeToggle').addEventListener('click', function () {
        document.body.classList.toggle('dark-theme');

    });
    updateJournalUI();

});

// 5. Загрузка журнала при старте
window.onload = function () {
    displayWordList();

    updateJournalUI();
}


// 2. Функция сохранения записи
function saveGameRecord(startTime, endTime, targetWord, isWon) {
    const record = {
        start: new Date(startTime).toLocaleString(),
        end: new Date(endTime).toLocaleString(),
        word: targetWord,
        result: isWon ? 'Угадано' : 'Не угадано'
    };

    gameJournal.unshift(record); // Добавляем в начало
    localStorage.setItem('wordlyJournal', JSON.stringify(gameJournal));
    updateJournalUI();
}

// 3. Функция обновления интерфейса
function updateJournalUI() {
    const journalEl = document.getElementById('gameJournal');


    journalEl.innerHTML = ''; 


    journalEl.innerHTML = gameJournal.map((entry, index) => `
        <div class="journal-entry">
            <strong>Игра #${gameJournal.length - index}</strong> 
            <br>
            🕒 Начало: ${entry.start}<br>
            🏁 Конец: ${entry.end}<br>
            🔤 Слово: ${entry.word}<br>
            🎯 Результат: ${entry.result}
        </div>
    `).join('');
}
/*document.getElementById('clearJournal').addEventListener('click', () => {
    gameJournal = [];
    localStorage.removeItem('wordlyJournal');
    updateJournalUI();
    alert('Журнал очищен! 🗑️'); 
});*/
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('clearJournal').addEventListener('click', function () {
        gameJournal = [];
        localStorage.removeItem('wordlyJournal');
        updateJournalUI();
        alert('Журнал очищен!');
    });
});