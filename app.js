// url components for querying for displayed info on the weathermap
var baseMapUrl = 'https://tile.openweathermap.org/map/';
var endMapUrl = '/{z}/{x}/{y}.png?appid=df2de3900e635249f5651233e62fd47c';
var precipitationNew = 'precipitation_new';
var tempNew = 'temperature_new';
var cloudsNew = 'clouds_new';

// url components for querying for displayed weather info
var zipcode;
var baseWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
var endWeatherUrl = '&units=imperial&appid=df2de3900e635249f5651233e62fd47c';

// used with addWeatherInfo function
var tempData;
var forecastData;   
var cloudData;
var weatherData;
var lon;
var lat;

// the map that will be used to display weathermaps
var map;

// renders an openlayers base map
function addBackgroundMap() {
  // displays an openlayers map
    map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([-79.95, 39.62]),
      zoom: 4
    })
  });

  
}

// adds a weather map over the base map
function addWeatherMap(weatherType) {

  // check if a weathermap layer already exists, if so, remove it
  if (map.getLayers().getLength() > 1) {
    map.getLayers().pop();
  }

  // add the weathermap layer
  var weather = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url: baseMapUrl + weatherType + endMapUrl
    })
  });
  map.addLayer(weather);
}


// sends query to openweathermap and then displays the returned info
function addWeatherInfo() {

   // get the zip
   weatherUrl = baseWeatherUrl + document.getElementById('zip_txt').value + endWeatherUrl;

   // make JSON object that will be filled with weather data after location is picked
 $.getJSON(weatherUrl, function(data) {
  
  weatherData = data;
  tempData = weatherData.main.temp;
  forecastData = weatherData.weather[0].main;
  cloudData = weatherData.weather[0].description;
  lon = weatherData.coord.lon;
  lat = weatherData.coord.lat;
 })

 if (weatherData) {
   document.getElementById('temp').innerHTML = tempData + '°' + 'F';
   document.getElementById('weather').innerHTML = forecastData;
   document.getElementById('cloud-cover').innerHTML = cloudData;
   map.getView().setCenter(ol.proj.fromLonLat([lon, lat])); // sets the center of the map to the user entered zip code(lon/lat)
}
}


function main() {
  addBackgroundMap();
  
  document.getElementById('temp_new').onclick = function() {
		addWeatherMap("temp_new");
  };
  
  document.getElementById('precipitation_new').onclick = function() {
		addWeatherMap("precipitation_new");
  };
  
  document.getElementById('clouds_new').onclick = function() {
		addWeatherMap("clouds_new");
	};

  // gets the zipcode and uses it to send a query for the location's weather
  document.getElementById('zip_button').onclick = function() {
    addWeatherInfo();
  };

}

main();