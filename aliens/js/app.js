// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
const form = document.getElementsByClassName('search-form')[0];

// Set the whole table to show up initially
var data = dataSet;

// /**
//  * Funtion to work with enter press on every field of the form
//  */
// $formFields.forEach(function(elem) {
//   elem.addEventListener("keydown", function(event) {
//     // Number 13 is the "Enter" key on the keyboard
//     if (event.keyCode === 13) {
//       // Trigger the button element with a click
//       // Need to create a dict with all search queries before calling the func
//       var filterSearch = $searchDatetime.value.trim().toLowerCase();
//       $searchBtn.click();
//     };
//   });
// });

/**
 * Checks that an element has a non-empty `name` and `value` property.
 * @param  {Element} element  the element to check
 * @return {Bool}             true if the element is an input, false if not
 */
const isValidElement = element => {
  return element.name && element.value;
};

/**
 * Retrieves input data from a form and returns it as a JSON object.
 * @param  {HTMLFormControlsCollection} elements  the form elements
 * @return {Object}                     form data as an object literal
 */
const formToJSON = elements => [].reduce.call(elements, (data, element) => {
  // Make sure the element has the required properties.
  if (isValidElement(element)) {
    data[element.name] = element.value.trim().toLowerCase();
  }
  return data;
}, {});

/**
 * A handler function to prevent default submission and run our custom script.
 * @param  {Event} event  the submit event triggered by the user
 * @return {void}
 */
function handleFormSubmit(event) {
  // Stop the form from submitting since we’re handling that with AJAX.
  event.preventDefault();
  
  // TODO: Call our function to get the form data.
  const searchData = formToJSON(form.elements);
  console.log('SearchData:', searchData)

  // If search is empty return the whole data
  if (Object.keys(searchData).length === 0 && searchData.constructor === Object){
    console.log('Search is empty')
    data = dataSet
  }
  else {
    data = dataSet.filter(function(record) {
      return (
        record.datetime == searchData.datetime ||
        record.city === searchData.city ||
        record.state === searchData.state ||
        record.country === searchData.country ||
        record.shape === searchData.shape
      );
    });
  }
  renderTable();
};

// Add listener to search button
form.addEventListener('submit', handleFormSubmit);

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

// Render the table for the first time on page load
renderTable();
