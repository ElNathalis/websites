function start() {
    const hireDate = document.getElementById('hireDate').value;
    const vacationStart = document.getElementById('vacationStart').value;
    const vacationDays = document.getElementById('vacationDays').value;
    const lastAssessment = document.getElementById('lastAssessment').value;

    if (!hireDate) {
        alert('Поле "Дата приёма на работу" обязательно для заполнения');
        return;
    }
    document.getElementById('workExperience').innerText = getWorkExperience(hireDate);
    document.getElementById('vacationEnd').innerText = getVacationEnd(vacationStart, vacationDays);
    document.getElementById('nextAssessment').innerHTML = getNextAssessment(lastAssessment);
    document.getElementById('anniversary').innerText = getAnniversary(hireDate);
}
// Функция для расчета стажа работы
function getWorkExperience(hireDate) {
    if (!hireDate) return 'не задано';
    else {
        const startDate = new Date(hireDate);
        const today = new Date();
        let years = today.getFullYear() - startDate.getFullYear();
        let months = today.getMonth() - startDate.getMonth();
        if (months < 0 || (months === 0 && today.getDate() < startDate.getDate())) {
            years--;
            months += 12;
        }
        return `${years} лет ${months} месяцев`;
    }
}

// Функция для расчета даты окончания отпуска
function getVacationEnd(vacationStart, vacationDays) {
    if (!vacationStart || !vacationDays) return 'не задано';
    
    const startDate = new Date(vacationStart);
    const today = new Date();
    const currentYear = today.getFullYear();

    // Проверяем, что год начала отпуска - текущий год
    if (startDate.getFullYear() !== currentYear) {
        alert('Отпуск можно рассчитывать только для текущего года');
        return 'не задано';
    }

    const days = parseInt(vacationDays);
    startDate.setDate(startDate.getDate() + days);

    return startDate.toLocaleDateString('ru-RU');
    
}

// Функция для расчета даты следующей аттестации
function getNextAssessment(lastAssessment) {
    if (!lastAssessment) return 'не задано';

    const lastDate = new Date(lastAssessment);
    const assessmentDueDate = new Date(lastDate);
    assessmentDueDate.setFullYear(assessmentDueDate.getFullYear() + 2);

    const today = new Date();
    const isOverdue = today > assessmentDueDate;

    // Форматируем дату следующей аттестации
    const formattedDate = assessmentDueDate.toLocaleDateString('ru-RU');

    return isOverdue
        ? '<span class="warning">Срочно пройти аттестацию</span>'
        : formattedDate;
}

// Функция для расчета ближайшего юбилея
function getAnniversary(hireDateStr) {
    if (!hireDateStr) return 'не задано';

    const hireDate = new Date(hireDateStr);
    const today = new Date();

    // Количество полных лет между датой приема и сегодня
    let yearsWorked = today.getFullYear() - hireDate.getFullYear();

    // Проверяем, был ли уже день рождения (годовщина) в этом году
    const thisYearAnniversary = new Date(hireDate);
    thisYearAnniversary.setFullYear(today.getFullYear());

    if (today < thisYearAnniversary) { // Если ещё не наступил день рождения в этом году, уменьшаем стаж на 1
        yearsWorked--;
    }

    let nextAnniversaryYears = Math.ceil((yearsWorked + 1) / 5) * 5; // Находим следующий юбилей — кратный 5 и >= текущего стажа + 1

    // Дата следующего юбилея
    const nextAnniversaryDate = new Date(hireDate);
    nextAnniversaryDate.setFullYear(hireDate.getFullYear() + nextAnniversaryYears);

    // Форматируем дату в "дд.мм.гггг"
    const day = String(nextAnniversaryDate.getDate()).padStart(2, '0');
    const month = String(nextAnniversaryDate.getMonth() + 1).padStart(2, '0');
    const year = nextAnniversaryDate.getFullYear();

    return `${day}.${month}.${year} (${nextAnniversaryYears} лет)`;
}

