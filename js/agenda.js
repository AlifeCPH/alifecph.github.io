// Helper function to convert a time string to a Date object
function parseTime(timeString) {
	const [hour, minute] = timeString.split(':').map(Number);
	const date = new Date();
	date.setHours(hour, minute, 0);
	return date;
}

// Helper function to convert a time string to a slot index
function timeToSlot(timeString) {
	const [hour, minute] = timeString.split(':').map(Number);
	return (hour - 8) * 4 + Math.floor(minute / 15);
}

let selectedDay;
document.addEventListener("DOMContentLoaded", function() {
let sortedSessions = []; // Variable to store the sorted sessions
let data; // Declare the data variable

// Loading and processing the data
fetch('agenda2.json')
.then(response => response.json())
.then(dataResponse => {
		data = dataResponse; // Assign the data

		// Process and display the data
		const timeSlotsElement = document.getElementById('timeSlots');
		const roomsElement = document.getElementById('rooms');
		const daySelect = document.getElementById('day-select');

		// Generate the time slots
		generateTimeSlots(timeSlotsElement);

		// Gather and sort the rooms
		let rooms = [];

		// Populate the day select dropdown
		data.days.forEach((day, index) => {
			const option = document.createElement('option');
			option.value = index;
			option.text = day.day;
			daySelect.appendChild(option);

			// Sort sessions by start time for each day
			const sortedDaySessions = day.sessions.sort((a, b) => {
				const timeA = parseTime(a.start_time);
				const timeB = parseTime(b.start_time);
				return timeA - timeB;
			});

			sortedSessions.push(sortedDaySessions); // Store sorted sessions for each day
			rooms.push(Array.from(new Set(sortedDaySessions.map(session => session.room))).sort((a, b) => {
					// Make sure "Atrium" comes before "A"
				if (a === 'Atrium') return -1;
				if (b === 'Atrium') return 1;

					// Otherwise sort alphabetically
				return a.localeCompare(b);
			}));

		});

		// Read the 'day' parameter from the URL
		const searchParams = new URLSearchParams(window.location.search);
		const urlDay = searchParams.get('day');

				// If the 'day' parameter exists, select the correct day in the dropdown
		if (urlDay) {
			for (let i = 0; i < daySelect.options.length; i++) {
				if (daySelect.options[i].text === urlDay) {
					daySelect.selectedIndex = i;
					selectedDay = urlDay;
					break;
				}
			}
		} else {
					// If the 'day' parameter does not exist, select the first day
			daySelect.selectedIndex = 0;
			selectedDay = data.days[0].day;
		}

		const pageTitle = document.getElementById('pageTitle');
		pageTitle.innerHTML = `ALife Agenda ${selectedDay}`;

		// Generate the rooms and sessions for the selected day
		generateRoomsAndSessions(roomsElement, rooms[0], sortedSessions[0],selectedDay);


		// Event listener for day selection change
		daySelect.addEventListener('change', function () {
			const selectedDayIndex = parseInt(this.value);
			const selectedRooms = rooms[selectedDayIndex];
			const selectedSessions = sortedSessions[selectedDayIndex];
			const selectedDay = data.days[selectedDayIndex].day;

			const pageTitle = document.getElementById('pageTitle');
			pageTitle.innerHTML = `ALife Agenda ${selectedDay}`;

			// Clear the current rooms and sessions
			clearRoomsAndSessions(roomsElement);

			// Generate the rooms and sessions for the selected day
			generateRoomsAndSessions(roomsElement, selectedRooms, selectedSessions, selectedDay);



		});

		daySelect.dispatchEvent(new Event('change'));



	});




function generateTimeSlots(timeSlotsElement) {
	const emptyTh = document.createElement('th'); // Create an empty header cell
	timeSlotsElement.appendChild(emptyTh);

	for (let hour = 8; hour <= 18; hour++) {
		for (let min = 0; min <= 45; min += 15) {
			const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
			const th = document.createElement('th');
			th.innerText = time;
			th.className = 'time-slot'; // Add the time-slot class

			timeSlotsElement.appendChild(th);
		}
	}
}

function generateRoomsAndSessions(roomsElement, rooms, sessions,day) {

	rooms.forEach(room => {
		const roomSessions = sessions.filter(session => session.room === room);
		generateRoomRow(roomsElement, room, roomSessions,day);
	});

	const additionalInfoDiv = document.getElementById('additional-info');

	// Update the visibility of the additional info div based on the selected day
	if (day === "Jul 18" || day === "Jul 19") {
		additionalInfoDiv.style.display = 'block'; // Show the additional info div
		additionalInfoDiv.innerHTML = `
		<p><strong>19:30 - 23:30 Social Dinner at Festsalen</strong></p>
		<p><strong><a href="https://goo.gl/maps/LU8pHM8uTxdo5nRc6" target="_blank">Copenhagen University, Festsalen. Frue Plads 4, Entrance A</a></strong></p>
		<p>Doors open at 19:00</p>

		`;

	} else {
			additionalInfoDiv.style.display = 'none'; // Hide the additional info div
		}

		document.querySelectorAll('.room').forEach(function(room) {
			room.addEventListener('click', function() {
				var roomMapUrl = this.getAttribute('data-room-map');
				var modal = document.getElementById('modal');
				var modalImage = document.getElementById('modalImage');
				modal.style.display = 'block';
				modalImage.src = roomMapUrl.replace(" ","");
			});
		});

// Close the modal when the close button is clicked
		var closeButton = document.getElementById('modalClose');
		closeButton.addEventListener('click', function() {
			var modal = document.getElementById('modal');
			modal.style.display = 'none';
		});

// Close the modal when clicking outside the image
		var modal = document.getElementById('modal');
		modal.addEventListener('click', function(event) {
			if (event.target === modal) {
				modal.style.display = 'none';
			}
		});
	}

	function generateRoomRow(roomsElement, room, roomSessions, day) {

		const roomRow = document.createElement('tr');
		roomRow.id = `room-${room}`;
		const th = document.createElement('th');
		th.innerText = room;
	th.className = 'room'; // Assign a class name to the room name cell
	th.dataset.roomMap = ` https://laura.alessandretti.com/public/images/${room}.png`.replace(" ",""); // Assign a data attribute with the image URL
	roomRow.appendChild(th);

// Fill the row with empty cells
	for (let i = 0; i < 4 * (18 - 8) + 4; i++) {
		const emptyCell = document.createElement('td');
		roomRow.appendChild(emptyCell);
	emptyCell.className = 'session-empty'; // Add the session-empty class
}
deleted_cells = 0;
roomSessions.forEach(session => {
	const startSlot = timeToSlot(session.start_time) + 1 - deleted_cells;
	const endSlot = timeToSlot(session.end_time) + 1 - deleted_cells;
	for (let i = startSlot; i < endSlot; i++) {
		if (i < roomRow.children.length) {
			const cell = roomRow.children[i]; // Add 1 to skip the room name
			cell.className = 'session';
			cell.style.backgroundColor = session.color;
			cell.colSpan = endSlot - startSlot;
			// Add click event listener to session cell
			cell.addEventListener('click', function () {
				showSessionDetails(session,day);
			});
			if (session.type === 'parallel' || session.type === 'tutorial' ||session.type === 'keynote' || session.type === 'plenary' || session.type === 'poster' || session.type === 'other') {
				cell.classList.add('clickable-session');
			}
			const sessionContent = document.createElement('div');
			sessionContent.className = 'session-content';

			const sessionRoom = document.createElement('div');
			sessionRoom.className = 'session-room';
			if (session.room == "Room H"){
				sessionRoom.innerText = `${session.room} (code: 4221#)`; 
			} else {
				sessionRoom.innerText = session.room;
			}
			sessionContent.appendChild(sessionRoom);         

			const sessionTitle = document.createElement('div');
			sessionTitle.className = 'session-title';
			sessionTitle.innerText = session.title;
			sessionContent.appendChild(sessionTitle);

			if (session.type === 'parallel') {
				const presentationsList = createPresentationsList(session.presentations);
				sessionContent.appendChild(presentationsList);          
			} 

			cell.appendChild(sessionContent);

			// Remove the cells that are occupied by the session
			if (i > startSlot && i < roomRow.children.length) {
				const emptyCell = roomRow.children[i];
				emptyCell.remove();
				deleted_cells += 1;
			}
		}
	}
});

roomsElement.appendChild(roomRow);
}



function createPresentationsList(presentations) {
	const presentationsList = document.createElement('ul');
	presentationsList.className = 'presentations-list';
	presentations.forEach(presentation => {
		const presentationItem = document.createElement('li');
		presentationItem.className = 'presentation-item';

		const presentationTime = document.createElement('span');
		presentationTime.className = 'presentation-time';
		presentationTime.innerText = `${presentation.presentation_time} -`;
		presentationItem.appendChild(presentationTime);

		const presentationContent = document.createElement('div');
		presentationContent.className = 'presentation-content';

		const presentationTitle = document.createElement('span');
		presentationTitle.className = 'presentation-title';
		presentationTitle.innerText = presentation.title;
		presentationContent.appendChild(presentationTitle);

		const presenterName = document.createElement('span');
		presenterName.className = 'presenter-name';
		presenterName.innerHTML = presentation.authors;

		presentationContent.appendChild(presenterName);

		presentationItem.appendChild(presentationContent);

		presentationsList.appendChild(presentationItem);
	});
	return presentationsList;
}


function clearRoomsAndSessions(roomsElement) {
	while (roomsElement.firstChild) {
		roomsElement.firstChild.remove();
	}
}


const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

//searchButton.addEventListener('click', function () {
function performSearch() {
	const keyword = searchInput.value.trim();
	if (keyword !== '') {
		const matchedPresentations = searchPresentations(keyword, sortedSessions.flat());
		if (matchedPresentations.length > 0) {
			const searchResults = {
				keyword: keyword,
				presentations: matchedPresentations,
				data: data // Pass the data variable
			};

			sessionStorage.setItem('searchResults', JSON.stringify(searchResults));
			window.location.href = `search_results.html?keyword=${encodeURIComponent(keyword)}&day=${encodeURIComponent(selectedDay)}`;
		} else {
			alert('No presentations found matching the keyword.');
		}
	} else {
		alert('Please enter a keyword to search.');
	}
};


searchButton.addEventListener('click', function() {
	performSearch();
});

searchInput.addEventListener('keydown', function(event) {
	if (event.key === 'Enter') {
		event.preventDefault(); // Prevent form submission
		performSearch();
	}
});



function searchPresentations(keyword, sessions) {
	const lowercaseKeyword = keyword.toLowerCase();
	const matchedPresentations = [];

	sessions.forEach(session => {
		session.presentations.forEach(presentation => {
			const lowercaseTitle = presentation.title.toLowerCase();
			const lowercaseAuthors = presentation.authors.toLowerCase();
			if (lowercaseTitle.includes(lowercaseKeyword) || lowercaseAuthors.includes(lowercaseKeyword)) {
				matchedPresentations.push({
					presentation: presentation,
					session: session,
					day: session.day
				});
			}
		});
	});

	return matchedPresentations;
}

});



function showSessionDetails(session, day) {
	const validSessionTypes = ["parallel", "keynote", "plenary", "poster", "other","tutorial"];
	if (validSessionTypes.includes(session.type)) {
	// Redirect to session_details.html with session ID and day as query parameters
	const sessionId = session.sessionId; // Assuming you have a unique identifier for each session
	window.location.href = `session_details.html?sessionId=${sessionId}&day=${encodeURIComponent(day)}`;
}
}


