const getWeather = async(location, unit) => {
  const API_KEY = "AT6X3TB3XQ6PF36HYBLASYHR9";
  try {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=${unit}&include=hours%2Ccurrent&key=${API_KEY}&contentType=json`)
    return response;
  } catch(err) {
    alert(err)
  }
}

export const displayWeather = async(location, unit) => {
  try {
    const weatherPromise = await getWeather(location, unit);
    const weatherData = await weatherPromise.json();
    populateWeatherData(weatherData, unit)
  } catch(err) {
    alert("Could not found data for your location try 'Italy'", err)
  }
}

function populateWeatherData(data, unit) {
  const main = document.querySelector('main');
  main.innerHTML = '';
  const div = document.createElement('div');
  main.appendChild(div);
  const location = document.createElement("h2")
  location.textContent = data.address
  location.classList.add("location")
  const highTemp = document.createElement('p');
  highTemp.textContent = "H: " + data.days[0].tempmax + displayTempUnit(unit)
  const lowTemp = document.createElement('p');
  lowTemp.textContent = "L: " + data.days[0].tempmin + displayTempUnit(unit)
  const currentTemp = document.createElement('p');
  currentTemp.textContent = "Current temprature: " + data.currentConditions.temp + displayTempUnit(unit)
  const feelLikeTemp = document.createElement('p');
  feelLikeTemp.textContent = "Feel: " + data.currentConditions.feelslike + displayTempUnit(unit)
  div.append(location, highTemp, lowTemp, currentTemp, feelLikeTemp)
}

export function displayTempUnit(unit) {
  if(unit == "us") return " °F";
  return " °C"
}