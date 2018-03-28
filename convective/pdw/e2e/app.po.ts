import {browser, by, element} from 'protractor';

export class HormelPage {
  navigateTo() {
    return browser.get('/');
  }

  getTopNav() {
    return element(by.css('hfc-root hfc-top-nav'));
  }
}
