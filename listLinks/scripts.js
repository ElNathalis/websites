document.addEventListener('DOMContentLoaded', function () {
    const STORAGE_KEY = 'usefulLinks';
    let links = [];
    let editingId = null; // Только для отслеживания редактируемой ссылки

    // DOM элементы
    const titleInput = document.getElementById('title-input');
    const urlInput = document.getElementById('url-input');
    const descInput = document.getElementById('desc-input');
    const saveBtn = document.getElementById('add-btn'); // Кнопка "Сохранить"
    const linksContainer = document.getElementById('links-container');
    const clearAllBtn = document.getElementById('clear-all-btn');
    const linksCounter = document.getElementById('links-counter');

    // Инициализация

    loadLinks();
    setupEventListeners();
    renderLinks(); // Добавлен вызов отрисовки после загрузки
    function loadLinks() {
        links = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        updateCounter();
    }

    function setupEventListeners() {
        saveBtn.addEventListener('click', saveLink);
        clearAllBtn.addEventListener('click', clearAllLinks);
    }

    function saveLink() {
        const linkData = {
            title: titleInput.value.trim(),
            url: urlInput.value.trim(),
            description: descInput.value.trim()
        };

        if (!validateLink(linkData)) return;

        if (editingId) {
            // Обновляем существующую ссылку
            const index = links.findIndex(link => link.id === editingId);
            links[index] = { ...links[index], ...linkData };
        } else {
            // Добавляем новую ссылку
            links.push({ id: Date.now(), ...linkData });
        }

        finishEditing();
    }

    function validateLink({ title, url, description }) {
        if (!title || !url || !description) {
            alert('Заполните все поля');
            return false;
        }

        try {
            const domain = new URL(url).hostname.toLowerCase();
            if (domain.includes('tiktok') || domain.includes('instagram')) {
                alert('Эти платформы запрещены');
                return false;
            }
        } catch {
            alert('Некорректный URL');
            return false;
        }

        return true;
    }

    function finishEditing() {
        saveLinks();
        clearForm();
        editingId = null;
        renderLinks();
    }

    function clearForm() {
        titleInput.value = '';
        urlInput.value = '';
        descInput.value = '';
    }

    function renderLinks() {
        linksContainer.innerHTML = links.length ? '' : '<p>Список пуст</p>';

        links.forEach(link => {
            const linkElement = document.createElement('div');
            linkElement.className = 'link-item';
            linkElement.innerHTML = `
                <div class="link-header">
                    <a href="${link.url}" target="_blank">${link.title}</a>
                    <div class="link-actions">
                        <button class="edit-btn" data-id="${link.id}">Изменить</button>
                        <button class="delete-btn" data-id="${link.id}">Удалить</button>
                    </div>
                </div>
                <div class="link-url">${link.url}</div>
                <div class="link-desc">${link.description}</div>
            `;
            linksContainer.appendChild(linkElement);
        });

        // Назначаем обработчики после рендера
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', editLink);
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', deleteLink);
        });

        updateCounter();
    }

    function editLink(e) {
        const id = parseInt(e.target.dataset.id);
        const link = links.find(item => item.id === id);

        if (link) {
            titleInput.value = link.title;
            urlInput.value = link.url;
            descInput.value = link.description;
            editingId = id; // Запоминаем ID для сохранения
        }
    }

    function deleteLink(e) {
        if (!confirm('Удалить ссылку?')) return;

        const id = parseInt(e.target.dataset.id);
        links = links.filter(link => link.id !== id);

        if (editingId === id) {
            clearForm();
            editingId = null;
        }

        finishEditing();
    }

    function clearAllLinks() {
        if (!links.length || !confirm('Очистить весь список?')) return;

        links = [];
        editingId = null;
        finishEditing();
    }

    function saveLinks() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
    }

    function updateCounter() {
        linksCounter.textContent = `${links.length} ссылок`;
    }
});