import "./style.css";
import { displayWeather, displayTempUnit } from "./weather.js";

const changeUnitBtn = document.querySelector('#change-unit');
const locationForm = document.querySelector('#location-form');

changeUnitBtn.dataset.unit = "metric";
updateUnitButtonText(changeUnitBtn);

locationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = e.target[0].value.toLowerCase();
  const unit = changeUnitBtn.dataset.unit;
  displayLoading()
  displayWeather(location, unit)
});

function toggleUnit(unit) {
  if(unit == "metric") return "us";
  return "metric";
}

function updateUnitButtonText(btn) {
  btn.textContent = displayTempUnit(btn.dataset.unit);
};

changeUnitBtn.addEventListener("click", (e) => {
  e.target.dataset.unit = toggleUnit(e.target.dataset.unit);
  updateUnitButtonText(e.target);
  if(document.querySelector(".location")) {
    const location = document.querySelector(".location").textContent
    displayWeather(location, e.target.dataset.unit);
  };
});

function displayLoading() {
  const main = document.querySelector('main');
  main.innerHTML = '';
  const p = document.createElement('p');
  p.textContent = "Loading..."
  main.append(p)
}