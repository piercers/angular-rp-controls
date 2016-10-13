import { RpControlsPage } from './app.po';

describe('rp-controls App', function() {
  let page: RpControlsPage;

  beforeEach(() => {
    page = new RpControlsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
