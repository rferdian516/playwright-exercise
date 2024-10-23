import { test, expect } from "@playwright/test";
import { chromium } from "playwright";
test("get started link", async ({ page }) => {
  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();
  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});

// === Section 3 point B (Login & Select Items: 2 items, 3 items, & 4 items)=== //

(async () => {
  // Launch a new Chromium browser instance
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // open URL
  await page.goto(" https://www.saucedemo.com/");

  // login
  const usernameXpath = '//*[@id="user-name"]';
  const passwordXpath = '//*[@id="password"]';
  const loginButton = '//*[@id="login-button"]';

  const inputField = page.locator(`xpath=${usernameXpath}`);
  await inputField.fill("standard_user");

  const inputField1 = page.locator(`xpath=${passwordXpath}`);
  await inputField1.fill("secret_sauce");

  const button = page.locator(`xpath=${loginButton}`);
  await button.click();

  // if success login & selec items
  const item1Button = '//*[@id="add-to-cart-sauce-labs-backpack"]';
  const item2Button = '//*[@id="add-to-cart-sauce-labs-bike-light"]';
  const item3Button = '//*[@id="add-to-cart-sauce-labs-bolt-t-shirt"]';
  const item4Button = '//*[@id="add-to-cart-sauce-labs-fleece-jacket"]';
  const item5Button = '//*[@id="add-to-cart-sauce-labs-onesie"]';
  const item6Button =
    '//*[@id="add-to-cart-test.allthethings()-t-shirt-(red)"]';

  const button1 = page.locator(`xpath=${item1Button}`);
  await button1.click();

  const button2 = page.locator(`xpath=${item2Button}`);
  await button2.click();

  const button3 = page.locator(`xpath=${item3Button}`);
  await button3.click();

  const button4 = page.locator(`xpath=${item4Button}`);
  await button4.click();

  // Close the browser
  await browser.close();
})();

// === Section 3 point C (i.	Login -> select items using random function -> go to “cart” -> remove an item -> checkout -> fill the form -> click the “Continue” button -> click the “Finish” button.)=== //

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  //open URL
  await page.goto(" https://www.saucedemo.com/");

  // login
  const usernameXpath = '//*[@id="user-name"]';
  const passwordXpath = '//*[@id="password"]';
  const loginButton = '//*[@id="login-button"]';

  const inputField = page.locator(`xpath=${usernameXpath}`);
  await inputField.fill("standard_user");

  const inputField1 = page.locator(`xpath=${passwordXpath}`);
  await inputField1.fill("secret_sauce");

  const button = page.locator(`xpath=${loginButton}`);
  await button.click();

  //create list items
  const itemButtons = [
    '//*[@id="add-to-cart-sauce-labs-backpack"]',
    '//*[@id="add-to-cart-sauce-labs-bike-light"]',
    '//*[@id="add-to-cart-sauce-labs-bolt-t-shirt"]',
    '//*[@id="add-to-cart-sauce-labs-fleece-jacket"]',
    '//*[@id="add-to-cart-sauce-labs-onesie"]',
    '//*[@id="add-to-cart-test.allthethings()-t-shirt-(red)"]',
  ];

  //random pick item
  const clickRandomButtons = async () => {
    const shuffledButtons = itemButtons.sort(() => 0.5 - Math.random()); // Shuffle the array
    const selectedButtons = shuffledButtons.slice(0, 2); // Get the first two buttons

    for (const buttonXPath of selectedButtons) {
      const buttonLocator = page.locator(`xpath=${buttonXPath}`);
      await buttonLocator.click();
      console.log(`Clicked button with XPath: ${buttonXPath}`);
    }
  };
  await clickRandomButtons();

  // go to chart
  const buttonChart = '//*[@id="shopping_cart_container"]/a';
  const buttonChartClicked = page.locator(`xpath=${buttonChart}`);
  await buttonChartClicked.click();

  // remove one item from random picked items
  const chooseOneButton = async (buttons) => {
    const buttonToClick = buttons[Math.floor(Math.random() * buttons.length)];
    const buttonLocator = page.locator(`xpath=${buttonToClick}`);
    await buttonLocator.click();
    console.log(
      `Randomly selected and clicked button with XPath: ${buttonToClick}`
    );
  };
  await chooseOneButton;

  // checkout
  const buttonCheckout = '//*[@id="checkout"]';
  const buttonCheckoutClicked = page.locator(`xpath=${buttonCheckout}`);
  await buttonCheckoutClicked.click();

  //fill form
  const firstNameXpath = '//*[@id="first-name"]';
  const lastNameXpath = '//*[@id="last-name"]'; //*[@id="last-name"]
  const zipXpath = '//*[@id="postal-code"]';
  const continueButton = '//*[@id="continue"]';
  const finishButton = '//*[@id="finish"]';

  const inputFirstName = page.locator(`xpath=${firstNameXpath}`);
  await inputFirstName.fill("Reynaldo");

  const inputLastName = page.locator(`xpath=${lastNameXpath}`);
  await inputLastName.fill("Ferdian");

  const inputZip = page.locator(`xpath=${zipXpath}`);
  await inputZip.fill("11111");

  // click continue
  const buttonContinue = page.locator(`xpath=${continueButton}`);
  await buttonContinue.click();

  // finish
  const buttonFinish = page.locator(`xpath=${finishButton}`);
  await buttonFinish.click();

  // Close the browser
  await browser.close();
})();
