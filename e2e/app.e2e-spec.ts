import { Fooder2Page } from './app.po';

describe('fooder2 App', function() {
  let page: Fooder2Page;

  beforeEach(() => {
    page = new Fooder2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
