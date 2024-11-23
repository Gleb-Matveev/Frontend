window.onload = function() {
    const savedData = JSON.parse(localStorage.getItem('scheduleData'));
    if (savedData) {
        document.getElementById('days').value = savedData.days;
        document.getElementById('lessons').value = savedData.lessons;
        document.getElementById('language').value = savedData.language;
    }
};

document.getElementById('scheduleForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const days = document.getElementById('days').value;
    const lessons = document.getElementById('lessons').value;
    const language = document.getElementById('language').value;

    const formData = {
        days: days,
        lessons: lessons,
        language: language
    };
    localStorage.setItem('scheduleData', JSON.stringify(formData));

    generateTable(days, lessons, language);
});

function generateTable(days, lessons, language) {
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = '';

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headerRow = document.createElement('tr');
    for (let i = 1; i <= days; i++) {
        const th = document.createElement('th');
        th.textContent = `${language === 'ru' ? 'День' : 'Day'} ${i}`;
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);

    for (let i = 1; i <= lessons; i++) {
        const row = document.createElement('tr');
        for (let j = 1; j <= days; j++) {
            const td = document.createElement('td');
            td.textContent = `${language === 'ru' ? 'Занятие' : 'Lesson'} ${i}`;
            row.appendChild(td);
        }
        tbody.appendChild(row);
    }

    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainer.appendChild(table);
}
