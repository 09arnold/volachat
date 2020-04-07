import * as Helpers from "../../utils/Helpers";

test('Check if a Date from a provided string is a valid date', () => {
  const testInput = new Date('2019-10-25 15:20:29');
  expect(Helpers.is_date(testInput)).toBeTruthy();
});

test('Check if a Date from a provided string is not vaild', () => {
  const testInput = new Date('2019-25-10 15:20:29');
  expect(Helpers.is_date(testInput)).toBeFalsy();
});