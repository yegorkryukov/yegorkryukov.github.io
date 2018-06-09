// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
const form = document.getElementsByClassName('search-form')[0];
var $rowsPerPageSelector = document.getElementById('inputGroupSelect01');
var $pager = document.getElementById('pager');

// Render first page on load
var page = 1;
var rowsPerPage = Number(document.getElementById('inputGroupSelect01').value);


// Set the whole table to show up initially
var data = dataSet;

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

function handleRowsSelect(){
  rowsPerPage = Number(document.getElementById('inputGroupSelect01').value);
  page = 1;
  renderTable();
};

// page selector
function handlePageClick(event){
  a = event.target
  page = Number(a.innerHTML);
  renderTable();
};

// Add listeners
form.addEventListener('submit', handleFormSubmit);
$rowsPerPageSelector.addEventListener('click', handleRowsSelect);
$pager.addEventListener('click', handlePageClick);

// renderTable renders the filteredAddresses to the tbody
function renderTable() {
  var rows = data.length;
  var pages = Math.ceil(parseFloat(rows/rowsPerPage));

  // build pagination
  $pager.innerHTML = '';

  for (var j = 1; j<=pages; j++){
    // create link element for pagination
    var a = document.createElement('a');
    a.textContent = j;
    a.className = 'page-link';
    a.href = '#';
    // create list item for pagination
    var pageNumber = document.createElement('li');
    if (page == j){
      pageNumber.className = 'page-link active';
    } else {
      pageNumber.className = 'page-link';
    };
    pageNumber.id = j;
    pageNumber.appendChild(a);
    $pager.appendChild(pageNumber);
  };

  $tbody.innerHTML = "";

  for (var i = (page-1)*rowsPerPage; i < page*rowsPerPage; i++) {
    var record = data[i];
    var fields = Object.keys(record);
    var $row = $tbody.insertRow(record);
    for (var j = 0; j < fields.length; j++) {
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = record[field];
    }
  }
};

// Render the table for the first time on page load
renderTable();
