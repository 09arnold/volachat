export const is_date = function (input) {
  if (Object.prototype.toString.call(input) === "[object Date]" && input != 'Invalid Date')
    return true;
  return false;
};

export const getTimeDisplay = function (date) {
  if (typeof (date) === "string") {
    date = new Date(date);
  }
  if (!is_date(date)) {
    return '';
  }
  const curDate = new Date();

  // if the date is today, return the time
  if (curDate.toLocaleDateString() === date.toLocaleDateString()) {
    return date.toLocaleTimeString();
  }

  // if the date is yesterday, return 'yesterday'
  if (curDate.getMonth() === date.getMonth() && curDate.getFullYear() === date.getFullYear()) {
    // eslint-disable-next-line
    if (curDate.getDay() === 0 && date.getDay() === 6 ||
      curDate.getDay() - 1 === date.getDay()) {
      return 'yesterday';
    }
  }

  // if the date is within the last 7 days, return the day string
  if ((curDate.getTime() - date.getTime()) / dayMillis < 7) {
    return dayOfWeekAsString(date.getDay());
  }

  // return the date
  return date.toLocaleDateString();
}

export const getWeekFromDate = function (date) {
  let now = new Date();
  let onejan = new Date(now.getFullYear(), 0, 1);
  return Math.ceil((((date - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

/**
* Converts a day number to a string.
*
* @param {Number} dayIndex
* @return {String} Returns day as string
*/
function dayOfWeekAsString(dayIndex) {
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
      const a1 = new Date(a.messages[a.messages.length - 1].time).getTime(),
        b1 = new Date(b.messages[b.messages.length - 1].time).getTime();
      return b1 - a1;
    }
  );
}

const dayMillis = 1000 * 60 * 60 * 24;