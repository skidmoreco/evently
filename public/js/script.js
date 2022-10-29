// const loginBtn = document.getElementById("login");
// const formlog = document.querySelector(".login-form");

// // loginBtn.addEventListener("click", logform);

// ^^^^^^^ put all login code into login.js

function logform() {
  // formlog.removeAttribute("class", "d-none");

  formlog.classList.remove("d-none");
  console.log("hit");
}

// Determine if Febuary is a leap year
const isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};
const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};
// Define the month in an array
var calendar = document.querySelector(".calendar");
const month_names = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
// Pick the month
var month_txt;
var month_picker = document.querySelector("#month-picker");
const dayTextFormate = document.querySelector(".day-text-formate");

month_picker.onclick = () => {
  month_list.classList.remove("hideonce");
  month_list.classList.remove("hide");
  month_list.classList.add("show");
};

// pass the date variable to the event page
// var event = "Blank Event"
// const generateEventPage = (event) => {
//     window.open("eventpage.html?event=" + event, "mywindow",
//         "menubar=1, width = 300, height = 200");

//     console.log(event);
// }

// const getEvents = () => {
//     fetch('api/events/:date', async (req, res) => {
//         const events = await fetch('/api/users/e', {
//             method: 'POST',
//             body: JSON.stringify({ email, password }),
//             headers: { 'Content-Type': 'application/json' },
//         });
// });
// }

const generateCalendar = (month, year) => {
  calendar_days = document.querySelector(".calendar-days");
  calendar_days.innerHTML = "";
  var calendar_header_year = document.querySelector("#year");
  var days_of_month = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  // Pick the month to change to
  // month_txt.innerHTML = month_names[month];
  month_picker.innerHTML = month_names[month];
  calendar_header_year.innerHTML = year;
  var first_day = new Date(year, month);
  var event;

  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
    let fullDay = document.createElement("div");
    let day = document.createElement("a");
    if (i >= first_day.getDay()) {
      day.innerHTML = i - first_day.getDay() + 1;
      let date = `${month + 1}-${i - first_day.getDay() + 1}-${year}`;
      // test
      day.href = `api/events/${date}`;
      // test
      // day.onclick = () => {
      //     event = day.id;
      //     document.getElementById(event).value = event;
      // generateEventPage(event);
      // getEvents()
      // }
      if (
        i - first_day.getDay() + 1 === currentDate.getDate() &&
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth()
      ) {
        day.classList.add("current-date");
      }
      fullDay.append(day);
    }
    calendar_days.appendChild(day);
  }
};

// Display the months to choose
var month_list = calendar.querySelector(".month-list");
month_names.forEach((e, index) => {
  var month = document.createElement("div");
  month.innerHTML = `<div>${e}</div>`;
  month_list.append(month);
  month.onclick = () => {
    currentMonth.value = index;
    generateCalendar(currentMonth.value, currentYear.value);
    month_list.classList.replace("show", "hide");
  };
});
// Display the new chosen month
let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };

month_list.classList.add("hideonce");

// Move to the previous year
document.querySelector("#pre-year").onclick = () => {
  --currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};

// Move to the next year
document.querySelector("#next-year").onclick = () => {
  ++currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};

// Load the calendar witht he current month and year
const y = new Date().getFullYear();
const m = new Date().getMonth();

generateCalendar(m, y);
