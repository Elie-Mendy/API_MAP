// const { text } = require("body-parser")


// liaison avec l'element html recevant la popup
let $map = document.querySelector('#map')

class LeafletMap {

    constructor () {
        this.map = null     // carte 
        this.bounds = []         // tableau de coordonnées
    }

    async load(element) {
        return new Promise ((resolve, reject) => {
            $script('https://unpkg.com/leaflet@1.7.1/dist/leaflet.js',  () => {
                this.map = L.map(element).setView([51.505, -0.09], 13)
                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox/streets-v11',
                    tileSize: 512,
                    zoomOffset: -1,
                    accessToken: 'pk.eyJ1IjoiZW1lbmR5IiwiYSI6ImNrbW1sbGM0cjA4c2QydnBnNjZhMjBjMmkifQ.3FwCAihceCR0e79QAVUjxg'
                }).addTo(this.map)
                resolve()
            })
        
        }) 
        
    }


    addMarker (lat, lng, name) {
        // recuperation des coordonnées 
        let point = [lat, lng]
        this.bounds.push(point)

        // creation de la popup
        L.popup({
            autoClose : false,
            closeOnEscapeKey : false,
            closeOnclick: false,
            closeButton: false,
            className: 'marker',
            maxwidth: 400
        })
          .setLatLng(point)  
          .setContent(name)
          .openOn(this.map)
    }


    center () {
        this.map.fitBounds(this.bounds)
    }
    
}

const initMap = async function () {
    // initialisation de la map
    let map = new LeafletMap()
    await map.load($map)
    
    // création des markers
    Array.from(document.querySelectorAll('.js-marker')).forEach((item) => {
        map.addMarker(item.dataset.lat, item.dataset.lng, item.dataset.name)
    })

    // centrage de la map par rapport aux marqueurs 
    map.center()
    
    // effet de surbrillance sur les popup
    // 
}

if ($map !== null) {
    initMap()
}

/*
// instanciation de la map
let map = L.map('map').setView([51.505, -0.09], 13);

//L.tileLayer('//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {    // pour openstreet map 
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZW1lbmR5IiwiYSI6ImNrbW1sbGM0cjA4c2QydnBnNjZhMjBjMmkifQ.3FwCAihceCR0e79QAVUjxg'
}).addTo(map);

L.popup()
    .setLatLng([51.505, -0.09])
    .setContent('<p>Hello world!<br />This is a nice popup.</p>')
    .openOn(map) */