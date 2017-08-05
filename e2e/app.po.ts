import { browser, by, element } from 'protractor';

export class TestNg2DcjsPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
