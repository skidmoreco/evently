const loginBtn = document.getElementById("login");
const formlog = document.querySelector(".login-form");

loginBtn.addEventListener("click", logform);


function logform () {
    formlog.removeAttribute("class", "d-none");

    // formlog.classList.remove("d-none");
    console.log("hit")
    

};

// init()

// Determine if Febuary is a leap year
const isLeapYear = (year) => {
    return (
        (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
        (year % 100 === 0 && year % 400 === 0)
    );
}
const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
}
// Define the month in an array
var calendar = document.querySelector('.calendar')
const month_names = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
// Pick the month
var month_picker = document.querySelector('#month-picker');
const dayTextFormate = document.querySelector('.day-text-formate');


month_picker.onclick = () => {
   month_list.classList.remove('hideonce');
   month_list.classList.remove('hide');
   month_list.classList.add('show');
}

const generateCalendar = (month, year) => {
     calendar_days = document.querySelector('.calendar-days');
    calendar_days.innerHTML = '';
    var calendar_header_year = document.querySelector('#year');
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
        31
    ];

    // Pick the month to change to
    month_picker.innerHTML = month_names[month];
    calendar_header_year.innerHTML = year;
    var first_day = new Date(year, month);

    for (let i=0; i<=days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div');
        if (i >= first_day.getDay()) {
            day.innerHTML = i - first_day.getDay() + 1;
            if (i - first_day.getDay() + 1 === currentDate.getDate() && year ===
                currentDate.getFullYear() && month === currentDate.getMonth()) {
                day.classList.add('current-date');
            }
        }
        calendar_days.appendChild(day);
    }
}

// Display the months to choose
 var month_list = calendar.querySelector('.month-list');
 month_names.forEach((e, index) => {
     var month = document.createElement('div');
     month.innerHTML = `<div>${e}</div>`;
     month_list.append(month);
     month.onclick = () => {
         currentMonth.value = index;
         generateCalendar(currentMonth.value, currentYear.value);
         month_list.classList.replace('show', 'hide');
    };
 });
 // Display the new chosen month
  let currentDate = new Date();
  let currentMonth = { value : currentDate.getMonth()};
let currentYear = { value: currentDate.getFullYear() };
  

  

     

    month_list.classList.add('hideonce');


 document.querySelector('#pre-year').onclick = () => {
     --currentYear.value;
     
     generateCalendar(currentMonth.value, currentYear.value);
 };
 document.querySelector('#next-year').onclick = () => {
     ++currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
 };




