import { HormelPage } from './app.po';

describe('hormel App', () => {
  let page: HormelPage;

  beforeEach(() => {
    page = new HormelPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
