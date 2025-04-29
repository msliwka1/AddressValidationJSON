let autocomplete;

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete'),
    { types: ['address'] }
  );

  autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged() {
  const place = autocomplete.getPlace();
  if (!place.geometry) {
    // User entered the name of a place that was not suggested and pressed the Enter key,
    // or the Place Details request failed.
    console.log("No details available for input: '" + place.name + "'");
    return;
  }

  const address = place.formatted_address;
  validateAddress(address);
}

function validateAddress(address) {
  fetch('https://addressvalidation.googleapis.com/v1:validateAddress?key=YOUR_API_KEY', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "address": {
        "addressLines": [address]
      }
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    document.getElementById('address-validation-result').innerText = JSON.stringify(data, null, 2);
  })
  .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', initAutocomplete);
