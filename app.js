window.addEventListener('load', () => {
    let lon;
    let lat;

    //DOM elements being selected from HTML 
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            //console.log(position) shows geolocation on devtools
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            // const api =`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c3a052b7aa0cedbb3a0bedd1890c384e`
            // const proxy = 'https://cors-anywhere.herokuapp.com/';
           
           const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?key=6MTUNN2GMYVRJE7BG2K63J5B9`
            fetch(api) //calls api
            .then(response => {
                return response.json()}) //once api is connected, THEN grab data
            .then(data => {
                console.log(data)
                //now we grab the info from api we want, which is temperature and the conditions description
                const {temp, conditions} = data.currentConditions; 
                //Set DOM elements from the API
                temperatureDegree.textContent = temp
                temperatureDescription.textContent = conditions;
                locationTimezone.textContent = data.timezone;
            })
        });
        }
    
});

// api key= 6MTUNN2GMYVRJE7BG2K63J5B9
