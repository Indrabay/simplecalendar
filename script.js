let month = document.querySelector(".months");
let year = document.querySelector(".inputYear");
let submitInput = document.querySelector(".submitInput");
let showCalendar = document.querySelector(".showCalendar");
showCalendar.style.whiteSpace = 'pre';
var weeksPerMonth = 5;

let calendarArray = [];

const monthDict = ['jan', 'feb', 'mar', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const dayDict = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'ahad'];

function fillCalendar() {
  var monthInput = month.value;
  var yearInput = year.value;
  if (Number(yearInput) < 1970) {
    alert('Tahun terlalu tua');
    return false
  }
  var firstDay = new Date(yearInput, monthDict.indexOf(monthInput), 1).getDay();
  let first = true;
  var manyDays = new Date(yearInput, monthDict.indexOf(monthInput) + 1, 0).getDate();
  var previousMonth = new Date(yearInput, monthDict.indexOf(monthInput), 0).getDate()
  if (firstDay === 0) {
    weeksPerMonth = Math.ceil((manyDays + 6)/7);
  } else if (firstDay === 1){
    weeksPerMonth = Math.ceil(manyDays / 7);
  } else {
    weeksPerMonth = Math.ceil((manyDays + firstDay - 1) / 7);
  }
  let firstDate = 1;
  let toAddafter = 1;
  let toAdd = previousMonth - firstDay;
  if (firstDay === 0) {
    toAdd = previousMonth - 7;
  }
  for (let i = 0; i < weeksPerMonth; i++) {
    calendarArray[i] = [];
    for (let j = 0; j < dayDict.length; j++) {
      if (firstDate <= manyDays) {
        if (first === true) {
          if (firstDay === 0 && j === dayDict.length - 1) {
            calendarArray[i][dayDict.length - 1] = firstDate;
            firstDate += 1;
            j = dayDict.length;
            first = false
          } else if (j === firstDay - 1) {
            calendarArray[i][j] = firstDate;
            firstDate += 1;
            first = false;
          } else {
            calendarArray[i][j] = toAdd + 2;
            toAdd += 1;
          }
        } else {
          calendarArray[i][j] = firstDate;
          firstDate += 1;
        }
      } else {
        calendarArray[i][j] = toAddafter;
        toAddafter += 1;
      }
    }
  }
  render(weeksPerMonth);
}

function render(weeks) {
  var renderText = '';
  for (let i = 0; i < dayDict.length; i++) {
    renderText += dayDict[i].padEnd(7, ' ');
  }
  renderText += '\n\n';
  for (let i = 0; i < weeks; i++) {
    for (let j = 0; j < calendarArray[i].length; j++) {
      if (calendarArray[i][j] <= 9) {
        renderText += ` ${calendarArray[i][j]}`.padEnd(7, ' ');
      } else {
        renderText += `${calendarArray[i][j]}`.padEnd(7, ' ');
      }
    }
    renderText += '\n\n';
  }
  showCalendar.textContent = renderText;
}

submitInput.addEventListener('click', fillCalendar)