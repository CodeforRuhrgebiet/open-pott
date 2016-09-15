const fs = require('fs');
const data = require('./data/raw-data.json');

const allowedCities = [
  'breckerfeld',
  'ennepetal',
  'gevelsberg',
  'herdecke',
  'schwelm',
  'sprockhövel',
  'wetter (ruhr)',
  'witten',
  'werne',
  'unna',
  'selm',
  'schwerte',
  'lünen',
  'kamen',
  'holzwickede',
  'fröndenberg/ruhr',
  'bönen',
  'bergkamen',
  'waltrop',
  'recklinghausen',
  'oer-erkenschwick',
  'marl',
  'herten',
  'haltern am see',
  'gladbeck',
  'dorsten',
  'datteln',
  'castrop-rauxel',
  'hattingen',
  'alpen',
  'dinslaken',
  'hamminkeln',
  'xanten',
  'wesel',
  'voerde (niederrhein)',
  'sonsbeck',
  'schermbeck',
  'rheinberg',
  'neukirchen-vluyn',
  'moers',
  'kamp-lintfort',
  'hünxe',
  'oberhausen',
  'mülheim an der ruhr',
  'herne',
  'hamm',
  'hagen',
  'bochum',
  'bottrop',
  'dortmund',
  'duisburg',
  'essen',
  'gelsenkirchen'
];

data.features = data.features.filter((city) => {
  let lowerCaseCity = city.properties.GN.toLowerCase();

  for(var key in city.properties) {
    if(city.properties[key] == null) {
      city.properties[key] = "Nein";
    }
  }

  return allowedCities.indexOf(lowerCaseCity) > -1;
});

let newJson = JSON.stringify(data, null, 4);

fs.writeFileSync('./data/map-data.json', newJson);
