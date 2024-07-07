document.addEventListener('DOMContentLoaded', function () {
  initSearchForm();
  initDynamicEventListeners();
  initDeleteSubmitEventListener();

  // trigger search on first load
  const searchButton = document.getElementById('searchPatientButton');
  console.debug('clicking...', searchButton);
  searchButton.click();

});

function initSearchForm() {
  document.getElementById('searchForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    console.debug("searchButton click()");
    const surname = document.getElementById('surname').value;
    const forename = document.getElementById('forename').value;

    let searchString = "_sort=_lastUpdated";
    if (surname) searchString += `&family=${surname}`;
    if (forename) searchString += `&given=${forename}`;
    console.debug(searchString);

    //searchString += `_sort=_lastUpdated`;

    try {
      //const response = await fetch(`/search/Patient?family=${surname}&given=${forename}`);
      const response = await fetch(`/search/Patient?${searchString}`);
      //const response = await fetch(`/search/Patient?_sort=_lastUpdated`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch search results.');
      }
      const html = await response.text();
      document.getElementById('searchResults').innerHTML = html;
      initDynamicEventListeners();
      initDeleteSubmitEventListener();
      executeInlineScripts(document.getElementById('searchResults'));
    } catch (error) {
      console.error('Error:', error);
    }
  });
}

function initDynamicEventListeners() {
  const registerLink = document.querySelector('.register-link');

  // Add an event listener for the click event
  registerLink.addEventListener('click', async function(event) {
    event.preventDefault(); // Prevent the default action of the link

    // Your custom logic here
    console.log('Register link clicked');
    document.getElementById('searchResults').innerHTML = "";

    try {
      const regresponse = await fetch(`/patient/patientRecord?id=0`);
      if (!regresponse.ok) {
        throw new Error('Failed to fetch patient record.');
      }
      const data = await regresponse.text();
      console.debug(data.id);
      document.getElementById('patientDetail').innerHTML = data;
      document.getElementById('patientId').value = "0";

      executeInlineScripts(document.getElementById('patientDetail'));
      initFormSubmitEventListener();
      initDeleteSubmitEventListener();
    } catch (error) {
      console.error('Error:', error);
    }
  });

  // Add event listeners for existing rows in the table
  document.querySelectorAll('#searchResults tbody tr').forEach(row => {
    row.addEventListener('click', async function () {
      const patientId = this.dataset.id;
      try {
        const response = await fetch(`/patient/patientRecord?id=${patientId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch patient record.');
        }
        const data = await response.text();

        document.getElementById('patientDetail').innerHTML = data;
        executeInlineScripts(document.getElementById('patientDetail'));
        initFormSubmitEventListener();
        initDeleteSubmitEventListener();
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });
}


function initFormSubmitEventListener() {
  const form = document.getElementById('patientDetailsForm');
  if (form) {
    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      const formData = new FormData(this);
      console.debug(formData);

      const data = Object.fromEntries(formData.entries()); // Convert FormData to JSON object
      console.debug(data);
      
      try {
        const response = await fetch(`/fhir/Patient/${data.id}`, {
          method: 'PUT',
          body: formData // Use FormData directly for multi-part data
        });

        if (!response.ok) {
          throw new Error('Failed to update patient details.');
        }

        const result = await response.json();
        console.debug("Result: ", result);
        document.getElementById('patientDetail').innerHTML = "";
      } catch (error) {
        console.error('Error:', error);
        alert('Error updating patient details.');
      }
    });
  }
}

function executeInlineScripts(container) {
  const scripts = container.querySelectorAll('script');
  scripts.forEach(script => {
    const newScript = document.createElement('script');
    newScript.text = script.textContent;
    document.head.appendChild(newScript).parentNode.removeChild(newScript);
  });
}

function initDeleteSubmitEventListener() {
  const deleteButtons = document.querySelectorAll('.delete-btn');

  deleteButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
      event.stopPropagation(); // Prevent row click event
      const patientId = event.target.getAttribute('data-id');
      const confirmed = confirm('Are you sure you want to delete this patient?');

      if (confirmed) {
        try {
          const response = await fetch(`/fhir/Patient/${patientId}`, {
            method: 'DELETE'
          });

          if (response.ok) {
            // Remove the corresponding row from the table
            const row = event.target.closest('tr');
            row.parentNode.removeChild(row);
          } else {
            console.error('Failed to delete patient');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    });
  });
}
