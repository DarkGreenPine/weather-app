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

// displays an openlayers map
var map = new ol.Map({
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

  // adds the openweathermap layer to the map
  var weather = new ol.layer.Tile({
      source: new ol.source.XYZ({
          url: baseMapUrl + precipitationNew + endMapUrl
      })
  });
  map.addLayer(weather);


var temp;

// gets the zipcode and uses it to send a query for the location's weather
document.getElementById('zip_button').onclick = function() {
    // get the zip, send query and display
    weatherUrl = baseWeatherUrl + document.getElementById('zip_txt').value + endWeatherUrl;

    // make JSON object that will be filled with weather data after location is picked
    $.getJSON(weatherUrl, function(data) {
      temp = data["weather"]["temp"];
    })

    alert(temp);
   //weatherInfo = getData;

    document.getElementById('temp').innerHTML = temp;

};

/*
// adds json weather data into weatherInfo
function getData(data) {
  weatherInfo = data;
}
*/