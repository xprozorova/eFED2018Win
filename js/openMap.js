const API_ID = "cbb3210df49fdf1c3c675a785e42454b";
const defaultCity = "izhevsk";
const defaultCoordinates = "56,53";
const WEATHER_DETAILS_URL = `http://api.openweathermap.org/data/2.5/weather?lang=RU&mode=json&units=metric&APPID=${API_ID}&q=`;
const FIVE_DAYS_URL = `http://api.openweathermap.org/data/2.5/forecast?lang=RU&mode=json&units=metric&APPID=${API_ID}&q=`;
//const POLLUTION_URL =`http://api.openweathermap.org/pollution/v1/co/${defaultCoordinates}/current.json?appid=${ API_ID }`;

const page = {
    init() {
        this.getWeatherDetails(defaultCity, this.render);
        //this.getPollution(defaultCoordinates, this.renderPollution);
        this.getFiveDaysDetails(defaultCity, this.renderFiveDays.bind(this));

        this.getSliderDetails(defaultCity, this.renderSliderDetails);


        const searchField = document.getElementById("search");
        searchField.addEventListener("change", (event) => {
            const city = event.target.value;
            this.getWeatherDetails(city, this.render);
            this.getFiveDaysDetails(city, this.renderFiveDays.bind(this));
        });
    },

    request(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if (this.readyState === 4 && this.status === 200){
                console.log(JSON.parse(xhr.responseText));
                callback(JSON.parse(xhr.responseText));
            }
        };
        xhr.open("GET", url, true);
        xhr.send();
    },

    getWeatherDetails(city, callback) {
        document.querySelector(".overlay").style.display = "block";
        document.querySelector(".preloader").style.display = "block";
        document.querySelector("#wrapper").style.background = "linear-gradient(90deg, gray 10%, #FFFFFF 90%)";
        const url = `${ WEATHER_DETAILS_URL }${ city }`;
        this.request(url, callback);
    },
    getFiveDaysDetails(city, callback){
        const url = `${FIVE_DAYS_URL}${city}`;
        this.request(url, callback);
    },

    getSliderDetails(city, callback){
        const url = `${FIVE_DAYS_URL}${city}`;
        this.request(url, callback);
    },

    // getPollution(city, callback) {
    //     getWeatherDetails(city, callback);
    //     const url = `${POLLUTION_URL}`;
    //     const coordinates = data.coord.lat.toFixed(0) + ',' + data.coord.lon.toFixed(0);
    //     request(transform, city);
    // },  
    // renderPollution(data){
    //   
    //},
    render(data) {
        let icon = data.weather[0].icon;
        document.getElementById("city").innerHTML = data.name +", "+data.sys.country;
        document.getElementById("temp").innerHTML = `${data.main.temp^0}°C`;
        document.getElementById("preciptation").innerHTML = `Осадки: ${(data.main.pressure * 0.750062)^0} мм`;
        document.getElementById("sky").innerHTML = data.weather[0].description;
        document.getElementById("wind-speed").innerHTML = `Ветер: ${Math.round(data.wind.speed)} м/с`;
        document.getElementById("humidity").innerHTML = `Влажность: ${data.main.humidity}%`;
        document.getElementById("day").innerHTML = new Date(data.dt*1000).toLocaleString("ru-RU", {weekday: "long"});
        document.getElementById("left-temp").src = `http://openweathermap.org/img/w/${icon}.png`;
        //sunrise: new Date(data.sys.sunrise * 1000),
        //sunset: new Date(data.sys.sunset * 1000),
        //wind: `${data.wind.speed^0}m/s`,
        //clouds: `${data.clouds.all}%`,
        //rain: `${(data.rain || {'3h': 0})['3h']}mm`,
        //weatherImg: {src: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
    },

    getDayInfo(data) {
        const day_info_array = {};
        const dataList = data.list;

        for(let i = 0; i < dataList.length; i++) {
            const TODAY_DATA = new Date(dataList[i].dt * 1000);
            const TODAY = TODAY_DATA.toLocaleString("ru", {weekday: "short"});

            if (TODAY in day_info_array) {
                day_info_array[TODAY].push(dataList[i]);
            } else {
                day_info_array[TODAY] = [];
                day_info_array[TODAY].push(dataList[i]);
            }

        }

        return day_info_array;
    },
    
    renderFiveDays(data) {
        const mapper = this.getDayInfo(data);
        const oneDayInfo = document.querySelectorAll(".five-day-one");
        let blockIndex = 0;

        for (TODAY in mapper) {
            let minTemperature = Math.round(mapper[TODAY][0].main.temp_min);
            let maxTemperature = Math.round(mapper[TODAY][0].main.temp_max);
            const icon = mapper[TODAY][0].weather[0].icon.replace("n", "d");
            const oneOfSixDays = oneDayInfo[blockIndex].children;

            mapper[TODAY].forEach(val => {
                minTemperature = testFunction(val, minTemperature, 'min');
                maxTemperature = testFunction(val, maxTemperature, 'max');
            });

            oneOfSixDays[0].innerHTML = TODAY;
            oneOfSixDays[1].src = `http://openweathermap.org/img/w/${icon}.png`;
            oneOfSixDays[2].innerHTML = `${minTemperature}°   ${maxTemperature}°`;
            blockIndex++;
            document.querySelector(".overlay").style.display = "none";
            document.querySelector(".preloader").style.display = "none";
            document.querySelector("#wrapper").style.background = "white";
        }

        function testFunction(val, temperature, temperatureType) {
            if (temperatureType === 'min' && temperature > Math.round(val.main.temp_min)) {
                return Math.round(val.main.temp_min);
            }
            if (temperatureType === 'max' && temperature < Math.round(val.main.temp_max)) {
                return Math.round(val.main.temp_max);
            }

            return temperature;
        }
    },

//     renderSliderDetails(data){
//         const tempBlocks = document.querySelectorAll(".slide-temp-degree-plus");
//         const tempValues = document.querySelector(".slide-temp-prop");
//         const timeSteps = document.querySelector(".time-row").children;        
//         const precBlocks = document.querySelectorAll(".rainfall-level");
//         const precipValues = document.querySelector(".prec-value");
//         const windValues = document.querySelector(".wind-speed").children;
//         const windArrows = document.querySelectorAll(".wind-degrees > img");
//     /*-------------------TEMPERATURE----------------*/
//         let minTemp = Math.round(data.list[0].main.temp_min);
//         let maxTemp = Math.round(data.list[0].main.temp_max);
//         for (let i = 0; i < timeSteps.length; i++) {
//             if (minTemp > Math.round(data.list[i].main.temp_min)) {
//                 minTemp = Math.round(data.list[i].main.temp_min);
//             }
//             if (maxTemp < Math.round(data.list[i].main.temp_max)) {
//                 maxTemp = Math.round(data.list[i].main.temp_max);
//             }
//         }  
//         let absMax;
//         if (Math.abs(minTemp) > Math.abs(maxTemp)) {
//             absMax = Math.abs(minTemp);
//         }
//         else {
//             absMax = Math.abs(maxTemp);
//         }
    
//         for (let i = 0; i < timeSteps.length; i++) {
//             let date = new Date(data.list[i].dt * 1000);
//             timeSteps[i].innerHTML = date.toLocaleString("en-GB", { hour: 'numeric', minute: 'numeric' });
//             tempValues[i].innerHTML = Math.round(data.list[i].main.temp);
//             tempBlocks[i].style.height = `${absMax + Math.round(data.list[i].main.temp)}px`;
    
//             }
//         /*------------------------PREC----------------*/
//         for (let i = 0; i < timeSteps.length; i++) {
//             precBlocks[i].style.height = 0;
//         }

//         /*----------------------WIND---------------------*/
    
//             for (let i = 0; i < timeSteps.length; i++) {
//                 windValues[i].innerHTML = `${Math.round(data.list[i].wind.speed)} м/c`;
//                 windArrows[i].style.transform = `rotate(${Math.round(data.list[i].wind.deg)}deg)`;
//             }
//     }
 }

page.init();
