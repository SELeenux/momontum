const weather = document.querySelector(".js-weather");

const API_KEY = "58702b3ee99e10c35e0b212795cc31f6",
  COORDS_LS = "coords";

function getWeather(lat, lng) {
  console.log(lat, lng);
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`).then(function (response) {
    return response.json();
  }).then(function (json) {
    const temp = json.main.temp;
    const place = json.name;
    weather.innerText = `${temp} @ ${place}`;
  })
}

function storeCoords(coordsObj) {
  localStorage.setItem(COORDS_LS, JSON.stringify(coordsObj));
}

function handleGeoSu(pos) {
  const lat = pos.coords.latitude;
  const lng = pos.coords.longitude;
  const coordsObj = {
    lat: lat,
    lng: lng
  };
  storeCoords(coordsObj);
  getWeather(lat, lng);
}

function handleGeoEr() {
  console.log("Failed to obtain location information.");
}

function getCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSu, handleGeoEr);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS_LS);
  if (loadedCoords === null) {
    getCoords();
  }
  else {
    const coordsObj = JSON.parse(loadedCoords);
    getWeather(coordsObj.lat, coordsObj.lng);
  }
}

function init() {
  loadCoords();
}

init();