# open-pott
Wie schaut es mit offenen Daten im Ruhrpott aus?

Wir wollen visualisieren:
* Bochum
* Dortmund
* Duisburg
* Essen
* Gelsenkirchen
* Herne
* Mülheim an der Ruhr
* Oberhausen

(8 größte Städte im Pott)

Datenquelle: https://open.nrw/dataset/opendatalandkartenrw

# Development

## Install deps

`script/setup`

## Build

* make sure the allowed cities in `generate-map-data.js` are correct and run:

`script/build`

## Preview

The result will be located in the `dist` directory.

# Deployment

Deploys automatically via codeship which runs `script/deploy`.
