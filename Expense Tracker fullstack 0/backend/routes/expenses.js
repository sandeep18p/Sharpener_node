const express = require("express");
const Expense = require("../model"); // Adjust the path as necessary
const router = express.Router();

// Get all expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json({ expenses });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "An error occurred while fetching expenses", error: error.message });
  }
});

// Get a single expense by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findByPk(id);
    if (expense) {
      res.status(200).json({ expense });
    } else {
      res.status(404).json({ message: "Expense not found" });
    }
  } catch (error) {
    console.error("Error fetching expense:", error);
    res.status(500).json({ message: "An error occurred while fetching the expense", error: error.message });
  }
});

// Create a new expense
router.post("/", async (req, res) => {
  const { amount, name, category } = req.body;
  try {
    const newExpense = await Expense.create({ amount, name, category });
    res.status(201).json({ message: "Expense created successfully", expense: newExpense });
  } catch (error) {
    console.error("Error creating expense:", error);
    res.status(500).json({ message: "An error occurred while creating the expense", error: error.message });
  }
});

// Update an existing expense by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { amount, name, category } = req.body;
  try {
    const existingExpense = await Expense.findByPk(id);
    if (!existingExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    existingExpense.amount = amount || existingExpense.amount;
    existingExpense.name = name || existingExpense.name;
    existingExpense.category = category || existingExpense.category;

    await existingExpense.save();

    res.status(200).json({ message: "Expense updated successfully", expense: existingExpense });
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ message: "An error occurred while updating the expense", error: error.message });
  }
});

// Delete an expense by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const existingExpense = await Expense.findByPk(id);
    if (!existingExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await existingExpense.destroy();
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "An error occurred while deleting the expense", error: error.message });
  }
});

module.exports = router;
