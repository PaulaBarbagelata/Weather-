
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
    
    document.querySelector("#city").innerHTML = response.data.city;
   
    document.querySelector("#real-temperature").innerHTML = Math.round(
     response.data.temperature.current
    );
  
   
    document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#description").innerHTML =
      response.data.condition.description;
      console.log(response); 

     let iconElement= document.querySelector("#icon")
     iconElement.setAttribute("src",`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`) 
    }
  
  function searchApis(inputCity) {
    let apiKey = "c8b24acb0feab485c6f630f018577toc";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${inputCity}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#search-city-input").value;
    searchApis(city);
  }
  
  let form = document.querySelector("#searchCity");
  form.addEventListener("submit", handleSubmit);
  