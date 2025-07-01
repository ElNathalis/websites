function checkForm() {
    const pswrd = document.getElementById("password").value;
    
    const btn = document.getElementById("btn");

    btn.disabled = !pswrd;
       
}
function check() {
    const pswrd = document.getElementById("password").value;
    var points = document.getElementById("points");
    points.innerHTML = '';
    i = 0;
    digits(pswrd);
    UpLowcase(pswrd);
    len(pswrd);
    specials(pswrd);
    raspr(pswrd);
    ci(pswrd);
    
    points.style.display = 'block';
    var result = document.getElementById("result");
    result.innerHTML = '';
    showresult();
    result.style.display = 'block';
}

function digits(pswrd) {
    const p = document.createElement('p');
    if (/\d/.test(pswrd)) {
        i += 1;
        p.innerHTML = '<img src="galka.jpg" />  �������� �����';
    }
    else {
        p.innerHTML = '<img src="krestik.jpg" />  ��� ����';
    }
    points.appendChild(p);
}
function len(pswrd) {
    const p = document.createElement('p');
    if (pswrd.length >= 8) {
        i += 1;
        p.innerHTML = '<img src="galka.jpg" />  �������� �� ����� 8 ��������';
    }
    else {
        p.innerHTML = '<img src="krestik.jpg" />  �������� ����� 8 ��������';
    }
    points.appendChild(p);
}
function UpLowcase(pswrd) {
    const p = document.createElement('p');
    const hasLower = /[a-z�-�]/.test(pswrd);
    const hasUpper = /[A-Z�-�]/.test(pswrd);
    const hasBothCases = hasLower && hasUpper;
    if (hasBothCases) {
        p.innerHTML = '<img src="galka.jpg" />  �������� �������� � ��������� �����';
        i += 1;
    }
    else {
        p.innerHTML = '<img src="krestik.jpg" />  �� �������� ����� ����� ���������';
    }
    points.appendChild(p);
}
function specials(pswrd) {
    const p = document.createElement('p');
    if (/[!@#$%^&*]/.test(pswrd)) {
        p.innerHTML = '<img src="galka.jpg" />  ���� �����������';
        i += 1;
    }
    else {
        p.innerHTML = '<img src="krestik.jpg" />  ��� ������������';
    }
    points.appendChild(p);
}
function raspr(pswrd) {
    const commonWords = ["password", "123456", "qwerty", "������"];
    const p = document.createElement('p');
    const lowerPass = pswrd.toLowerCase();
    let foundWord = [];

    for (const word of commonWords) {
        if (lowerPass.includes(word)) {
            foundWord.push(word);
        }
    }

    if (foundWord.length > 0) {
        p.innerHTML = `<img src="krestik.jpg" />  ���� ���������������� �����: ${foundWord.join(', ') }`;
    } else {
        p.innerHTML = '<img src="galka.jpg" />  ��� ���������������� ����';
        i += 1;
    }

    points.appendChild(p);
}
function showresult() {
    const p = document.createElement('p');
    const pwtyle = document.getElementById("password");
    
    if (i >= 4) {
        p.innerHTML = '������ �������';
        pwtyle.style.borderColor = 'lightgreen';
        
    }
    else if (i == 3) {
        p.innerHTML = '������ ������';
        pwtyle.style.borderColor = 'yellow';
    }
    else {
        p.innerHTML = '������ ������������';
        pwtyle.style.borderColor = 'red';
    }
    
    result.appendChild(p);
}
function ci(pswrd) {
    const p = document.createElement('p');
    const hasCi = /[�-��-�]/.test(pswrd);
    if (!hasCi) {
        p.innerHTML = '<img src="galka.jpg" />  �� �������� ���������';
        i += 1;
    }
    else {
        p.innerHTML = '<img src="krestik.jpg" />  �������� ���������';
    }
    points.appendChild(p);
}