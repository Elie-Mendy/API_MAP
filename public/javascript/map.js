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
        return new LeafletMarker(point, name, this.map)
    }


    center () {
        this.map.fitBounds(this.bounds)
    }
    
}





class LeafletMarker {
    constructor (point, name, map) {
        this.name = name
        this.popup = L.popup({
            autoClose : false,
            closeOnEscapeKey : false,
            closeOnClick: false,
            closeButton: false,
            className: 'marker',
            maxwidth: 400
        })
            .setLatLng(point)  
            .setContent(name)
            .openOn(map)
    }


    setActive () {
        this.popup.getElement().classList.add('is-active')
    }

    unsetActive () {
        this.popup.getElement().classList.remove('is-active')
    }


    addEventListener (event, cb) {
        this.popup.getElement().addEventListener(event, cb)
    }


    setContent (name) {
        this.popup.setContent(name)
        this.popup.getElement().classList.add('is-expended')
        this.popup.update()
        
    }

    resetContent() {
        this.popup.setContent(this.name)
        this.popup.getElement().classList.remove('is-expended')
        this.popup.update()
    }

}



const initMap = async function () {
    // initialisation de la map
    let map = new LeafletMap()
    let activeMarker = null
    let hoverMarker = null
    
    await map.load($map)
    
    // création des markers
    Array.from(document.querySelectorAll('.js-marker')).forEach((item) => {
        
        // ajout d'un marker sur la map
        let marker = map.addMarker(item.dataset.lat, item.dataset.lng, item.dataset.name)
        
        // ajout des listener
        item.addEventListener('mouseover', function () {

            // suppression de la surbrillance du marqueur précédent
            if (hoverMarker !== null){
                hoverMarker.unsetActive()
            }

            // activation de la surbrillance 
            // du marker présent
            marker.setActive()

            // indication pour la suppression de 
            // surbrillance si changement de marker
            hoverMarker = marker
        })

        item.addEventListener('mouseleave', function () {
            if (hoverMarker !== null){
                hoverMarker.unsetActive()
            } 
        })
        
        marker.addEventListener('click', function () {
            if (activeMarker !== null){
                activeMarker.resetContent()
            } 
            marker.setContent(item.innerHTML)
            activeMarker = marker
        })
    })


    // centrage de la map par rapport aux marqueurs 
    map.center()
    

    
}

if ($map !== null) {
    initMap()
}
