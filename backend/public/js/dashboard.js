const dashboard = document.getElementById ('dashboard');

// Icon mapping for car detection statuses
const carIcons = {
    1: `<svg xmlns='http://www.w3.org/2000/svg' class='status-icon text-blue-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 10h11M9 21l6-6-6-6M19 5v14'/></svg>`,
    2: `<svg xmlns='http://www.w3.org/2000/svg' class='status-icon text-green-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7'/></svg>`,
    3: `<svg xmlns='http://www.w3.org/2000/svg' class='status-icon text-yellow-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 10h14M12 3l-4 4h8l-4 4'/></svg>`,
    0: `<svg xmlns='http://www.w3.org/2000/svg' class='status-icon text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01M12 5a7 7 0 11-7 7 7 7 0 017-7z'/></svg>`,
    "-1": `<svg xmlns='http://www.w3.org/2000/svg' class='status-icon text-red-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M10 14l2-2 2 2m-2-2v6'/></svg>`
};
// Text mapping for car detection statuses
const carTypes = {
    1: 'car is in gate',
    2: 'Car is parked',
    3: 'car is leaving',
    0: 'parking slot is available',
    "-1": 'there is an error in Car Detection '
};

// Function to render the dashboard based on the status
const renderDashboard = (status) => {
    const errorClass = status === -1 ? 'text-red-500' : 'text-gray-700';
    const statusText = status === -1 ? 'Error in car Detection' : 'car Detected';

    dashboard.innerHTML = `
        <div class="text-center">
            <div class="mb-4">
                ${carIcons[status]}
            </div>
            <h2 class="text-xl font-semibold ${errorClass}">${carTypes[status]}</h2>
            <p class="text-gray-500 mt-2">${statusText}</p>
        </div>
    `;
};

// Initialize with the status injected from the server
renderDashboard(initialStatus);

// Connect to WebSocket for real-time updates
const socket = new WebSocket('ws://localhost:8081');

// Handle incoming messages
socket.onmessage = (event) => {
    const status = Number.parseInt(event.data, 10);
    renderDashboard(status);
};

socket.onerror = (error) => {
    console.error('WebSocket error:', error);
};

socket.onclose = () => {
    console.warn('WebSocket connection closed');
};
