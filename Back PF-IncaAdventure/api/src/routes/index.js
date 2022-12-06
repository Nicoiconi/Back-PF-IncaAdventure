require('dotenv').config();
const { Router } = require('express');
const router = Router();

//Importo todos los routers;
const activities = require("./activities");
const products = require("./products");
const users = require("./users");
const reviews = require("./reviews");
const store = require("./store");


//Configuro todos los routers
router.use("/activities", activities);
router.use("/products", products);
router.use("/users", users);
router.use("/reviews", reviews);
router.use("/store", store);



module.exports = router;