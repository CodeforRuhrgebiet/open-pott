function fetch(url, successCallback, errorCallback) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      successCallback(JSON.parse(request.responseText));
    } else {
      errorCallback();
    }
  };

  request.onerror = function(err) {
    errorCallback(err);
  };

  request.send();
}

function setOnEachFeature(feature, layer){

  layer.on({
    mouseover: function (e) {
      var layer = e.target;

      layer.setStyle({
        fillOpacity: 0.7,
      });

      if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
      }

      info.update(layer.feature.properties);
    },
    mouseout: function(e) {
      geojson.resetStyle(e.target);
      info.update();
    }
  });

  layer.bindPopup('<b>' + feature.properties.GN + '</b></br>'
    + 'Open Data Portal: ' + feature.properties["Open Data Portal"] + '</br>'
    + 'Website: <a target="_blank" href="' + feature.properties.Website + '">' + feature.properties.Website + '</a></br>'
    + 'CKAN / DCAN: ' + feature.properties["CKAN\/DCAN"] + '</br>'
    + 'Maschinenlesbare Formate: ' + feature.properties["Maschinenlesbare Formate"] + '</br>'
    + 'Lizenz: ' + feature.properties["Lizenz"] + '</br>'
    + 'OGD-Metadaten Pflichtfelder: ' + feature.properties["OGD-Metadaten Pflichtfelder"] + '</br>'
    + 'Anbindung an Open.NRW Portal: ' + feature.properties["Anbindung Open.NRW Portal"]
    );

  info.update(layer.feature.properties);
}

function setStyleByFeature(feature) {
  console.log(feature.properties);

  var fillOpacity = 0.7;
  var color = 'green';
  
  if(feature.properties["Open Data Portal"] == "In Planung") {
    color = 'yellow';
  }

  if(feature.properties["Open Data Portal"] == "Nein"){
    fillOpacity = 0.5;
    color = 'red';
  }

  if(feature.properties["Open Data Portal"] == null){
    fillOpacity = 0.5;
    color = 'red';
  }

  return {
    weight: 1,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: fillOpacity,
    fillColor: color
  };
}

// 7.208449443900787, 51.537503853624365

var info = L.control();
var gemein = new L.LayerGroup();
var overlays = { "Open Data Verf&uumlgbarkeit": gemein};

var geojson;

var map = L.map('map', {
  zoomControl: false,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  boxZoom: false
}).setView([51.52, 7.15], 10);

mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
usedDataLink = '<a href="https://open.nrw/">Open.NRW</a>';

var tileLayer = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
});

tileLayer.addTo(map);

// Add legend

var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),
  labels = [];
  labels.push('<div class="legend-item" style="background:' + '#FF0000' + '"></div> ' + "Nein");
  labels.push('<div class="legend-item" style="background:' + '#FFFF00' + '"></div> ' + "In Planung");
  labels.push('<div class="legend-item" style="background:' + '#008000' + '"></div> ' + "Ja");

  div.innerHTML = '<h4>Open Data</h4>' + labels.join('<br>');

  return div;
}

 legend.addTo(map);

// Setup Info box
info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};

info.update = function (props) {
  var text = '<h4>Open Data Verf&uumlgbarkeit 2016</h4>';

  if(props) {
    text += '<b>' + props.GN + '</b><br />';
  } else {
    text += '<i>Weitere Daten werden durch </br>Klick angezeigt</i>';
  }

  this._div.innerHTML = text;
};

info.addTo(map);

// Set scales
L.control.scale({
  metric: true,
  imperial: false,
  position: 'bottomleft'
}).addTo(map);

// Fetch Data and add to map
fetch('./data/map-data.json', function (data) {
  geojson = L.geoJson(data, {
    style: setStyleByFeature,
    onEachFeature: setOnEachFeature
  }).addTo(gemein);

  map.addLayer(gemein);

}, function (err) {
  console.error(err);
});
