function fclose() {
    document.getElementById('custom').style.display = 'none';
    document.getElementById('text').style.width = '100%';
}
function rightz() {
    document.getElementById('h1').style.textAlign = 'right';
}
function centerz() {
    document.getElementById('h1').style.textAlign = 'center';
}
function leftz() {
    document.getElementById('h1').style.textAlign = 'left';
}
function fsize2() {
    document.getElementById('text').style.fontSize = document.getElementById('fontsize2').value;
}
function right() {
    document.getElementById('text').style.textAlign = 'right';
}
function center() {
    document.getElementById('text').style.textAlign = 'center';
}
function left() {
    document.getElementById('text').style.textAlign = 'left';
}
function fsize() {
    document.getElementById('h1').style.fontSize = document.getElementById('fontsize').value;
}
function green() {
    document.getElementById('text').style.color = 'darkolivegreen';
}
function blue() {
    document.getElementById('text').style.color = 'lightsteelblue';
}
function pink() {
    document.getElementById('text').style.color = 'lightpink';
}
function changeheight() {
    const h = parseFloat(document.getElementById('vi').value);
    if ((h % 1 != 0) || (h <= 0) || (isNaN(h))) {
        alert("������! ������� ����� ������������� �����");
        return;
    }
    s = String(h) + 'px';
    document.getElementById('picture').style.height = s;


}
function changetext() {   
    const textInput = document.getElementById('textInput');
    const textDiv = document.getElementById('inlinetext');
    const formContainer = document.getElementById('formContainer');

    formContainer.style.display = 'block';
    // ������������� ������������ �� ���� �����
    textInput.focus();
    // ���������� ������� ��� ���� �����
    textInput.addEventListener('keydown', function (event) {
        // ���������, ��� ������ ������ ������� Enter
        if (event.key === 'Enter') {
            // �������� �� ������ ������
            if (inputText !== '') {
                // ��������� ���������� ����� � �������
                textDiv.textContent = document.getElementById('textInput').value;
                formContainer.style.display = 'none';
                // ������� ���� �����
                textInput.value = '';
            }
        }
    });
}
function chclose() {
    document.getElementById('formContainer').style.display = 'none';
}
function displayImage(imageSrc) {
    const pict = document.getElementById("pict")
    while (pict.firstChild) {
        pict.removeChild(pict.firstChild);
    }

    // ������� ����� �����������
    const img = document.createElement("img");
    img.src = imageSrc;
    img.style.width = "200px";
    img.style.margin = "10px";
    img.id = "picture";
    // ��������� ����������� � ���������
    document.getElementById('pict').appendChild(img);
}