import { AngularRpControlsPage } from './app.po';

describe('angular-rp-controls App', function() {
  let page: AngularRpControlsPage;

  beforeEach(() => {
    page = new AngularRpControlsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
