# Open Data Map Ruhrgebiet
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


## 💻 Setup project

`script/setup`

## 🛠 Build

Make sure the allowed cities in `generate-map-data.js` are correct and run:

`script/build`

## 👀 Preview

You can find the result in the `dist` directory.

## 🚀 Deployment

The deployment is handled by Codeship (on each push to master). Codeship is simply executing the `deploy` script which you can find in the `script` directory.
