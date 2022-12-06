const { Router } = require("express");
const router = Router();
const { Reviews } = require("../db");

router.get("/", async (req, res) => {
  const rate = req.query.rate;
  const word = req.query.word;
  const reviews = await Reviews.findAll();
  
  if(rate){
    try {
      const reviewsByRate = await reviews.filter(r => Number(rate) === Number(r.rate));
      res.json(reviewsByRate);
    } catch (error) {
      console.log(error);
    }
  } else if(word){
    try {
      const reviewsByWord = await reviews.filter(r => r.comments.toLowerCase().includes(word.toLowerCase()));
      res.json(reviewsByWord);
    } catch (error) {
      console.log(error)
    }
  } else {
    res.json(reviews);
  };

});

router.post("/", async (req, res) => {
  const {rate, comments} = req.body;
  // ver como traer activityId, userId, 
  if(!rate || !comments) res.status(400).json({msg: "Missing info bro"});

  try {
    const review = Reviews.findOrCreate({
      // la idea es que activityId y userId no vuelvan a aparecer juntos
      where: {
        rate,
        comments
      }
    })
    res.json(review);
  } catch (error) {
    console.log(error);
  }
  
});



module.exports = router;
