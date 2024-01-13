let todayData = document.getElementById("todayData")
let todayName = document.getElementById("todayName")
let todaymonth = document.getElementById("todaymonth")
let todayNumber = document.getElementById("todayNumber")
let today = document.getElementById("today")
let todayLocation = document.getElementById("todayLocation")
let todayTemp = document.getElementById("todayTemp")
let todayText = document.getElementById("todayText")
let todayimg = document.getElementById("todayimg")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let windDir = document.getElementById("windDir")
// -------------------------------------------------------------------------------------------
let tomorrowData = document.getElementById("tomorrowData")
let tomorrowName = document.getElementById("tomorrowName")
let tomorrowMaxTemp = document.getElementById("tomorrowMaxTemp")
let tomorrowMinTemp = document.getElementById("tomorrowMinTemp")
let tomorrowtext = document.getElementById("tomorrowtext")
let tomorrowImg = document.getElementById("tomorrowImg")
// -------------------------------------------------------------------------------------------
let nextTomorrowData = document.getElementById("nextTomorrowData")
let nextTomorrowName = document.getElementById("nextTomorrowName")
let nextTomorrowMaxTemp = document.getElementById("nextTomorrowMaxTemp")
let nextTomorrowMinTemp = document.getElementById("nextTomorrowMinTemp")
let nextTomorrowtext = document.getElementById("nextTomorrowtext")
let nextTomorrowImg = document.getElementById("nextTomorrowImg")
// --------------------------------------------------------------------------------------------
let searchInput = document.getElementById("search")

//-------------------------- Fetch API--------------------------------------------------------
async function getWeatherData (cityName){
 let weatherResponse =await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d5475d4f19104aa798d213657241101&q=${cityName}&days=3`)
 let WeatherData = await weatherResponse.json()
 return WeatherData
}
getWeatherData()
  
//---------------------- display today--------------------------------------------------------------
 function displaytodayData(data){
    todayLocation.innerHTML=data.location.name
    todayTemp.innerHTML=data.current.temp_c
    todayText.innerHTML=data.current.condition.text
    todayimg.setAttribute("src","https://"+data.current.condition.icon)
    humidity.innerHTML=data.current.humidity+"%"
    wind.innerHTML=data.current.wind_kph+"km/h"
    windDir.innerHTML=data.current.wind_dir
    let todayData=new Date()
    todayNumber.innerHTML=todayData.getDate()
    todayName.innerHTML=todayData.toLocaleDateString("en-us",{weekday:"long"})
    todaymonth.innerHTML=todayData.toLocaleDateString("en-us",{month:"long"})

    
 }
// ----------------- display Tomorrow data------------------------------------------------------
function displayTomorrowData(data){   
 tomorrowMaxTemp.innerHTML= data.forecast.forecastday[1].day.maxtemp_c 
 tomorrowMinTemp.innerHTML= data.forecast.forecastday[1].day.mintemp_c 
 tomorrowtext.innerHTML= data.forecast.forecastday[1].day.condition.text
 tomorrowImg.setAttribute("src","https://"+data.forecast.forecastday[1].day.condition.icon)
 let tomorrow=new Date(data.forecast.forecastday[1].date)
 tomorrowName.innerHTML=tomorrow.toLocaleDateString("en-us",{weekday:"long"})
}
// ----------------- display next days data------------------------------------------------------
function displayNextTomorrowData(data){   
nextTomorrowMaxTemp.innerHTML= data.forecast.forecastday[2].day.maxtemp_c 
nextTomorrowMinTemp.innerHTML= data.forecast.forecastday[2].day.mintemp_c 
nextTomorrowtext.innerHTML= data.forecast.forecastday[2].day.condition.text
nextTomorrowImg.setAttribute("src","https://"+data.forecast.forecastday[2].day.condition.icon)
let nexttomorrow=new Date(data.forecast.forecastday[2].date)
nextTomorrowName.innerHTML=nexttomorrow.toLocaleDateString("en-us",{weekday:"long"})
}

// start App
async function startApp(city="london"){
    let WeatherData = await getWeatherData(city)
    if(!WeatherData.error){
      displaytodayData(WeatherData)
      displayTomorrowData(WeatherData )
      displayNextTomorrowData(WeatherData)   
    }
     
}
startApp()
search.addEventListener("input" , function(){
   startApp(search.value)

})