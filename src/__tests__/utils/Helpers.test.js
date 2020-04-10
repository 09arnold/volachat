import * as Helpers from "../../utils/Helpers";

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
    expect(output).toBe('6:00:00 AM');
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
    expect(output).toBe('4/3/2020');
  });
});

describe('dayOfWeekAsString: Get day of week from number[0-6]', () =>{
  test('Get day of 0', () => {
    expect(Helpers.dayOfWeekAsString(0)).toBe('Sunday');
  });
  test('Get day of 5', () => {
    expect(Helpers.dayOfWeekAsString(5)).toBe('Friday');
  });
});