const fetchWeather = location =>
  fetch(`/weather?address=${encodeURIComponent(location)}`).then((res, err) => {
    if (err) {
      firstMsg.textContent = err;
    } else {
      res.json().then(data => {
        if (data.error) firstMsg.textContent = data.error;
        else {
          firstMsg.textContent = `Location: ${data.location}`;
          secondMsg.textContent = `Forecast: ${data.forecast}`;
        }
      });
    }
  });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const firstMsg = document.querySelector("#msg-1");
const secondMsg = document.querySelector("#msg-2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;
  firstMsg.textContent = "fetching data...";
  secondMsg.textContent = "";
  fetchWeather(location);
});
