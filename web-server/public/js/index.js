document.addEventListener('DOMContentLoaded', function () {
  initSearchForm();
  initDynamicEventListeners();
  initDeleteSubmitEventListener();
  initFormSubmitEventListener();

  // trigger search on first load
  clickSearchButton();

  //const searchButton = document.getElementById('searchPatientButton');
  //console.debug('clicking...', searchButton);
  //searchButton.click();

});

function clickSearchButton() {
  console.debug("clickSearchButton()");
  const searchButton = document.getElementById('searchPatientButton');
  searchButton.click();
}

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
      addSearchResultEventListeners();
    
    } catch (error) {
      console.error('Error:', error);
    }


  });
} 
function addSearchResultEventListeners() {
  console.debug("addSearchResultEventListerners()");
  // Add event listeners for each row in the table
  document.querySelectorAll('#searchResults tbody tr').forEach(row => {
    row.addEventListener('click', async function () {
      const patientId = this.dataset.id;
      // Fetch patientDetail
      try {
        const response = await fetch(`/patient/patientRecord?id=${patientId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch patient record.');
        }
      
        const data = await response.text();
        document.getElementById('patientDetail').innerHTML = data;
     
        initFormSubmitEventListener();
      } catch (error) {
        console.error('Error:', error);
      }; 

      // Fetch related resources
      try {
        const response = await fetch(`/patient/everything/?id=${patientId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch everything records.');
        }
      
        const data = await response.text();
        console.debug(data);

        document.getElementById('resourceHistory').innerHTML = data;
        // Add event listeners to each row
        
        initFormSubmitEventListener();
      } catch (error) {
        console.error('Error:', error);
      };

      document.querySelectorAll('#searchResourceResults tbody tr').forEach(row => {
        row.addEventListener('click', async function () {
        console.debug('row');
        const cells = this.querySelectorAll('td');
        const resourceType = cells[1].innerText;
        const id = cells[0].innerText;

        try {
          const response = await fetch(`/fhir/RenderResource/${resourceType}/${id}`);
          console.debug(response);

          if (!response.ok) {
            throw new Error('Failed to render resourceDetail.');
          }
        
          const data =  await response.text();
          console.debug(data);

          document.getElementById('resourceDetail').innerHTML = data;
       
          initFormSubmitEventListener();
        } catch (error) {
          console.error('Error:', error);
        }; 
        });

      });


    });
  
  });

  initDeleteSubmitEventListener();
}

function initDynamicEventListeners() {
  const registerLink = document.querySelector('.register-link');
  console.debug('addEventListener ');
  var ms = Date.now();

  // Add an event listener for the click event
  registerLink.addEventListener('click', async function (event) {
    event.preventDefault(); // Prevent the default action of the link

    // Your custom logic here
    console.log('Register link clicked 1', ms);
    document.getElementById('searchResults').innerHTML = "";

    try {
      const regresponse = await fetch(`/patient/patientRecord?id=0`);
      if (!regresponse.ok) {
        throw new Error('Failed to fetch patient record.');
      }
      const data = await regresponse.text();
      //  console.debug(data.id);
      document.getElementById('patientDetail').innerHTML = data;
      document.getElementById('patientId').value = "0";

      // executeInlineScripts(document.getElementById('patientDetail'));
  
      initFormSubmitEventListener();

    } catch (error) {
      console.error('Error:', error);
    }
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
        clickSearchButton();
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
  console.debug("initDeleteSubmitEventListener()");
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
