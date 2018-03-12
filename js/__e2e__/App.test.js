describe('Main', () => {
    it('should start in home screen', async () => {
        expect(element(by.id('homeScreen'))).toBeVisible();
    });
    // TODO: The persisted state and downloaded files should be reset for the following two tests
    //       Now they are working because each of them is choosing a different index, but that could be flaky
    it('should downloaded article', async () => {
        element(by.id('recentArticle')).atIndex(2).tap();
        expect(element(by.id('downloadFabIconDownload'))).toBeVisible();
        element(by.id('downloadFab')).tap();
        expect(element(by.id('downloadFabIconDownloaded'))).toBeVisible();
    });
    it('should list downloaded article', async () => {
        element(by.id('recentArticle')).atIndex(0).tap();
        element(by.id('downloadFab')).tap();
        element(by.id('articleDetailGoBack')).tap();
        expect(element(by.id('downloadedArticle')).atIndex(0)).toExist();
    });
})