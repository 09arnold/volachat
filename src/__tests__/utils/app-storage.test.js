import AppStorage from "../../utils/app-storage";

describe('init: ', () => {
  test('Check if AppStorage is initialized', () => {
    AppStorage.init();
    console.log(localStorage)
  });
});