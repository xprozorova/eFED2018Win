function Renderer() {
    this.renderHeader = () => {}
    this.renderFooter = () => {}
    this.renderBody =  () => {}
  }
  
function FiveDaysRenderer() {
    Renderer.apply(this, arguments)
    this.renderBody = renderFiveDays
}
  
function PollutionRenderer() {
    Renderer.apply(this, arguments)
    this.renderHeader = renderHeaderPollution
}
  
function CurrentDayRenderer() {
    Renderer.apply(this, arguments)
    this.renderBody = renderCurrentDay
}

class Transformer {
    constructor() {
      this.transform = function () {}
    }
}
  
class FiveDayTransformer extends Transformer {
    transform(data) {
  
      return {
        temp: data.list
      };
    }
}
  
class PollutionTransformer extends Transformer {
    transform(data) {
      return {
        data: data[36].value
      };
    }
}

class CurrentDayTransformer extends Transformer {
    transform(data) {
      return {
        temp: data.main.temp,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        icon: data.weather[0].description
      };
    }
}

//var result = *.transform(data);

function Fetcher() {
    this.dataFetch = (url, success, failure) => {
      fetch(url)
        .then(data => {
          return Promise.all([data.status, data.json()])
        })
        .then(result => {
          console.log(result[0])
          if (this.readyState != 4 && this.status != 200) {
            failure(result);
          } else {
            success(result[1]);
          }
        }).catch(error => {
          failure(error)
        })
    }
  }
  
function FiveDayFetcher() {
    Fetcher.apply(this, arguments)
    const parentFetcher = this.dataFetch;
    this.dataFetch = (url, success, failure) => {
      parentFetcher.apply(this, [url, success, failure]);
    }
}
