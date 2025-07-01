document.addEventListener('DOMContentLoaded', function () {
    const STORAGE_KEY = 'usefulLinks';
    let links = [];
    let editingId = null; // ������ ��� ������������ ������������� ������

    // DOM ��������
    const titleInput = document.getElementById('title-input');
    const urlInput = document.getElementById('url-input');
    const descInput = document.getElementById('desc-input');
    const saveBtn = document.getElementById('add-btn'); // ������ "���������"
    const linksContainer = document.getElementById('links-container');
    const clearAllBtn = document.getElementById('clear-all-btn');
    const linksCounter = document.getElementById('links-counter');

    // �������������

    loadLinks();
    setupEventListeners();
    renderLinks(); // �������� ����� ��������� ����� ��������
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
            // ��������� ������������ ������
            const index = links.findIndex(link => link.id === editingId);
            links[index] = { ...links[index], ...linkData };
        } else {
            // ��������� ����� ������
            links.push({ id: Date.now(), ...linkData });
        }

        finishEditing();
    }

    function validateLink({ title, url, description }) {
        if (!title || !url || !description) {
            alert('��������� ��� ����');
            return false;
        }

        try {
            const domain = new URL(url).hostname.toLowerCase();
            if (domain.includes('tiktok') || domain.includes('instagram')) {
                alert('��� ��������� ���������');
                return false;
            }
        } catch {
            alert('������������ URL');
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
        linksContainer.innerHTML = links.length ? '' : '<p>������ ����</p>';

        links.forEach(link => {
            const linkElement = document.createElement('div');
            linkElement.className = 'link-item';
            linkElement.innerHTML = `
                <div class="link-header">
                    <a href="${link.url}" target="_blank">${link.title}</a>
                    <div class="link-actions">
                        <button class="edit-btn" data-id="${link.id}">��������</button>
                        <button class="delete-btn" data-id="${link.id}">�������</button>
                    </div>
                </div>
                <div class="link-url">${link.url}</div>
                <div class="link-desc">${link.description}</div>
            `;
            linksContainer.appendChild(linkElement);
        });

        // ��������� ����������� ����� �������
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
            editingId = id; // ���������� ID ��� ����������
        }
    }

    function deleteLink(e) {
        if (!confirm('������� ������?')) return;

        const id = parseInt(e.target.dataset.id);
        links = links.filter(link => link.id !== id);

        if (editingId === id) {
            clearForm();
            editingId = null;
        }

        finishEditing();
    }

    function clearAllLinks() {
        if (!links.length || !confirm('�������� ���� ������?')) return;

        links = [];
        editingId = null;
        finishEditing();
    }

    function saveLinks() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
    }

    function updateCounter() {
        linksCounter.textContent = `${links.length} ������`;
    }
});