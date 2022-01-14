window.addEventListener('load', () => {
    let lon;
    let lat;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            //console.log(position) shows geolocation on devtools
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            const api =`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c3a052b7aa0cedbb3a0bedd1890c384e`
            // const proxy = 'https://cors-anywhere.herokuapp.com/';
           
            
            fetch(api) //calls api
            .then(response => {
                return response.json()}) //once api is connected, THEN grab data
            .then(data => {
                console.log(data)
            })
        });
        }
    
});

// api key= c3a052b7aa0cedbb3a0bedd1890c384e

