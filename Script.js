// Array to store events
let events = [];

// Event listener to handle the event form submission
document.getElementById('eventForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form input values
    const description = document.getElementById('description').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;

    // Create a new event object
    const newEvent = {
        description,
        startTime: startTime,
        endTime: endTime
    };

    // Add the event to the events array
    events.push(newEvent);

    // Clear the form inputs
    document.getElementById('eventForm').reset();

    // Detect conflicts and available slots
    displayConflicts();
    displayAvailableSlots();
});

// Function to check for conflicts between two events
function eventsOverlap(event1, event2) {
    return event1.startTime < event2.endTime && event2.startTime < event1.endTime;
}

// Function to detect conflicts and display them
function displayConflicts() {
    const conflictsList = document.getElementById('conflictsList');
    conflictsList.innerHTML = '';

    const conflicts = [];
    for (let i = 0; i < events.length; i++) {
        for (let j = i + 1; j < events.length; j++) {
            if (eventsOverlap(events[i], events[j])) {
                conflicts.push(`${events[i].description} and ${events[j].description}`);
            }
        }
    }

    if (conflicts.length === 0) {
        conflictsList.innerHTML = '<li>No conflicts detected.</li>';
    } else {
        conflicts.forEach(conflict => {
            conflictsList.innerHTML += `<li>${conflict}</li>`;
        });
    }
}
// Function to find and display available time slots
function displayAvailableSlots() {
    const availableSlotsList = document.getElementById('availableSlotsList');
    availableSlotsList.innerHTML = '';

    // Sort events by start time
    events.sort((a, b) => a.startTime.localeCompare(b.startTime));

    const availableSlots = [];

    // Check for available slots between events
    for (let i = 0; i < events.length - 1; i++) {
        const currentEvent = events[i];
        const nextEvent = events[i + 1];

        // If there’s a gap between currentEvent and nextEvent, add it as an available slot
        if (currentEvent.endTime < nextEvent.startTime) {
            availableSlots.push(`${currentEvent.endTime} to ${nextEvent.startTime}`);
        }
    }

    // Display available slots
    if (availableSlots.length === 0) {
        availableSlotsList.innerHTML = '<li>No available slots.</li>';
    } else {
        availableSlots.forEach(slot => {
            availableSlotsList.innerHTML += `<li>${slot}</li>`;
        });
    }
}
