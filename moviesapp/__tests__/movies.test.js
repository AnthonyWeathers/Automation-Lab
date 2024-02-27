const {By, Builder, Browser, until} = require('selenium-webdriver')

let driver;

beforeEach(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build()
    await driver.get('http://localhost:3000/')
});

afterEach(async () => {
    await driver.quit()
})

describe('Test the Movies App', () => {
    test('can cross off a movie', async () => {
        
        
        let movie = 'Aliens'

        await driver.sleep(1000)
        await driver.findElement(By.id('add-movie-input')).sendKeys(movie)

        await driver.sleep(1000)
        await driver.findElement(By.css('button[type="submit"]')).click()

        await driver.sleep(1000)
        await driver.findElement(By.id('movie-0')).click()

        const checkedMovie = await driver.findElement(By.id("message"))

        expect(await checkedMovie.getText()).toBe(`Watched ${movie}`)
        await driver.sleep(1000)
    })

    test('can uncross off a movie', async () => {
        
        
        let movie = 'Alien'

        await driver.sleep(1000)
        await driver.findElement(By.id('add-movie-input')).sendKeys(movie)

        await driver.sleep(1000)
        await driver.findElement(By.css('button[type="submit"]')).click()

        await driver.sleep(1000)
        await driver.findElement(By.id('movie-0')).click()

        await driver.sleep(1000)
        await driver.findElement(By.id('movie-0')).click()

        const checkedMovie = await driver.findElement(By.id("message"))

        expect(await checkedMovie.getText()).toBe(`Added back ${movie}`)
        await driver.sleep(1000)
    })

    test('can delete a movie', async () => {
        
        
        let movie = 'Predator'

        await driver.sleep(1000)
        await driver.findElement(By.id('add-movie-input')).sendKeys(movie)

        await driver.sleep(1000)
        await driver.findElement(By.css('button[type="submit"]')).click()

        await driver.sleep(1000)
        await driver.findElement(By.className('delete-btn')).click()

        const checkedMovie = await driver.findElement(By.id("message"))

        expect(await checkedMovie.getText()).toBe(`${movie} deleted!`)
        await driver.sleep(1000)
    })
})