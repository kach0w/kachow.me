let button = document.getElementById("get-location");
let latText = document.getElementById("latitude");
let longText = document.getElementById("longitude");
       
var lat = 0;
var long = 0;

button.addEventListener("click", function() {
    navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;

        latText.innerText = lat.toFixed(2);
        longText.innerText = long.toFixed(2);
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
                'X-RapidAPI-Key': '0a110d7d80msh1aee9c56803a5d5p1401c3jsn90f55ffc86dd'
            }
        };
    
        fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/forecast/minutely?lat=${lat.toFixed(2)}&lon=${long.toFixed(0)}&units=imperial`, options)
        .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("NETWORK RESPONSE ERROR");
            }
          })
        .then(response => {
            console.log(response.data[0]);
            displayTemp(response.data[0].temp)
        })
        .then(response => {
            console.log(response.city_name);
            displayCity(response.city_name)
        })
          .catch((error) => console.error("FETCH ERROR:", error));  
        });
       
        function displayTemp(data) {
            document.getElementById("temp").innerHTML = "Temperature: " + data + "°F";
        }   
        

    });
    







