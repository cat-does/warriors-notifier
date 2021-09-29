const readFile = require("fs").readFile;

const monthMapping = {
  "January": 0,
  "February": 1,
  "March": 2,
  "April": 3,
  "May": 4,
  "June": 5,
  "July": 6,
  "August": 7,
  "September": 8,
  "October": 9,
  "November": 10,
  "December": 11,
}

readFile('schedule.txt', { encoding: "utf8" }, (err, data) => {
  if (err) throw err;

  // an array of date strings
  let dates = data.split("\n").map(dateString => {
    const month = dateString.split(" ")[1];
    const day = dateString.split(" ")[2];
    const monthIndex = monthMapping[month];
    const year = (monthIndex < 9) ? 2022 : 2021

    return new Date(year, monthIndex, parseInt(day)).toDateString();
  })

  // create an array of today - today+7
  const today = new Date();
  const ourDates = [];
  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(today.valueOf());
    nextDate.setDate(nextDate.getDate() + i);
    ourDates.push(nextDate);
  }

  // leds
  for (let i = 0; i < ourDates.length; i++) {
    if (dates.indexOf(ourDates[i].toDateString()) !== -1) {
      console.log('y');
    } else {
      console.log('n');
    }
  }
});

