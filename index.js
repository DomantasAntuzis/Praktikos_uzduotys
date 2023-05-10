const express = require("express");
const app = express();
const PORT = 3000;
const productsRoutes = require("./routes/products");
const logger = require("./config/logger");
const errorHandlingMiddleware = require("./middlewares/errorHandling");

app.use(errorHandlingMiddleware);

app.use(express.json());
app.use(express.static(__dirname + "/views"));
app.use(express.urlencoded({ extended: true }));

app.use("/api", productsRoutes);

//not implemented routes
app.use((req, res) => {
  res.status(501).json({ message: "Not Implemented" });
});

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
