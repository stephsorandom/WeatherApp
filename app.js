window.addEventListener('load', () => {
    let lon;
    let lat;

    //DOM elements being selected from HTML 
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');
    let sunriseTime = document.querySelector('.sunrise-time');
    let sunsetTime = document.querySelector('.sunset-time')


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            //console.log(position) shows geolocation on devtools
            lon = position.coords.longitude;
            lat = position.coords.latitude;
           
           const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?key=6MTUNN2GMYVRJE7BG2K63J5B9`
            fetch(api) //calls api
            .then(response => {
                return response.json()}) //once api is connected, THEN grab data
            .then(data => {
                console.log(data)
                //now we grab the info from api we want, which is temperature and the conditions description
                const {temp, conditions, icon, sunrise, sunset} = data.currentConditions; 
                //Set DOM elements from the API
                temperatureDegree.textContent = temp
                temperatureDescription.textContent = conditions;
                locationTimezone.textContent = data.timezone;
                sunriseTime.textContent = sunrise;
                sunsetTime.textContent = sunset;
                //Celcius Formula
                let celsius = (temp - 32)*(5/9)
            
                //Set Icon
                setIcons(icon, document.querySelector('.icon'));

                //Convert to Celcius/Farenheit
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === 'F') {
                        temperatureSpan.textContent = 'C';
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else {
                        temperatureSpan.textContent = 'F';
                        temperatureDegree.textContent = temp;
                    }
                })
            })
        });
        }
        function setIcons(icon, iconID){
             const skycons = new Skycons({color: 'white'});

             //icon: "clear-day" from api needs to be displayed as 'clear_day' for skycons to read. use regex to replace all dash - with underscore _..then change toUpperCase()

             const currentIcon = icon.replace(/-/g,'_').toUpperCase();
             skycons.play();//animates the canvas 
             return skycons.set(iconID, Skycons[currentIcon])
        }
});

// api key= 6MTUNN2GMYVRJE7BG2K63J5B9
