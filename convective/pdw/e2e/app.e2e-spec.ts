import {HormelPage} from './app.po';

describe('oppdw', () => {
  let page: HormelPage;

  beforeEach(() => {
    page = new HormelPage();
  });

  it('should display a TopNav', () => {
    page.navigateTo();
    expect(page.getTopNav()).toBeTruthy();
  });
});
