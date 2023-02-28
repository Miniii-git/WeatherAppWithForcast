function changecity(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-input")
    let city = searchInput.value;
    sendCityForUrl(city)
}

function sendCityForUrl(city){
    let apiKey = "t734d4903fba534f1644oba02ab79462";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`
    axios.get(apiUrl).then(getInformation);
}

function getInformation(response){
    let city = document.querySelector("#city");
    city.innerHTML = response.data.city

    let degree = document.querySelector("#degree");
    degree.innerHTML = Math.round(response.data.temperature.current);
    celciusTemp = Math.round(response.data.temperature.current);

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.temperature.humidity;

    let speed = document.querySelector("#speed");
    speed.innerHTML = response.data.wind.speed;

    let description = document.querySelector("#wea-description");
    description.innerHTML = response.data.condition.description;

    let image = document.querySelector("img")
    image.setAttribute("alt",response.data.condition.icon);
    image.setAttribute("src",response.data.condition.icon_url);

    let timestamp = response.data.time;
    let date = new Date(timestamp*1000);
    let day = document.querySelector("#day");
    let hour = document.querySelector("#hour");
    let min = document.querySelector("#min");
    let d = date.getDay();
    let h = date.getHours();
    let m = date.getMinutes();

    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    day.innerHTML = days[d]

    if(h<=9){
        hour.innerHTML = `0${h}`;
    }else{
        hour.innerHTML =h;
    }
     
    if(m<=9){
        min.innerHTML = `0${m}`;
    }else{
        min.innerHTML =m;
    }
}


let celciusTemp = null;

function showTempInFahrenheit(event){
    event.preventDefault();
    let fahrenheitTemp = (celciusTemp * 9/5) + 32;
    let degree = document.querySelector("#degree");
    degree.innerHTML = Math.round(fahrenheitTemp);
    celcius.classList.remove("active");
    fahrenheit.classList.add("active");

}

function showTempInCelcius(event){
    event.preventDefault();
    let degree = document.querySelector("#degree");
    degree.innerHTML = Math.round(celciusTemp);
    fahrenheit.classList.remove("active");
    celcius.classList.add("active");
}


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit",changecity);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click",showTempInCelcius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click",showTempInFahrenheit);


let daysForForcast = ["Wed","Thu","Fri","Sat","Sun","Mon"];
let forcastEachDayHtml = "";

daysForForcast.forEach( function(day){
    forcastEachDayHtml = forcastEachDayHtml + `
    <div class="col-2" >
        <div id="forcast-day">${day}</div>
        <img src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png" 
        alt="" id="img-forcast">
        <div>
            <span id="maximum">10°</span>
            <span id="minimum">7°</span>
        </div>
    </div>
    `});
    
let forcast = document.querySelector("#forcast");
forcast.innerHTML = forcastEachDayHtml


sendCityForUrl("New York");



 