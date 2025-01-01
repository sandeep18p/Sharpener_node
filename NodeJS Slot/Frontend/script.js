let selectedTime = null;


async function fetchSlots() {
    try {
        const response = await fetch('http://localhost:3000/slots');
        const slots = await response.json();
        console.log(slots);
        const slotsContainer = document.getElementById('slots-container');
        slotsContainer.innerHTML = ''; 

        slots.forEach(slot => {
            if (slot.available > 0) { 
                const button = document.createElement('button');
                button.classList.add('slot-button');
                button.setAttribute('data-time', slot.time);
                button.textContent = `${slot.time} (${slot.available} available)`; 

                button.addEventListener('click', () => {
                    selectedTime = slot.time;
                    showBookingForm();
                    disableSlotButton(slot.time);
                });

                slotsContainer.appendChild(button);
            }
        });
    } catch (error) {
        console.error("Error fetching slots:", error);
    }
}


function disableSlotButton(time) {
    const buttons = document.querySelectorAll('.slot-button');
    buttons.forEach(button => {
        if (button.getAttribute('data-time') === time) {
            button.disabled = true;
        }
    });
}

// Show the booking form
function showBookingForm() {
    document.getElementById("booking-form").classList.remove('hidden');
}

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    if (!selectedTime) {
        alert("Please select a time slot.");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/create-slots', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ time: selectedTime, name, email })
        });

        const data = await response.json();
        console.log("coming ",data)
        if (response.status ==201) {
            alert(`Successfully booked for ${selectedTime}`);
            fetchBookings(); 
            fetchSlots(); 
           
            document.getElementById("booking-form").classList.add('hidden');
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error("Error booking slot:", error);
        alert("An error occurred while booking the slot.");
    }
}

// Fetch all bookings and display them
async function fetchBookings() {
    try {
        const response = await fetch('http://localhost:3000/get');
        const bookings = await response.json();

        const bookingsContainer = document.getElementById("bookings-container");
        bookingsContainer.innerHTML = ''; 

        bookings.forEach(booking => {
            const bookingDiv = document.createElement('div');
            bookingDiv.classList.add('booking-item');
            bookingDiv.innerHTML = `${booking.name} (${booking.email}) - ${booking.slot.time}`;

            // Cancel button
            const cancelBtn = document.createElement('button');
            cancelBtn.classList.add('cancel-btn');
            cancelBtn.textContent = 'Cancel';
            cancelBtn.addEventListener('click', () => cancelBooking(booking.name, booking.slot.time));

            bookingDiv.appendChild(cancelBtn);
            bookingsContainer.appendChild(bookingDiv);
        });
    } catch (error) {
        console.error("Error fetching bookings:", error);
    }
}

// Cancel a booking
async function cancelBooking(name, time) {
    try {
        const response = await fetch('http://localhost:3000/cancel-booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });

        const data = await response.json();
        console.log(data, response)
        if (response.status == 200) {
            alert('Booking canceled successfully');
            // fetchBookings();
            // fetchSlots();
            location.reload();
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error("Error canceling booking:", error);
    }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    fetchSlots(); 
    document.getElementById("form").addEventListener("submit", handleFormSubmit); 
    fetchBookings();
});
