document.addEventListener('DOMContentLoaded', function() {
    initSearchForm();
    initDynamicEventListeners();
  });
  
  function initSearchForm() {
    document.getElementById('searchForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const surname = document.getElementById('surname').value;
      const forename = document.getElementById('forename').value;
  
      fetch(`/search/Patient?family=${surname}&given=${forename}`)
        .then(response => response.text())
        .then(html => {
          document.getElementById('searchResults').innerHTML = html;
          initDynamicEventListeners();
          executeInlineScripts(document.getElementById('searchResults'));
        })
        .catch(error => console.error('Error:', error));
    });
  }
  
  function initDynamicEventListeners() {
    document.querySelectorAll('#searchResults tbody tr').forEach(row => {
      row.addEventListener('click', async function() {
        const patientId = this.dataset.id;
        const response = await fetch(`/patient/patientRecord?id=${patientId}`);
        const data = await response.text();
  
        document.getElementById('patientDetail').innerHTML = data;
        executeInlineScripts(document.getElementById('patientDetail'));
        initFormSubmitEventListener();
      });
    });
  }
  
  function initFormSubmitEventListener() {
    const form = document.getElementById('patientDetailsForm');
    if (form) {
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
          data[key] = value;
        });
  
        fetch(`/fhir/Patient/${data.patientId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            alert('Patient details updated successfully.');
          } else {
            alert('Error updating patient details: ' + result.message);
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Error updating patient details.');
        });
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
  