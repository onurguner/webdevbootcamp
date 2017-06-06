var faker = require("faker");

console.log("====== PRICES ======")
for (var i = 0; i < 10; i++) {
    console.log("Product: " + faker.commerce.productName() + " - Price: $" + faker.commerce.price());
}