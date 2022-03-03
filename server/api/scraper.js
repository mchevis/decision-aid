const puppeteer = require("puppeteer");

async function scrape(URL) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  try {
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4298.0 Safari/537.36"
    );
    await page.goto(URL);

    await page.waitForSelector("#productTitle"); //name
    await page.waitForSelector(
      "#corePrice_feature_div > div > span > span.a-offscreen"
    ); //price
    await page.waitForSelector("#landingImage"); //image
    await page.waitForSelector("#acrPopover"); //image
    await page.waitForSelector("#acrCustomerReviewText"); //image

    const name = await page.$eval(
      "#productTitle",
      (element) => element.innerText
    );

    const price = await page.$eval(
      "#corePrice_feature_div > div > span > span.a-offscreen",
      (element) => element.innerText
    );

    const image = await page.$eval("#landingImage", (element) =>
      element.getAttribute("src")
    );

    const review = await page.$eval("#acrPopover", (element) =>
      element.getAttribute("title")
    );

    const reviewCount = await page.$eval(
      "#acrCustomerReviewText",
      (element) => element.innerText
    );

    const result = {
      name,
      price: Number(price.substring(1)),
      image,
      ratings: Number(review.split(" ")[0]),
    };

    await browser.close();

    return result;
  } catch (err) {
    await browser.close();
    console.log(err);
  }
}

module.exports = scrape;

//with extra values
// const result = {
//     name,
//     price: {
//       currencySymbol: price[0],
//       value: Number(price.substring(1)),
//     },
//     image,
//     ratings: {
//       value: Number(review.split(" ")[0]),
//       count: reviewCount.split(" ")[0],
//     },
//   };
