function markAttendance() {
    const date = document.getElementById("date").value;
    if (!date) {
        alert("Please select a date!");
        return;
    }

    const attendanceData = [];

    const listItems = document.querySelectorAll(".attendance ul li");

    listItems.forEach((item) => {
        const name = item.childNodes[0].nodeValue.trim();
        const presentInput = item.querySelector('input[value="Present"]');
        const absentInput = item.querySelector('input[value="Absent"]');

        const status = presentInput.checked ? "Present" : absentInput.checked ? "Absent" : null;

        if (status) {
            attendanceData.push({ name, status });
        }
    });

    if (attendanceData.length === 0) {
        alert("Please mark attendance for at least one person!");
        return;
    }

    const dataToSend = {
        date,
        attendance: attendanceData,
    };

    fetch("http://localhost:3000/attendance", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
    })
        .then((response) => {
            if (response.ok) {
                alert("Attendance successfully submitted!");
                searchAttendance();
            } else {
                alert("Error submitting attendance. Please try again.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Error submitting attendance. Please check your network connection.");
        });
}

async function searchAttendance() {
    const dateInput = document.getElementById("date").value;
    if (!dateInput) {
        alert("Please select a date");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/attendance?date=${dateInput}`);
        if (response.status !== 200) {
            throw new Error("Failed to fetch attendance records");
        }

        const data = await response.json();

        const attendanceTable = document.getElementById("attendance");
        attendanceTable.innerHTML = "";
        
        data.forEach((record) => {
            const row = document.createElement("tr");

            const statusSymbol = record.status === "Present" ? "✔" : "❌";
            
            row.innerHTML = `
                <td>${record.name}</td>
                <td>${statusSymbol}</td>
                <td>${record.date}</td>
            `;
            
            attendanceTable.appendChild(row);
        });
        
    } catch (error) {
        console.error("Error fetching attendance records:", error);
        alert("Failed to fetch attendance records");
    }
}

async function fetchAttendanceReport() {
    try {
      const response = await fetch('http://localhost:3000/attendance/report');
      if (response.status !== 200) {
        throw new Error('Failed to fetch attendance report');
      }
  
      const data = await response.json();
  
      const reportTable = document.getElementById("attendance");
      reportTable.innerHTML = "";
  
      data.forEach((record) => {
        const row = document.createElement("tr");
  
        row.innerHTML = `
          <td>${record.name}</td>
          <td>${record.present}/${record.total}</td>
          <td>${record.percentage}%</td>
        `;
        
        reportTable.appendChild(row);
      });
      
    } catch (error) {
      console.error("Error fetching attendance report:", error);
      alert("Failed to fetch attendance report");
    }
  }

document.getElementById("fetch-report-btn").addEventListener("click", fetchAttendanceReport);
document.getElementById("submit-btn").addEventListener("click", markAttendance);
document.getElementById("search-btn").addEventListener("click", searchAttendance);
