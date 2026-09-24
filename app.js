const { MongoClient } = require("mongodb");

const host = "db01.dbhost.dev";
const port = 5050;
const databaseName = "db_453z9yugy";
const username = "user_453z9yugy";
const password = "p453z9yugy";

const url = `mongodb://${username}:${password}@${host}:${port}/${databaseName}`;
const client = new MongoClient(url);

async function main() {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully!");

        const db = client.db(databaseName);
        const products = db.collection("products");

        await products.deleteMany({});

        const productData = [
            { productId: "P001", productName: "Laptop", category: "Electronics", price: 55000, quantity: 10, supplier: "Dell" },
            { productId: "P002", productName: "Mouse", category: "Electronics", price: 800, quantity: 50, supplier: "Logitech" },
            { productId: "P003", productName: "Keyboard", category: "Electronics", price: 1500, quantity: 30, supplier: "HP" },
            { productId: "P004", productName: "Office Chair", category: "Furniture", price: 7500, quantity: 15, supplier: "Featherlite" },
            { productId: "P005", productName: "Notebook", category: "Stationery", price: 100, quantity: 100, supplier: "Classmate" }
        ];

        await products.insertMany(productData);
        console.log("\n1. Products inserted successfully.");

        const electronicsProducts = await products.find({ category: "Electronics" }).toArray();
        console.log("\n2. Electronics Products:");
        console.log(electronicsProducts);

        const oneProduct = await products.findOne({ productId: "P001" });
        console.log("\n3. One Product:");
        console.log(oneProduct);

        const selectedProducts = await products.find({}).project({ _id: 0, productName: 1, price: 1, quantity: 1 }).toArray();
        console.log("\n4. Product Name, Price and Quantity:");
        console.log(selectedProducts);

        await products.updateOne({ productId: "P001" }, { $set: { price: 60000, quantity: 8 } });
        console.log("\n5. Price and quantity updated.");

        await products.updateOne({ productId: "P002" }, { $set: { productName: "Wireless Mouse", supplier: "Logitech India" } });
        console.log("\n6. Product updated using productId.");

        await products.deleteOne({ productId: "P005" });
        console.log("\n7. Product deleted.");

        const finalProducts = await products.find({}).toArray();
        console.log("\n8. Final Product Records:");
        console.log(finalProducts);

    } catch (error) {
        console.error("MongoDB Error:", error);
    } finally {
        await client.close();
        console.log("\nMongoDB connection closed.");
    }
}

main();
