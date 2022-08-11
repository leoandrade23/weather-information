const qS = (el) => document.querySelector(el);
const qSAll = (el) => document.querySelectorAll(el);

qS(".search").addEventListener("submit", async (event) => {
  event.preventDefault();
  let input = qS("#searchInput").value;
  if (input !== "") {
    clearInfo();
    showWarning("Carregando...");
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      input
    )}&appid=eddfb7c55c5242b7c912149394a89023&units=metric&lang=pt_br`;
    let results = await fetch(url);
    let json = await results.json();
    if (json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempMax: json.main.temp_max,
        tempMin: json.main.temp_min,
        tempSubtitle: json.weather[0].main,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windDeg: json.wind.deg,
        humidity: json.main.humidity,
      });
    } else {
      clearInfo();
      showWarning(json.message);
    }
  } else {
    clearInfo();
  }
});

showInfo = (json) => {
  showWarning("");
  qS(".title").innerHTML = `${json.name}, ${json.country}`;
  qS(".tempInfo").innerHTML = `${Math.round(json.temp)} <sup>ºC</sup>`;
  qS(".tempMax span").innerHTML = `${Math.round(json.tempMax)} <sup>ºC</sup>`;
  qS(".tempMin span").innerHTML = `${Math.round(json.tempMin)} <sup>ºC</sup>`;
  qS(".temp img").setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
  );
  qS(".imgSubtitle").innerHTML = `${json.tempSubtitle}`;
  qS(".windInfo").innerHTML = `${json.windSpeed} <span>km/h</span>`;
  qS(".windPonto").style.transform = `rotate(${json.windDeg - 90}deg)`;
  qS(".humidityInfo").innerHTML = `${json.humidity} <span>%</span>`;
  qS(".result").style.display = "block";
};

clearInfo = () => {
  showWarning("");
  qS(".result").style.display = "none";
};

showWarning = (msg) => {
  qS(".warning").innerHTML = msg;
};
