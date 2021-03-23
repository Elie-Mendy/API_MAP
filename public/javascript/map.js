let map = L.map('map').setView([51.505, -0.09], 13);

//L.tileLayer('//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZW1lbmR5IiwiYSI6ImNrbW1sbGM0cjA4c2QydnBnNjZhMjBjMmkifQ.3FwCAihceCR0e79QAVUjxg'
}).addTo(map);

// lien openstreetmap : //{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png