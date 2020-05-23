export const is_date = function (input) {
  if (Object.prototype.toString.call(input) === "[object Date]" && input != 'Invalid Date')
    return true;
  return false;
};

export const getTimeDisplay = function (date, curDate = new Date()) {
  date = new Date(date); // Make sure we have a date object

  if (!is_date(date)) return 'Invalid Date';

  let resultDate, daysDiff = daysBetween(date, curDate);

  if (daysDiff === 0) {
    resultDate = date.toLocaleTimeString();
  }
  else if (daysDiff === 1) {
    resultDate = 'Yesterday';
  }
  else if (1 < daysDiff && daysDiff < 7) {
    resultDate = dayOfWeekAsString(date.getDay());
  }
  else {
    resultDate = date.toLocaleDateString()
  }
  return resultDate;
}

// export const getWeekFromDate = function (date) {
//   let now = new Date();
//   let onejan = new Date(now.getFullYear(), 0, 1);
//   return Math.ceil((((date - onejan) / 86400000) + onejan.getDay() + 1) / 7);
// }

/**
* Returns day name from number[0-6], with Sunday as 0
*
* @param {Number} dayIndex
* @return {String} Returns day as string
*/
export function dayOfWeekAsString(dayIndex) {
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayIndex];
}

export const sortMessagesByTime = function (messages) {
  return messages.sort(
    (a, b) => {
      const a1 = new Date(a.time), b1 = new Date(b.time);//Sort this out, serious performance hit here
      return b1.getTime() - a1.getTime();
    }
  );
}

export const sortChatByLastMessage = function (chats) {
  return chats.sort(
    (a, b) => {
      if (!a.messages.length || !b.messages.length) {
        return 1;
      }
      const a1 = new Date(a.messages[a.messages.length - 1].time).getTime(),
        b1 = new Date(b.messages[b.messages.length - 1].time).getTime();
      return b1 - a1;
    }
  );
}

export const daysBetween = (date1, date2) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  return Math.round(Math.abs((date1 - date2) / oneDay));
}