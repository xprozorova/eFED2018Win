const API_ID = 'cbb3210df49fdf1c3c675a785e42454b';
const defaultCity = 'izhevsk';
const defaultCoordinates = '56,53';
const WEATHER_DETAILS = `http://api.openweathermap.org/data/2.5/weather?lang=RU&mode=json&units=metric&APPID=${ API_ID }&q=`;
const FIVE_DAYS = `http://api.openweathermap.org/data/2.5/forecast?lang=RU&mode=json&units=metric&APPID=${ API_ID }&q=`;
//const POLLUTION =`http://api.openweathermap.org/pollution/v1/co/${defaultCoordinates}/current.json?appid=${ API_ID }`;

var now = new Date();
const page = {
    init: function() {
        this.getWeatherDetails(defaultCity, this.render);
        //this.getPollution(defaultCoordinates, this.renderPollution);
        this.getFiveDaysDetails(defaultCity, this.renderFiveDays);

        const searchField = document.getElementById('search');
        searchField.addEventListener('change', (event) => {
            const city = event.target.value;
            this.getWeatherDetails(city, this.render);
            this.getFiveDaysDetails(city, this.renderFiveDays);
        });
    },
    request(url, callback){
        const xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if (this.readyState === 4 && this.status === 200){
                console.log(JSON.parse(xhr.responseText));
                callback(JSON.parse(xhr.responseText));
            }
        }
        xhr.open('GET', url, true);
        xhr.send();
    },
    getWeatherDetails(city, callback) {
        const url = `${ WEATHER_DETAILS }${ city }`;
        this.request(url, callback);
    },
    getFiveDaysDetails(city, callback){
        const url = `${FIVE_DAYS}${city}`;
        this.request(url, callback);
    },
    // getPollution(city, callback) {
    //     getWeatherDetails(city, callback);
    //     const url = `${POLLUTION}`;
    //     const coordinates = data.coord.lat.toFixed(0) + ',' + data.coord.lon.toFixed(0);
    //     request(transform, city);
    // },  
    // renderPollution(data){
    //   
    //},
    render(data) {
        document.getElementById('city').innerHTML = data.name +', ' +data.sys.country;
        document.getElementById('temp').innerHTML = `${data.main.temp^0}°C`;
        document.getElementById('preciptation').innerHTML = `Вероятность осадков: ${(data.main.pressure * 0.750062)^0} мм`;
        document.getElementById('sky').innerHTML = data.weather[0].description;
        document.getElementById('wind-speed').innerHTML = `Ветер: ${Math.round(data.wind.speed)} м/с`;
        document.getElementById('humidity').innerHTML = `Влажность: ${data.main.humidity}%`;
        document.getElementById('day').innerHTML = new Date(data.dt*1000).toLocaleString("ru-RU", {weekday: 'long'});
        document.getElementsByTagName('img').innerHTML = {src: `assets/new/${data.weather[0].icon}.png`};
        

        //sunrise: new Date(data.sys.sunrise * 1000),
        //sunset: new Date(data.sys.sunset * 1000),
        //wind: `${data.wind.speed^0}m/s`,
        //clouds: `${data.clouds.all}%`,
        //rain: `${(data.rain || {'3h': 0})['3h']}mm`,
        //weatherImg: {src: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
    },
    
    renderFiveDays(data) {
        const sliderTemp = document.getElementById('slide-temp-graphic');
        const propTemp = sliderTemp.querySelectorAll('.slide-temp-prop');
        const heightTempPlus = sliderTemp.querySelectorAll('.slide-temp-degrees-plus');
        const heightTempMinus = sliderTemp.querySelectorAll('.slide-temp-degrees-minus');
        var todayDay = new Date(data.dt*1000).toLocaleString("ru-RU", {weekday: 'long'});
        let daysArray = [];
        // for (let i; i<data.list.length; i++){
        //     if (todayDay = data.list[i].dt){
        //         for (let j =0; j<8; j++){
        //             propTemp[j].textContent = Math.round(data.list[j].main.temp);
        //         }
        //     }
        // }
      
        for (let j = 0; j < 8; j++) {   
          propTemp[j].textContent = Math.round(data.list[j].main.temp);
          if (propTemp[j]>0){
            heightTempPlus[j].style.height = Math.round(data.list[j].main.temp) + "px";
          } else{
            heightTempMinus[j].style.height = Math.round(data.list[j].main.temp)+"px" ; 
          }
        }
      
        const BLOCK_TEMP = document.getElementById('weatherblock');
        const MAX_TEMP = document.querySelectorAll('.maxmin');

        const DAYS_OF_WEEK = BLOCK_TEMP.querySelectorAll('#ratata');
        let nowDate = new Date();
      
        const ICON_WEATHER = BLOCK_TEMP.querySelectorAll('.re');
      
        for (let i = 0; i < 8; i++) {
          MAX_TEMP[i].innerHTML = `${Math.round(data.list[i].main.temp_max)} C  ${Math.round(data.list[i].main.temp_max)} C`;
      
          let iconChange = data.list[i*4].weather[0].icon;
          ICON_WEATHER[i].setAttribute('src', `assets/new/${iconChange}.png`);
        }
      
    },
      
};

page.init();