const Slot = require("./model/");

const createSlots = async () => {
  try {
    const slots = [
      { time: "2:00 PM", available: 4 },
      { time: "2:30 PM", available: 4 },
      { time: "3:00 PM", available: 4 },
      { time: "3:30 PM", available: 4 },
    ];

    // Create slots in the database
    await Slot.bulkCreate(slots);
    console.log("Slots created successfully.");
  } catch (error) {
    console.error("Error creating slots:", error);
    throw error; // Rethrow error to handle it in the calling function
  }
};

// Correctly export the function
module.exports = createSlots;
