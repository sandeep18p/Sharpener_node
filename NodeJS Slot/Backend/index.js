const express = require("express");
const cors = require("cors");
const  createSlots = require("./createBulk"); 
const Slot = require("./model/"); 
const Person = require("./model/person"); 
const sequelize = require("./db/db.js"); 

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.use("/expenses", expenseRoutes); 
app.get("/create-slots", async(req,res)=>{
    try {
        await createSlots(); // Wait for the async function to complete
        res.status(201).send("Slots created successfully!"); // Send a success response
      } catch (error) {
        console.error("Error creating slots:", error);
        res.status(500).send("Failed to create slots.");
      }
});

app.get("/slots", async (req, res) => {
  try {
    // Fetch all slots from the database
    const slots = await Slot.findAll(); 

    // If no slots are found, send a 404 status with a message
    if (!slots.length) {
      return res.status(404).send("No slots found.");
    }

    // Send the slots data as a JSON response
    res.status(200).json(slots);
  } catch (error) {
    console.error("Error fetching slots:", error);
    res.status(500).send("Failed to fetch slots.");
  }
});



//booking 
app.post("/create-slots", async(req,res)=>{
    try {
        const {time,name,email}=req.body;
        const slot = await Slot.findOne({where: { time:time}})
        // console.log(got)
        const person = await Person.create({
          name: name, // Default to "Raju" if no name is provided
          email:email,
          slotId: slot.id, // Associate the person with the slot
        });
        slot.available = slot.available - 1;

        // Save the updated slot
        await slot.save();
        // console.log(got)

        res.status(201).json("Slots created successfully!"); // Send a success response
      } catch (error) {
        console.error("Error creating slots:", error);
        res.status(500).send("Failed to create slots.");
      }
});


//cancel
app.post("/cancel-booking", async (req, res) => {
  try {
    const { name } = req.body; // Get the person's name from the request body
    
    // Find the person by name
    const person = await Person.findOne({ where: { name: name } });
    console.log(person);

    if (!person) {
      return res.status(404).send("Person not found!"); // Return error if the person doesn't exist
    }

    // Find the slot associated with this person
    const slot = await Slot.findByPk(person.slotId);

    if (!slot) {
      return res.status(404).send("Slot not found!"); // Return error if the slot doesn't exist
    }

  
    slot.available += 1;

    
    await slot.save();

    
    await person.destroy();

    res.status(200).json("Booking canceled successfully! Slot availability updated.");
  } catch (error) {
    console.error("Error canceling booking:", error);
    res.status(500).send("Failed to cancel the booking.");
  }
});


//fetching all 
app.get("/get", async (req, res) => {
  try {
    // Fetch all persons and include associated slot information
    const bookings = await Person.findAll({
      include: {
        model: Slot,
        as: 'slot',  // Use the alias defined in the association
        attributes: ['time', 'available'], // Fetch 'time' and 'available' of the Slot
      },
    });
    
    // If no bookings are found, send an appropriate message
    if (bookings.length === 0) {
      return res.status(404).send("No bookings found.");
    }

    // Send the bookings data as JSON
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    res.status(500).send("Failed to fetch bookings.");
  }
});


sequelize.sync() 
  .then(() => {
    console.log("Database connected and synced!");
   
    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch(err => {
    console.error("Error syncing database:", err);
  });