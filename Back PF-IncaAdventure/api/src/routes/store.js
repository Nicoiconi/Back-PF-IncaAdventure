const { Router } = require("express");
const router = Router();
const { Store } = require("../db");

// la store se crea junto con el usuario

router.get("/", async (req, res) => {
  const name = req.query.name;
  const order = req.query.order;
  const stores = await Store.findAll();

  if(name){
    try {
      const store = await stores.filter(s => s.name.toLowerCase().includes(name.toLowerCase()));
      res.json(store);
    } catch (error) {
      console.log(error);
    }
  } else if (order){
    if (order === "ASC"){
      try {
        const storesAsc = await stores.sort((a, b) => {
          if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          if(b.name.toLowerCase() > a.name.toLowerCase()) return -1;
          return 0;
        });
        res.json(storesAsc);
      } catch (error) {
        console.log(error)
      }
    } else if (order === "DESC"){
      try {
        const storesDesc = await stores.sort((a, b) => {
          if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
          if(b.name.toLowerCase() > a.name.toLowerCase()) return 1;
          return 0
        });
        res.json(storesDesc);
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    res.json(stores);
  }

  
});


module.exports = router;
