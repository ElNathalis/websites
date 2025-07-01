document.addEventListener('DOMContentLoaded', function () {
    // Инициализация истории чата
    window.chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];

    // Элементы DOM
    const userInput = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');
    const sendBtn = document.getElementById('sendBtn');
    const clearBtn = document.getElementById('clearBtn');
    const themeToggle = document.getElementById('themeToggle');

    // Загрузка истории при старте
    loadChatHistory();

    // Обработчики событий
    themeToggle.addEventListener('click', toggleTheme);
    sendBtn.addEventListener('click', sendMessage);
    clearBtn.addEventListener('click', clearChat);
    userInput.addEventListener('keypress', handleEnter);

    // Основные функции
    function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        addMessage(message, 'user');
        userInput.value = '';

        setTimeout(() => {
            const botResponse = getBotResponse(message);
            addMessage(botResponse, 'bot');
        }, 1000);
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        //messageDiv.textContent = text;
        messageDiv.innerHTML = text;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

        // Обновляем глобальную переменную и localStorage
        window.chatHistory.push({ text, sender });
        localStorage.setItem('chatHistory', JSON.stringify(window.chatHistory));
        console.log('Текущая история:', window.chatHistory); // Логирование
    }

    function getBotResponse(input) {
        const lowerInput = input
            .toLowerCase()
            .replace(/[.,!?]/g, '') // Удаляем знаки препинания
            .trim();

        // Команды с ключевыми словами и ответами
        const commands = [
            {
                keywords: ['привет', 'здравствуй', 'добрый'],
                answers: ['Привет!', 'Здравствуйте!', 'Доброго времени суток!']
            },
            {
                keywords: ['зовут'],
                answers: ['Меня зовут Бот.', 'Я виртуальный помощник.', 'Игнат']
            },
            {
                keywords: ['умеешь', 'можешь'],
                answers: ['Отвечать на вопросы.', 'Помогать вам.', 'Веселить ответами :)']
            },
            {
                keywords: ['время', 'времени'],
                answers: [`Сейчас ${new Date().toLocaleTimeString()}.`, 'Не поздно и не рано, а самое время.']
            },
            {
                keywords: ['погод'], // Реагирует на "погоду", "погода", "покажи погоду"
                answers: ['Извините, погодный сервис недоступен.', 'Проверьте погоду в вашем приложении.', 'В Тюмени всегда холодно...',
        'Попробуй найти на сайте: <a href="https://www.gismeteo.ru/weather-tyumen-4501/" target="_blank">Gismeteo</a>']
            },
            {
                keywords: ['пока', 'прощай'],
                answers: ['До свидания!', 'Удачи!', 'До скорой встречи!']
            }
        ];

        // Проверяем каждую команду
        for (const command of commands) {
            const hasKeyword = command.keywords.some(keyword =>
                lowerInput.includes(keyword)
            );
            if (hasKeyword) {
                return command.answers[Math.floor(Math.random() * command.answers.length)];
            }
        }

        return "Извините, я не понимаю.";
    }

    function loadChatHistory() {
        chatHistory.forEach(msg => addMessage(msg.text, msg.sender));
    }

    function clearChat() {
        chatBox.innerHTML = '';
        chatHistory = [];
        localStorage.removeItem('chatHistory');
    }

    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
    }

    function handleEnter(e) {
        if (e.key === 'Enter') sendMessage();
    }
});