const months = [
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
  "Nov.",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');
//months are zero-index based. time-zone will be one you're in
//year,month(-1 for zero-index, date(not day), hour (0-24), minutes,
// seconds, mili-seconds.)
let futureDate = new Date("November 30, 2020 00:01:00");
// alt way (2020,10,30,3,00,00);
//for current date use Date();

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
//grabs month string from month array above
month = months[month];
const date = futureDate.getDate();
//grabs day string from weekday array above
const weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `the big event is ${weekday}, ${month} ${date}, ${year}`;
// futre time in mili-seconds
const futureTime = futureDate.getTime();

function getRemainingTime () {
  const today = new Date().getTime();
  const t = futureTime - today;
  //returns difference between futureDate and today, in miliseconds.
  // 1s = 1000ms
  // 1 m = 60s
  // 1hr = 60min
  // 1d = 24hr
  // get values in ms
  const oneDay = 24*60*60*1000;
  const oneHour = 60*60*1000;
  const oneMinute = 60*1000;
  //calculate all values
  let days = t/oneDay
  //rounds days down since minutes and seconds will be calculated seperately
  days = Math.floor(days)
  let hours = Math.floor((t % oneDay)/oneHour);
  let minutes = Math.floor((t % oneHour)/ oneMinute)
  let seconds = Math.floor((t % oneMinute)/ 1000)
  // set values array:
  const values = [days,hours,minutes,seconds];
//adds 0 in front when value less than ten.
  function format (item) {
    if(item < 10){
      return item = `0${item}`
    }
      return item
  }

  items.forEach(function(item,index) {
    item.innerHTML = format(values[index])
  });
    if(t<0) {
      clearInterval(countdown);
      deadline.innerHTML= `<h4 class="expired">The countdown is done!</h4>`
    }
}
//countdown
let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();
