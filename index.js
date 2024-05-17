// const express = require("express");
// const app = express();
// const path = require("path");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");

// app.set("view engine", "ejs");
// app.use(express.static("public"));
// app.get("/", (req, res) => {
//   res.render("index.ejs");
// });

// app.get("/admin", (req, res) => {
//   res.render("admin.ejs");
// });
// app.get("/:sub", (req, res) => {
//   const { sub } = req.params;
//   res.send(`${sub} not found`);
// });

// // mongoose.connect('mongodb+srv://221001113:admin@cluster0.hmvlvkp.mongodb.net/', {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // });

// // const db = mongoose.connection;
// // db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// // // Define Mongoose schema
// // const reservationSchema = new mongoose.Schema({
// //   name: String,
// //   contact: String,
// //   pickupDate: Date,
// //   vehicleType: String,
// //   vehicleMake: String,
// // });
// // const Reservation = mongoose.model('reservation', reservationSchema);

// // // Middleware
// // app.use(bodyParser.json());

// // // Routes
// // app.post('/reservation', async (req, res) => {
// //   try {
// //     const { name, contact, pickupDate, vehicleType, vehicleMake } = req.body;
// //     const reservation = new Reservation({
// //       name,
// //       contact,
// //       pickupDate,
// //       vehicleType,
// //       vehicleMake,
// //     });
// //     await reservation.save();
// //     res.status(201).send(reservation);
// //   } catch (error) {
// //     res.status(400).send(error);
// //   }
// // });

// // mongoose
// //   .connect("mongodb+srv://221001113:admin@cluster0.hmvlvkp.mongodb.net/")
// //   .then((result) => {
// //     console.log("Mongo DB Connected");
// //   })
// //   .catch((err) => {
// //     console.log(err);
// //   });

// // const tutSchema = new mongoose.Schema({
// //   name: {
// //     type: String,
// //   },
// //   contact: {
// //     type: Number,
// //   },
// //   pickupdate: {
// //     type: Date,
// //   },
// //   vehicletype: {
// //     type: String,
// //   },
// //   vehiclemake: {
// //     type: String,
// //   },
// // });

// // const collection = new mongoose.model('tut',tutSchema);
// app.listen(3000, () => {
//   console.log("PORT RUNNING ON 3000");
// });

const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/admin", (req, res) => {
  res.render("admin.ejs");
});

mongoose
  .connect("mongodb+srv://221001113:admin@cluster0.hmvlvkp.mongodb.net/")
  .then(() => {
    console.log("Mongo DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const reservationSchema = new mongoose.Schema({
  name: String,
  contact: String,
  pickupDate: Date,
  vehicleSelection: String,
  vehicleMake: String,
});
const Reservation = mongoose.model("Reservation", reservationSchema);

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/reservation", async (req, res) => {
  try {
    const { name, contact, pickupDate, vehicleSelection, vehicleMake } =
      req.body;
    const reservation = new Reservation({
      name,
      contact,
      pickupDate,
      vehicleSelection,
      vehicleMake,
    });
    await reservation.save();
    res.status(201).render("success.ejs");
  } catch (error) {
    console.log(error); // Log the error
    res.status(400).send("Failed to save reservation");
  }
});

app.get("/details", async (req, res) => {
  try {
    const details = await Reservation.find();
    res.render("details", { details });
  } catch (err) {
    console.log("Error");
    console.log(err);
    res.status(500).send("Error in retrieving details");
  }
});

app.get("/:sub", (req, res) => {
  const { sub } = req.params;
  res.send(`${sub} not found`);
});

app.listen(3000, () => {
  console.log("PORT RUNNING ON 3000");
});
