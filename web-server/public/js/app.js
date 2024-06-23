document.addEventListener('DOMContentLoaded', function () {
  initSearchForm();
  initDynamicEventListeners();
});

function initSearchForm() {
  document.getElementById('searchForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const surname = document.getElementById('surname').value;
    const forename = document.getElementById('forename').value;

    try {
      const response = await fetch(`/search/Patient?family=${surname}&given=${forename}`);
      if (!response.ok) {
        throw new Error('Failed to fetch search results.');
      }
      const html = await response.text();
      document.getElementById('searchResults').innerHTML = html;
      initDynamicEventListeners();
      executeInlineScripts(document.getElementById('searchResults'));
    } catch (error) {
      console.error('Error:', error);
    }
  });
}

function initDynamicEventListeners() {
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

      const data = Object.fromEntries(formData); // Convert FormData to JSON object
      console.debug(data);

      try {
        const response = await fetch(`/fhir/Patient/${data.id}`, {
          method: 'PUT',
          //headers: {
          // 'Content-Type': 'application/json'
          //},
          body: formData //JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error('Failed to update patient details.');
        }

        const result = await response.json();
        console.debug(result);
     
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
