//let city = prompt("Please enter a city");

//let weather = {
//paris: {
//temp: 19.7,
//humidity: 80
//},
//tokyo: {
//temp: 17.3,
// humidity: 50
// },
// lisbon: {
//  temp: 30.2,
// humidity: 20
// },
// "san francisco": {
//  temp: 20.9,
//  humidity: 100
// },
// oslo: {
//  temp: -5,
//  humidity: 20
// }
//};

//function showCity(city) {
//if (weather.hasOwnProperty(city)) {
//alert(
//`The temperature in ${city} is ${temp}°C with ${humidity} % of humidity`
// );
// } else {
// let temp = 0;
//let humidity = 0;

//alert(
//`Sorry, we don't know the weather for this city. Try going to https://www.google.com/search?q=weather+${city}`
//  );
//}
//}

//showCity(city);
function getDate() {
    let now = new Date();
    let hour = now.getHours();
  
    if (hour < 10) {
      hour = `0${hour}`;
    }
  
    let min = now.getMinutes();
    if (min < 10) {
      min = `0${min}`;
    }
    let days = [
      "Sunday ",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday ",
      "Saturday "
    ];
    let day = days[now.getDay()];
  
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    let month = months[now.getMonth()];
  
    let date = now.getDate();
  
    return `${day} ${date} ${month} ${hour}:${min}`;
  }
  
  let dateElement = document.querySelector(".date");
  dateElement.innerHTML = getDate();
  //
  //function searchCity(event) {
  //event.preventDefault();
  
  // let inputCity = document.querySelector("#search-city-input");
  
  //  let cityElement = document.querySelector("#city");
  //  cityElement.innerHTML = ` ${inputCity.value}`;
  //}
  
  //
  
  function showWeather(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#real-temperature").innerHTML = Math.round(
      response.data.main.temp
    );
  
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#description").innerHTML =
      response.data.weather[0].main;
  }
  
  function searchApis(inputCity) {
    let apiKey = "e2b191d8cf87039b1a9c8ea77b37703d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#search-city-input").value;
    searchApis(city);
  }
  
  let form = document.querySelector("#searchCity");
  form.addEventListener("submit", handleSubmit);
  