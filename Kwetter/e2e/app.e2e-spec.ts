import { KwetterPage } from './app.po';

describe('kwetter App', () => {
  let page: KwetterPage;

  beforeEach(() => {
    page = new KwetterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
