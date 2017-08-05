import { TestNg2DcjsPage } from './app.po';

describe('test-ng2-dcjs App', () => {
  let page: TestNg2DcjsPage;

  beforeEach(() => {
    page = new TestNg2DcjsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
