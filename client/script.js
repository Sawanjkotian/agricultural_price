// Restrict the date picker to prevent selecting future dates
document.addEventListener("DOMContentLoaded", () => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    document.getElementById("date-picker").setAttribute("max", today);

    // Fetch default data for today's date when the page loads
    document.getElementById("date").textContent = today;
    
    fetchData(today);
});

const apiUrlBase = "http://localhost:3000/api/vegetable-prices?date=";

function fetchData(date) {

    // Fetch data from the backend
    fetch(apiUrlBase + date)
        .then(response => response.json())
        .then(data => displayData(data))
        .catch(error => console.error("Error fetching data:", error));
}

function displayData(data) {
    if (!data || !data.data || !data.dataHeaders) {
        console.error("Invalid data format", data);
        return;
    }

    // Display the selected date
    document.getElementById("date").textContent = data.date;

    // Get table headers and body
    const tableHeaders = document.getElementById("table-headers");
    const tableBody = document.getElementById("table-body");

    // Clear existing content
    tableHeaders.innerHTML = '';
    tableBody.innerHTML = '';

    // Populate table headers
    data.dataHeaders.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header.headerName;
        tableHeaders.appendChild(th);
    });

    // Populate table rows
    data.data.forEach(item => {
        const row = document.createElement('tr');

        data.dataHeaders.forEach(header => {
            const td = document.createElement('td');
            td.textContent = item[header.headerValue] || ''; // Handle missing data gracefully
            row.appendChild(td);
        });

        tableBody.appendChild(row);
    });
}

// Event listener for the date picker to fetch new data when the user selects a date
document.getElementById("date-picker").addEventListener("change", function () {
    fetchData(this.value);
});
