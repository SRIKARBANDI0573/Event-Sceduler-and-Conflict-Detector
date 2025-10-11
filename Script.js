 
let events = [];
 
document.getElementById('eventForm').addEventListener('submit', function (event) {
    event.preventDefault();
 
    const description = document.getElementById('description').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
 
    const newEvent = {
        description,
        startTime: startTime,
        endTime: endTime
    };
 
    events.push(newEvent);
 
    document.getElementById('eventForm').reset();
 
    displayConflicts();
    displayAvailableSlots();
});
 
function eventsOverlap(event1, event2) {
    return event1.startTime < event2.endTime && event2.startTime < event1.endTime;
}
 
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
function displayAvailableSlots() {
    const availableSlotsList = document.getElementById('availableSlotsList');
    availableSlotsList.innerHTML = '';
 
    events.sort((a, b) => a.startTime.localeCompare(b.startTime));

    const availableSlots = [];
 
    for (let i = 0; i < events.length - 1; i++) {
        const currentEvent = events[i];
        const nextEvent = events[i + 1];
 
        if (currentEvent.endTime < nextEvent.startTime) {
            availableSlots.push(`${currentEvent.endTime} to ${nextEvent.startTime}`);
        }
    }
 
    if (availableSlots.length === 0) {
        availableSlotsList.innerHTML = '<li>No available slots.</li>';
    } else {
        availableSlots.forEach(slot => {
            availableSlotsList.innerHTML += `<li>${slot}</li>`;
        });
    }
}
