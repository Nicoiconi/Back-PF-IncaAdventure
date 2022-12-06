const { Router } = require("express");
const router = Router();
const { Products } = require("../db");

router.get("/", async (req, res) => {
  const { name } = req.query;
  const { order } = req.query;
  const products = await Products.findAll();
  if (name) {
    try {
      const productName = products?.filter((d) =>
        d.name.toLowerCase().includes(name.toLowerCase())
      );
      res.status(200).json(productName);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(200).json(products);
  }

  if (order) {
    try {
      if (order === "ASC") {
        const productsAsc = products.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
          return 0;
        });
        res.json(productsAsc);
      } else if (order === "DESC") {
        const productsDesc = products.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
          if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
          return 0;
        });
        res.json(productsDesc);
      }
    } catch (error) {
      console.log(error);
    }
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  let products = await Products.findAll();
  try {
    const filteredProducts = products.filter((e) => e.id == id);
    if (filteredProducts.length) {
      res.status(200).json(filteredProducts);
    } else {
      res.status(404).send("No product found on that ID");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  let {name, price, stock} = req.body;
  try {
    let product = Products.findOrCreate({ where: {name, price, stock} });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
