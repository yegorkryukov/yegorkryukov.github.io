// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $searchInput = document.querySelector("#searchBox");
var $searchBtn = document.querySelector("#searchBtn");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Execute a function when the user releases a key on the keyboard
$searchInput.addEventListener("keydown", function(event) {
  // Cancel the default action, if needed
  // event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    $searchBtn.click();
  }
});

// Set filteredAddresses to addressData initially
var data = dataSet;

// renderTable renders the filteredAddresses to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < data.length; i++) {
    // Get get the current address object and its fields
    var record = data[i];
    var fields = Object.keys(record);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = record[field];
    }
  }
}

function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterSearch = $searchInput.value.trim().toLowerCase();

  // Set filteredAddresses to an array of all addresses whose "state" matches the filter
  data = dataSet.filter(function(record) {
    var dateTime = record.datetime.toLowerCase();

    // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
    return dateTime === filterSearch;
  });
  renderTable();
}

// Render the table for the first time on page load
renderTable();
