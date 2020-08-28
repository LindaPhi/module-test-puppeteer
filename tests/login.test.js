const timeout = 15000;
// série de tests en étant loggé en administrateur
describe("Tests administrateur", () => {
    let page;
    // vérification du chargement de la liste de liens
    test('home', async () => {
        // charger la page d'accueil
        await page.goto('http://polr.alwaysdata.net');
        await page.screenshot({path: './tests/img/home.png'});
        // attendre que le bouton d'authentification soit chargé
        await page.waitForSelector('.dropdown-toggle');
        // Dérouler le menu pour accéder à l'authentification
        await page.$eval('.dropdown-toggle', el => el.click());
        await page.screenshot({path: './tests/img/admin-test.png'});
        //s'authentifier en tant qu'admin
        await page.type('input[name="username"]', 'admin');
        await page.type('input[name="password"]', 'campus');
        await page.$eval('.ng-valid', form => form.submit());
        const user = await page.evaluate(() => document.body.textContent);
        expect(user).toContain('admin');
        //await page.waitForNavigation();
        await page.screenshot({path: './tests/img/login.png'});
    }, timeout);


    test("link", async () => {
            //attendre que le bouton admin soit chargé
            await page.waitForSelector('a.dropdown-toggle.login-name');
            await page.$eval('a.dropdown-toggle.login-name', el => el.click());
            await page.screenshot({path: './tests/img/link1.png'});
            //attendre que la liste déroulante soit chargé
            await page.waitForSelector('ul.dropdown-menu.pull-right');
            await page.$eval('ul.dropdown-menu.pull-right a', el => el.click());
            await page.screenshot({path: './tests/img/link2.png'});
        }, timeout
    );
    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)
});