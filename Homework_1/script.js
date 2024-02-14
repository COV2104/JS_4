const localStorageKey = "classes";

const initialData = `[
  {"id":1,"name":"Йога","time":"10:00 - 11:00","maxParticipants":15,"currentParticipants":8},
  {"id":2,"name":"Пилатес","time":"11:30 - 12:30","maxParticipants":10,"currentParticipants":5},
  {"id":3,"name":"Кроссфит","time":"13:00 - 14:00","maxParticipants":20,"currentParticipants":15},
  {"id":4,"name":"Танцы","time":"14:30 - 15:30","maxParticipants":12,"currentParticipants":10},
  {"id":5,"name":"Бокс","time":"16:00 - 17:00","maxParticipants":8,"currentParticipants":6}
]`;

if (!localStorage.getItem(localStorageKey)) {
  localStorage.setItem(localStorageKey, initialData);
}

const scheduleData = JSON.parse(localStorage.getItem(localStorageKey));

const tableBody = document.getElementById("scheduleBody");

function renderSchedule() {
  tableBody.innerHTML = "";
  scheduleData.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.time}</td>
      <td>${item.maxParticipants}</td>
      <td id="participants-${item.id}">${item.currentParticipants}</td>
      <td><button class="signUp" data-id="${item.id}" ${
      item.maxParticipants <= item.currentParticipants || item.enrolled
        ? "disabled"
        : ""
    }>Записаться на занятие</button></td>
      <td><button class="cancel" data-id="${item.id}" ${
      item.enrolled ? "" : "disabled"
    }>Отменить запись</button></td>
    `;
    tableBody.appendChild(row);
  });
}

function addEventListeners() {
  tableBody.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("signUp")) {
      const id = target.dataset.id;
      const item = scheduleData.find((el) => el.id == id);
      if (item.currentParticipants < item.maxParticipants && !item.enrolled) {
        item.enrolled = true;
        item.currentParticipants++;
        saveScheduleData();
        renderSchedule();
      }
    } else if (target.classList.contains("cancel")) {
      const id = target.dataset.id;
      const item = scheduleData.find((el) => el.id == id);
      if (item.enrolled) {
        item.enrolled = false;
        item.currentParticipants--;
        saveScheduleData();
        renderSchedule();
      }
    }
  });
}

function saveScheduleData() {
  localStorage.setItem(localStorageKey, JSON.stringify(scheduleData));
}

renderSchedule();
addEventListeners();
