
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
  function getForecast(coordinates){
    console.log(coordinates)
    let apiKey = "c8b24acb0feab485c6f630f018577toc";
    let apiUrl =`https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayForecast);
  }
  function showWeather(response) {
    
    
    document.querySelector("#city").innerHTML = `${response.data.city},`;
    document.querySelector("#country").innerHTML= response.data.country;
    document.querySelector("#real-temperature").innerHTML = Math.round(
     response.data.temperature.current
    );
  
    
    document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#description").innerHTML =
      response.data.condition.description;
      
     let iconElement= document.querySelector("#icon")
     iconElement.setAttribute("src",`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`) 
     
      celsiusTemperature = response.data.temperature.current;
  
      getForecast(response.data.coordinates)
     
    }
    

  function searchApis(inputCity) {
    let apiKey = "c8b24acb0feab485c6f630f018577toc";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${inputCity}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }
  
  function currentposition(position) {
    let lon = position.coords.longitude;
    let lat = position.coords.latitude;
    let apiKey = "c8b24acb0feab485c6f630f018577toc";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(showWeather);
  }



  function currentPositionClick(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(currentposition);
  }
    let locate = document.querySelector("#gps");
locate.addEventListener("click", currentPositionClick);

  function handleSubmit(event) {
    event.preventDefault();

    let city = document.querySelector("#search-city-input").value;
    searchApis(city);
  }
  
  let form = document.querySelector("#searchCity");
  form.addEventListener("submit", handleSubmit);
  
  
  function displayShortForecast() {
    let shortforecastElement = document.querySelector("#shortforecast");
    let shortforecastHTML = ` <div class="row">`;
  
    let hours = ["20", "22", "00", "02", "04"];
  
    hours.forEach(function (hour) {
      shortforecastHTML += `
        <div class="hour col" ${hour}>
          ${hour} hs
          <div class="h-temperature">
            23°
          </div>
        </div>`;
    });
  
    shortforecastHTML += `
      </div>
      <hr />
      <br/>`;
  
    shortforecastElement.innerHTML = shortforecastHTML;
  }
  
//LONG
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function displayForecast(response) {
  
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = ` <div class="row">`;

  forecast.forEach(function (forecastday, index) 
 {
    if (index < 5) {
    let minTemp = forecastday.temperature.minimum || "N/A";
    let maxTemp = forecastday.temperature.maximum || "N/A";

    forecastHTML += `
      <div class="prediction col">
        ${formatDay(forecastday.time)}
        <br/>
     
        <img src="${forecastday.condition.icon_url}" alt="${forecastday.condition.description}">
        <div class="row">
          <div class="col">
            <span class="min-temp">${Math.round(minTemp)}°</span> / <span class="max-temp">${Math.round(maxTemp)}</span>°
          </div>
        </div>
      </div>`;
    }
    
  });

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

  
   displayShortForecast()
  displayForecast();