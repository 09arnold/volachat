import * as Helpers from "../../utils/Helpers";
import { ChatListing } from "../../utils/SampleData";

describe('is_date: Check for valid dates', () => {
  test('Check for valid date', () => {
    const testInput = new Date('2019-10-25 15:20:29');
    expect(Helpers.is_date(testInput)).toBeTruthy();
  });

  test('Check for invaild date', () => {
    const testInput = new Date('2019-25-10 15:20:29');
    expect(Helpers.is_date(testInput)).toBeFalsy();
  });
});

describe('getTimeDisplay: Relative to 10/04/2020, a Friday', () => {
  test('Check for same day', () => {
    const output = Helpers.getTimeDisplay('2020-04-10 06:00:00', new Date('2020-04-10 01:00:00'));
    expect(output).toBe(new Date('2020-04-10 06:00:00').toLocaleTimeString());
  });
  test('Check for previous day', () => {
    const output = Helpers.getTimeDisplay('2020-04-09 06:00:00', new Date('2020-04-10 01:00:00'));
    expect(output).toBe('Yesterday');
  });
  test('Check for date 2 days prior', () => {
    const output = Helpers.getTimeDisplay('2020-04-08 01:00:00', new Date('2020-04-10 01:00:00'));
    expect(output).toBe('Wednesday');
  });
  test('Check for date 7 days prior', () => {
    const output = Helpers.getTimeDisplay('2020-04-03 01:00:00', new Date('2020-04-10 01:00:00'));
    expect(output).toBe(new Date('4/3/2020').toLocaleDateString());
  });
});

describe('dayOfWeekAsString: Get day of week from number[0-6]', () => {
  test('Get day of 0', () => {
    expect(Helpers.dayOfWeekAsString(0)).toBe('Sunday');
  });
  test('Get day of 5', () => {
    expect(Helpers.dayOfWeekAsString(5)).toBe('Friday');
  });
});

describe('sortMessagesByTime: Sort messages of a particular chat by their timestamp', () => {
  test('Check for sorting by message timestamp', () => {
    expect(ChatListing[1].messages[0].time).toBe("2019-10-25 15:20:29");
    Helpers.sortMessagesByTime(ChatListing[1].messages);
    expect(ChatListing[1].messages[0].time).toBe("2020-02-26 16:58:32");
  });
});

describe('sortChatByLastMessage: Sort chats by the timestamp of their last message', () => {
  test('Check for sorting by last message timestamp', () => {
    expect(ChatListing[0].messages[ChatListing[0].messages.length - 1].time).toBe("2019-06-26 06:37:13");
    Helpers.sortChatByLastMessage(ChatListing);
    expect(ChatListing[0].messages[ChatListing[0].messages.length - 1].time).toBe("2020-03-25 19:13:59");
  });

  // test('Check for sorting even if a chat has no messages', () => {
    
  // });
});

describe('daysBetween: Get the number of days between two dates', () => {
  test('Get days between 01/04/2020 and 10/04/2020', () => {
    const date1 = new Date('2020-04-01 06:00:00'),
      date2 = new Date('2020-04-02 06:00:00');
    expect(Helpers.daysBetween(date1, date2)).toBe(1);
  });
});