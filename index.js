const express = require("express");
const app = express();
const PORT = 3000;
const productsRoutes = require("./routes/products");

app.use(express.json());
app.use(express.static(__dirname + "/views"));
app.use(express.urlencoded({ extended: true }));

app.use("/api", productsRoutes);

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));
