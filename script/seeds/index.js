const {
  db,
  models: { Project, Product, ProductAttribute, Attribute },
} = require("../../server/db");

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  const [airFryer, bed] = await Promise.all([
    Project.create({
      name: "Air Fryer",
      category: "product",
      subCategory: "appliance",
    }),
    Project.create({
      name: "Beds",
      category: "product",
      subCategory: "furniture",
      status: "completed",
    }),
  ]);

  const [airFryer1, airFryer2, airFryer3, bed1, bed2] = await Promise.all([
    Product.create({
      projectId: airFryer.id,
      brand: "Wayfair",
      url: "https://www.wayfair.com/shop-product-type/pdp/instant-pot-8-qt-duo-crisp-pressure-cooker-istp1037.html",
      userRating: 2,
      userNotes: "Kind of like this one...",
    }),
    Product.create({
      projectId: airFryer.id,
      brand: "Amazon",
      url: "https://www.amazon.com/AmazonBasics-Quart-Compact-Multi-Functional-Digital/dp/B07VZ65M7H/ref=sr_1_1_sspa?crid=LPKCLLOPRJ20",
      userRating: 4,
      userNotes: "Meh",
    }),
    Product.create({
      projectId: airFryer.id,
      brand: "Wayfair",
      url: "https://www.wayfair.com/kitchen-tabletop/pdp/cuisinart-air-fryer-toaster-oven-cui3490.html",
      userRating: 5,
      userNotes: "Love the toaster oven!",
    }),
    Product.create({
      projectId: bed.id,
      brand: "Wayfair",
      url: "https://www.wayfair.com/furniture/pdp/lark-manor-landyn-39-steel-platform-bed-w004764146.html",
      userRating: 4,
      userNotes: "Pretty!!",
      isFinalSelection: true,
    }),
    Product.create({
      projectId: bed.id,
      brand: "West Elm",
      url: "https://www.westelm.com/products/ida-bed-white-h6911/?pkey=s~bed~245",
      userRating: 5,
      userNotes: "Just WOW!",
    }),
  ]);

  const [
    airFryerName,
    airFryerImage,
    airFryerPrice,
    airFryerRatings,
    bedName,
    bedImage,
    bedPrice,
    bedRatings,
  ] = await Promise.all([
    Attribute.create({
      projectId: airFryer.id,
      name: "Name",
      criteriaType: "informational",
    }),
    Attribute.create({
      projectId: airFryer.id,
      name: "Image",
      criteriaType: "informational",
    }),
    Attribute.create({
      projectId: airFryer.id,
      name: "Price",
      criteriaType: "minMax",
      criteriaValue: "min",
      priority: 0,
    }),
    Attribute.create({
      projectId: airFryer.id,
      name: "Ratings",
      criteriaType: "minMax",
      criteriaValue: "max",
      priority: 1,
    }),
    //Bed
    Attribute.create({
      projectId: bed.id,
      name: "Name",
      criteriaType: "informational",
    }),
    Attribute.create({
      projectId: bed.id,
      name: "Image",
      criteriaType: "informational",
    }),
    Attribute.create({
      projectId: bed.id,
      name: "Price",
      criteriaType: "lessThanOrEqualTo",
      criteriaValue: "1000",
      priority: 0,
      isRequired: true,
    }),
    Attribute.create({
      projectId: bed.id,
      name: "Ratings",
      criteriaType: "minMax",
      criteriaValue: "max",
      priority: 1,
    }),
  ]);

  await Promise.all([
    ProductAttribute.create({
      productId: airFryer1.id,
      attributeId: airFryerName.id,
      value: "Instant Pot 8 Qt. Duo Crisp Pressure Cooker",
    }),
    ProductAttribute.create({
      productId: airFryer1.id,
      attributeId: airFryerImage.id,
      value:
        "https://secure.img1-fg.wfcdn.com/im/76503727/resize-h800-w800%5Ecompr-r85/1556/155692369/Instant+Pot+8+Qt.+Duo+Crisp+Pressure+Cooker.jpg",
    }),
    ProductAttribute.create({
      productId: airFryer1.id,
      attributeId: airFryerPrice.id,
      value: "199.99",
    }),
    ProductAttribute.create({
      productId: airFryer1.id,
      attributeId: airFryerRatings.id,
      value: "4.6",
    }),
    ProductAttribute.create({
      productId: airFryer2.id,
      attributeId: airFryerName.id,
      value:
        "Amazon Basics 3.2 Quart Compact Multi-Functional Digital Air Fryer",
    }),
    ProductAttribute.create({
      productId: airFryer2.id,
      attributeId: airFryerImage.id,
      value: "https://m.media-amazon.com/images/I/81SnAgGuKHL._AC_SL1500_.jpg",
    }),
    ProductAttribute.create({
      productId: airFryer2.id,
      attributeId: airFryerPrice.id,
      value: "81.99",
    }),
    ProductAttribute.create({
      productId: airFryer2.id,
      attributeId: airFryerRatings.id,
      value: "4.5",
    }),
    ProductAttribute.create({
      productId: airFryer3.id,
      attributeId: airFryerName.id,
      value: "Cuisinart Air Fryer Toaster Oven",
    }),
    ProductAttribute.create({
      productId: airFryer3.id,
      attributeId: airFryerImage.id,
      value:
        "https://secure.img1-fg.wfcdn.com/im/32520105/resize-h800-w800%5Ecompr-r85/1048/104849338/Cuisinart+Air+Fryer+Toaster+Oven.jpg",
    }),
    ProductAttribute.create({
      productId: airFryer3.id,
      attributeId: airFryerPrice.id,
      value: "299.95",
    }),
    ProductAttribute.create({
      productId: airFryer3.id,
      attributeId: airFryerRatings.id,
      value: "4.5",
    }),
    ProductAttribute.create({
      productId: bed1.id,
      attributeId: bedName.id,
      value: "Landyn Steel Platform Bed",
    }),
    ProductAttribute.create({
      productId: bed1.id,
      attributeId: bedImage.id,
      value:
        "https://secure.img1-fg.wfcdn.com/im/47604265/resize-h800-w800%5Ecompr-r85/1796/179617427/Landyn+Steel+Platform+Bed.jpg",
    }),
    ProductAttribute.create({
      productId: bed1.id,
      attributeId: bedPrice.id,
      value: "239.99",
    }),
    ProductAttribute.create({
      productId: bed1.id,
      attributeId: bedRatings.id,
      value: "4.4",
    }),
    ProductAttribute.create({
      productId: bed2.id,
      attributeId: bedName.id,
      value: "Ida Woven Bed",
    }),
    ProductAttribute.create({
      productId: bed2.id,
      attributeId: bedImage.id,
      value:
        "https://assets.weimgs.com/weimgs/rk/images/wcm/products/202152/0102/ida-woven-bed-o.jpg",
    }),
    ProductAttribute.create({
      productId: bed2.id,
      attributeId: bedPrice.id,
      value: "1169.10",
    }),
  ]);

  console.log(`
  
  
            seeded successfully
            
            
  `);
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
