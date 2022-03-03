const puppeteer = require("puppeteer");

async function amazonScrape(URL) {
  const browser = await puppeteer.launch({ headless: true });
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
    await page.waitForSelector("#acrPopover"); //review

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

async function wayfairScrape(URL) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  try {
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36"
    );
    await page.goto(URL);

    await page.waitForSelector("#bd header > h1"); //name
    await page.waitForSelector("#bd div.SFPrice > div > span"); //price
    await page.waitForSelector("#bd div.pl-FluidImage > img"); //image
    await page.waitForSelector("#bd span.ProductRatingNumberWithCount-rating"); //review

    const name = await page.$eval(
      "#bd header > h1",
      (element) => element.innerText
    );

    const price = await page.$eval(
      "#bd div.SFPrice > div > span",
      (element) => element.innerText
    );

    const image = await page.$eval("#bd div.pl-FluidImage > img", (element) =>
      element.getAttribute("src")
    );

    const review = await page.$eval(
      "#bd span.ProductRatingNumberWithCount-rating",
      (element) => element.innerText
    );

    const result = {
      name,
      price: Number(price.substring(1)),
      image,
      ratings: review,
    };

    await browser.close();

    return result;
  } catch (err) {
    await browser.close();
    console.log(err);
  }
}

module.exports = { amazonScrape, wayfairScrape };

//with extra values
// await page.waitForSelector("#acrCustomerReviewText"); //review count
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
