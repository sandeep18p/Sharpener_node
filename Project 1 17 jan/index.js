const express = require("express");
const cors = require("cors");
const Attendance = require("./attendance");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.post("/attendance", async (req, res) => {
    const { date, attendance } = req.body;

    if (!date || !attendance || attendance.length === 0) {
        return res.status(400).json({ message: "Invalid data received!" });
    }

    try {
        for (const record of attendance) {
            await Attendance.create({
                name: record.name,
                status: record.status,
                date: date,
            });
        }

        res.status(200).json({ message: "Attendance data saved successfully!" });
    } catch (error) {
        console.error("Error saving attendance data:", error);
        res.status(500).json({ message: "Failed to save attendance data." });
    }
});

app.get("/attendance", async (req, res) => {
    try {
      const { date } = req.query;
      if (!date) {
        return res.status(400).json({ error: "Date is required" });
      }
  
      const records = await Attendance.findAll({
        where: {
          date, 
        },
      });
  
      res.status(200).json(records);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
      res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/attendance/report', async (req, res) => {
    try {
      const records = await Attendance.findAll({
        attributes: ['name', 'status', 'date'],
      });
  
      const report = {};
  
      records.forEach((record) => {
        const { name, status } = record;
        if (!report[name]) {
          report[name] = { total: 0, present: 0 };
        }
        report[name].total++;
  
        if (status === 'Present') {
          report[name].present++;
        }
      });
  
      const finalReport = Object.keys(report).map((name) => {
        const { total, present } = report[name];
        const percentage = ((present / total) * 100).toFixed(2);
        return { name, total, present, percentage };
      });
  
      res.json(finalReport);
    } catch (error) {
      console.error('Error fetching attendance report:', error);
      res.status(500).json({ message: 'Error fetching report' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
