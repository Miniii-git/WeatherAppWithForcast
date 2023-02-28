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

    getLongLatForForcast(response.data.coordinates)
}

function getLongLatForForcast(coord){
    let apiKey = "t734d4903fba534f1644oba02ab79462";
    let apiUrlForcast = `https://api.shecodes.io/weather/v1/forecast?lon=${coord.longitude}&lat=${coord.latitude}&key=${apiKey}`
    axios.get(apiUrlForcast).then(displayForcastSection)
}


function setDate(timestamp){
    let date = new Date(timestamp*1000);
    let day = date.getDay();
    let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    return(days[day]);
}

function displayForcastSection(response){
    let forcastEachDayHtml = "";
    let arrayDays = response.data.daily;
    arrayDays.forEach(function(day,index){
    if(index<7&&index>0)
        forcastEachDayHtml = forcastEachDayHtml + `
            <div class="col-2" >
                <div id="forcast-day">${setDate(arrayDays[index].time)}</div>
                <img src="${arrayDays[index].condition.icon_url}" 
                alt="${arrayDays[index].condition.description}" id="img-forcast">
                <div>
                    <span id="maximum">${Math.round(arrayDays[index].temperature.maximum)}°</span>
                    <span id="minimum">${Math.round(arrayDays[index].temperature.minimum)}°</span>
                </div>
            </div>
            `}); 
            
        let forcast = document.querySelector("#forcast");
        forcast.innerHTML = forcastEachDayHtml;
    };


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit",changecity);


sendCityForUrl("New York");



 