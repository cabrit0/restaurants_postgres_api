require("dotenv").config();
//const morgan = require("morgan");
const cors = require("cors");
const db = require("./db");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

//route GET all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  const results = await db.query("SELECT * FROM restaurants");
  try {
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//route Get one restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  //console.log(req.params);

  try {
    const results = await db.query("SELECT * FROM restaurants WHERE id=$1", [
      req.params.id,
    ]);
    //console.log(results);

    const reviews = await db.query(
      "select * from reviews where restaurant_id = $1",
      [req.params.id]
    );
    //console.log(reviews);

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurant: results.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//route Create restaurant
app.post("/api/v1/restaurants/", async (req, res) => {
  //console.log(req.body);
  try {
    const results = await db.query(
      "INSERT INTO restaurants(name, location, price_range) values($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );

    res.status(201).json({
      status: "success, restaurant added",
      data: {
        restaurant: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//route UPDATE one restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  //console.log(req.params.id);
  //console.log(req.body);

  try {
    const results = await db.query(
      "UPDATE restaurants SET name=$1, location=$2, price_range=$3 WHERE id=$4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );

    res.status(200).json({
      status: "success, restaurant updated",
      data: {
        restaurant: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//route DELETE one restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  // console.log(req.params.id);
  //console.log(req.body);

  try {
    const results = await db.query("DELETE FROM restaurants WHERE id=$1", [
      req.params.id,
    ]);

    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    //console.log(newReview);
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(
    `\n-- server is up and listening on port ${PORT}\n--- go to: http://localhost:${PORT}`
  );
});
