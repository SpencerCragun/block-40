const prisma = require("../prisma");
const { faker } = require("@faker-js/faker");

const seed = async (numProducts = 20) => {
  // Create products
  const products = Array.from({ length: numProducts }, () => ({
    title: faker.food.ingredient(),
    description: faker.food.description(),
    price: faker.number.float({max: 20, fractionDigits: 2})
  }));
  await prisma.product.createMany({ data: products });
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });