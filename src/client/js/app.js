export function handleSubmit(event) {
  event.preventDefault();

  const city = document.getElementById("city").value;
  const date = document.getElementById("date").value;
  const endDate = document.getElementById("end-date").value;

  const tripDuration = Math.ceil(
    (new Date(endDate).getTime() - new Date(date).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (!city || !date) {
    alert("Please fill in both the city and date fields.");
    return;
  }

  fetch("http://localhost:8082/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ city, date }),
  })
    .then((res) => res.json())
    .then(function (res) {
      if (res.status && res.status.code !== "0") {
        // Handle the error message based on status
        document.getElementById(
          "forecast-details"
        ).innerHTML = `<p>Error: ${res.status.msg}</p>`;
      } else {
        // Success: Display the forecast and image
        document.getElementById("forecast-details").innerHTML = `
          <p><strong>My trip to:</strong> ${res.city}, ${res.country}</p>
          <p><strong>Departure Date:</strong> ${res.forecast[0].date}</p>
          <p><strong>Return Date:</strong> ${endDate}</p>
          <p><strong>Duration:</strong> ${tripDuration} days</p>
          <p><strong>Weather Forecast ${
            date === res.forecast[0].date ? "Then" : "Today"
          }:</strong> ${res.forecast[0].weather}</p>
          <p><strong>Max Temperature:</strong> ${res.forecast[0].max_temp}°C</p>
          <p><strong>Min Temperature:</strong> ${res.forecast[0].min_temp}°C</p>

        `;
        document.getElementById("location-image").innerHTML = `
          <img src="${res.imageUrl}" alt="${city} image" />
        `;
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
      document.getElementById(
        "forecast-details"
      ).innerHTML = `<p>Error: Something went wrong!</p>`;
    });
}
