const { Router } = require("express");
const router = Router();
const { Activities } = require("../db");

router.get("/", async (req, res) => {
  // puede recibir query
  const name = req.query.name;
  // const filter = req.query.filter;
  const order = req.query.order;

  const activities = await Activities.findAll();

  if (name) {
    try {
      const activity = await activities.filter((a) =>
        a.name.toLowerCase().includes(name.toLowerCase())
      );
      res.json(activity);
    } catch (error) {
      console.log(error);
    }
  } else if (order) {
    if (order === "ASC") {
      try {
        const activitiesAsc = await activities.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
          return 0;
        });
        res.json(activitiesAsc);
      } catch (error) {
        console.log(error);
      }
    } else if (order === "DESC") {
      try {
        const activitiesDesc = await activities.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
          if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
          return 0;
        });
        res.json(activitiesDesc);
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    res.json(activities);
  }

});

router.get("/:id", async (req, res) => {
  // id x params
  const id = req.params.id;
  if (id) {
    try {
      const activity = await Activities.findByPk(id);
      res.json(activity);
    } catch (error) {
      console.log(error);
    }
  }
});

router.post("/", async (req, res) => {
  const {name, schedule, start_at, end_at, description, allowed_age, difficulty_level} = req.body;

  try {
    const activity = await Activities.findOrCreate({where: {name, schedule, start_at, end_at, description, allowed_age, difficulty_level}});
    res.json(activity);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
