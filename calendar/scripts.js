function start() {
    const hireDate = document.getElementById('hireDate').value;
    const vacationStart = document.getElementById('vacationStart').value;
    const vacationDays = document.getElementById('vacationDays').value;
    const lastAssessment = document.getElementById('lastAssessment').value;

    if (!hireDate) {
        alert('���� "���� ����� �� ������" ����������� ��� ����������');
        return;
    }
    document.getElementById('workExperience').innerText = getWorkExperience(hireDate);
    document.getElementById('vacationEnd').innerText = getVacationEnd(vacationStart, vacationDays);
    document.getElementById('nextAssessment').innerHTML = getNextAssessment(lastAssessment);
    document.getElementById('anniversary').innerText = getAnniversary(hireDate);
}
// ������� ��� ������� ����� ������
function getWorkExperience(hireDate) {
    if (!hireDate) return '�� ������';
    else {
        const startDate = new Date(hireDate);
        const today = new Date();
        let years = today.getFullYear() - startDate.getFullYear();
        let months = today.getMonth() - startDate.getMonth();
        if (months < 0 || (months === 0 && today.getDate() < startDate.getDate())) {
            years--;
            months += 12;
        }
        return `${years} ��� ${months} �������`;
    }
}

// ������� ��� ������� ���� ��������� �������
function getVacationEnd(vacationStart, vacationDays) {
    if (!vacationStart || !vacationDays) return '�� ������';
    
    const startDate = new Date(vacationStart);
    const today = new Date();
    const currentYear = today.getFullYear();

    // ���������, ��� ��� ������ ������� - ������� ���
    if (startDate.getFullYear() !== currentYear) {
        alert('������ ����� ������������ ������ ��� �������� ����');
        return '�� ������';
    }

    const days = parseInt(vacationDays);
    startDate.setDate(startDate.getDate() + days);

    return startDate.toLocaleDateString('ru-RU');
    
}

// ������� ��� ������� ���� ��������� ����������
function getNextAssessment(lastAssessment) {
    if (!lastAssessment) return '�� ������';

    const lastDate = new Date(lastAssessment);
    const assessmentDueDate = new Date(lastDate);
    assessmentDueDate.setFullYear(assessmentDueDate.getFullYear() + 2);

    const today = new Date();
    const isOverdue = today > assessmentDueDate;

    // ����������� ���� ��������� ����������
    const formattedDate = assessmentDueDate.toLocaleDateString('ru-RU');

    return isOverdue
        ? '<span class="warning">������ ������ ����������</span>'
        : formattedDate;
}

// ������� ��� ������� ���������� ������
function getAnniversary(hireDateStr) {
    if (!hireDateStr) return '�� ������';

    const hireDate = new Date(hireDateStr);
    const today = new Date();

    // ���������� ������ ��� ����� ����� ������ � �������
    let yearsWorked = today.getFullYear() - hireDate.getFullYear();

    // ���������, ��� �� ��� ���� �������� (���������) � ���� ����
    const thisYearAnniversary = new Date(hireDate);
    thisYearAnniversary.setFullYear(today.getFullYear());

    if (today < thisYearAnniversary) { // ���� ��� �� �������� ���� �������� � ���� ����, ��������� ���� �� 1
        yearsWorked--;
    }

    let nextAnniversaryYears = Math.ceil((yearsWorked + 1) / 5) * 5; // ������� ��������� ������ � ������� 5 � >= �������� ����� + 1

    // ���� ���������� ������
    const nextAnniversaryDate = new Date(hireDate);
    nextAnniversaryDate.setFullYear(hireDate.getFullYear() + nextAnniversaryYears);

    // ����������� ���� � "��.��.����"
    const day = String(nextAnniversaryDate.getDate()).padStart(2, '0');
    const month = String(nextAnniversaryDate.getMonth() + 1).padStart(2, '0');
    const year = nextAnniversaryDate.getFullYear();

    return `${day}.${month}.${year} (${nextAnniversaryYears} ���)`;
}

