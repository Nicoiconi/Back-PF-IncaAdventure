const { Router } = require("express");
const router = Router();
const { Users, Store } = require("../db");

router.get("/", async (req, res) => {
  const name = req.query.name;
  const order = req.query.order;
  const users = await Users.findAll();

  if(name){
    try {
      const user = await users.filter(a => a.name.toLowerCase().includes(name.toLowerCase()));
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  } else if (order){
    if (order === "ASC"){
      try {
        const usersAsc = await users.sort((a, b) => {
          if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          if(b.name.toLowerCase() > a.name.toLowerCase()) return -1;
          return 0;
        });
        res.json(usersAsc);
      } catch (error) {
        console.log(error)
      }
    } else if (order === "DESC"){
      try {
        const usersDesc = await users.sort((a, b) => {
          if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
          if(b.name.toLowerCase() > a.name.toLowerCase()) return 1;
          return 0
        });
        res.json(usersDesc);
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    res.json(users);
  }

});

router.get("/:id", async (req, res) => {
  // id x params
  const id = req.params.id;
  const users = await Users.findAll();
  
  if (id) {
    try {
      const user = users.filter(u => Number(u.id) === Number(id));
      if(!user.length) res.status(400).json({msg: "no existe usuario con ese id"});
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  }
});

router.post("/", async (req, res) => {
  const {last_name, first_name, birth_date, nationality, email, id_type, id_number} = req.body;

  try {
    const user = await Users.findOrCreate({where: {last_name, first_name, birth_date, nationality, email, id_type, id_number}});
    if(user[1]){
      try {
        const store = await Store.findOrCreate({where: {
          name: email,
        }});
        console.log(`la store de ${email} fue creada correctamente`);
      } catch (error) {
        console.log(error);
      }
    }

    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
