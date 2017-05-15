import { StatsketballPage } from './app.po';

describe('statsketball App', () => {
  let page: StatsketballPage;

  beforeEach(() => {
    page = new StatsketballPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
