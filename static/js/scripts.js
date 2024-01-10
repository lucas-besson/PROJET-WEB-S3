const coordParis = [48.8566, 2.3522];
const coordIUT = [48.842055046037764, 2.2678083530152557];
addEventListener("load", init);

function init() {

    var map = L.map('map', {
        center: coordParis,
        zoom: 12
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    addHoraireUser();
    initLayer(map);
    recupStation(map);
    getArrets();
    initDrag(map);
}

function initLayer(map){

    let icon_IUT = {
        iconUrl:"./static/img/iut.png",
        iconSize: [40, 40]
    };

    var IUT_paris = L.marker(coordIUT, {
        icon: L.icon(icon_IUT),
        title : "IUT Paris Rives de Seine"
    });

    var iut = L.layerGroup([IUT_paris]);
    var monuments = L.layerGroup(initMonument());

    var overlayMaps = {
        "Etude": iut,
        "Monument": monuments
    };

    var layerControl = L.control.layers().addTo(map);
    layerControl.addOverlay(iut, "IUT");
    layerControl.addOverlay(monuments, "Monuments");
}
function initMonument(){
    let dictMonument = {
        'Tour Effeil': [48.8584, 2.2945],
        'Arc de Triomphe': [48.87391868940699, 2.2950274969557416],
        'Cathédrale Notre Dame de Paris': [48.852992879593735, 2.3498591818522647],
        'Pantheon': [48.846285315402035, 2.346456712930375],
        'Le Louvre': [48.86081932973446, 2.337630912169469],
        'Le Palais Garnier': [48.871934387197086, 2.331612126422299],
        'Basilic du Sacré-coeur': [48.88671162608589, 2.343104297586574],
        'Les Invalides': [48.85685667197095, 2.3126740217356545],
        'Place de la concorde': [48.8656627436685, 2.3212107282767076],
        'Centre Pompidou': [48.86064895584978, 2.352159153462484]

    };
    let monuments = [];

    for (let monument in dictMonument){
        let icon = {
            iconUrl:"./static/img/" + monument +".png",
            iconSize: [40, 40]
        };
        let marker = L.marker(dictMonument[monument], {
            icon: L.icon(icon),
            title : monument
        });
        monuments.push(marker);
    }
    return monuments;
}
function recupStation(map) {
    $.ajax({
        type: "GET",
        url: "./static/refs/arrets.json",
        dataType: "json",
        success: function (data) {
            var routeLayers = {};
            var overlayMaps = {};
            data.forEach(function (station) {
                var latitud = station.pointgeo.lat;
                var longitud = station.pointgeo.lon;
                var color = station.route_long_name;
                var nomstation = station.stop_name
                var routeLongName = station.route_long_name;
                if (!routeLayers[routeLongName]) {
                    routeLayers[routeLongName] = L.layerGroup();
                }
                var marker = L.circleMarker([latitud, longitud], {color: getcolor(color), radius: 5, fillOpacity: 1})
                    .bindPopup(nomstation)
                    .on('click', function () {
                        horaires(station)
                            .then(function (horaire_dest) {
                                console.log(horaires(station))
                                var horaire = refactorDate(horaire_dest[0]);
                                var dest = horaire_dest[1];
                                marker.setPopupContent(nomstation + "<br\>En destination de : " + dest + "<br\>Prochain métro à : " + horaire);
                            })
                            .catch(function (error) {
                                console.error('Erreur lors de la récupération des horaires:', error);
                            });
                    });
                routeLayers[routeLongName].addLayer(marker);
            });

            for (var route in routeLayers) {
                overlayMaps[route] = routeLayers[route];
            }
            L.control.layers(null, overlayMaps).addTo(map);
        },
        error: function (error) {
            console.error(error);
            reject(error);
        }
    });
}


function initDrag(map) {
    var myDragPosition = coordIUT;
    var myDrag = createDrag(map, myDragPosition);
    manageDrag(myDrag);

    var myDragButton = document.getElementById('myAvatarButton');
    myDragButton.addEventListener('click', function () {
        if (myDrag) {
            myDragPosition = myDrag.getLatLng();
            map.removeLayer(myDrag);
            myDrag = null;
            this.innerHTML = "Créer un avatar";
        } else {
            myDrag = createDrag(map, myDragPosition);
            manageDrag(myDrag);
            this.innerHTML = "Supprimer l'avatar";
        }
    });

}

function createDrag(map, aDragPosition){
    var aDragIcon = L.icon({
        iconUrl: './static/img/bonhomme_baton_standing.png',
        iconSize: [32, 44],
        iconAnchor: [16, 20],
        popupAnchor: [0, -20]
    });
    return new L.Marker(aDragPosition, {
        draggable: true,
        icon: aDragIcon
    }).addTo(map);
}

function manageDrag(aDrag){
    aDrag.bindPopup("<b>Coucou !</b><br>Je suis ton avatar :D").openPopup();
    aDrag.on('drag', function() {
        this.bindPopup("<b>Dépose-moi sur la carte !</b>").openPopup();
    });
    aDrag.on('dragend', async function() {
        var link = 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + this.getLatLng().lat + '&lon=' + this.getLatLng().lng + '&format=json&addressdetails=1&extratags=1';
        try {
            var response = await fetch(link);
            var data = await response.json();
            console.log(data);
            var ville;
            if(data.address.city){ville=data.address.city}else if(data.address.town){ville=data.address.town}else{ville=data.address.village}
            this.bindPopup("<b>Ma position :</b><br>" + data.address.road + ", " + ville).openPopup();
        } catch (error) {
            console.error("Error fetching or parsing data:", error);
        }
    });
}


function extraireNumerosStopId(stopId) {
    // Utilisation d'une expression régulière pour extraire les numéros
    const numeros = stopId.match(/\d+/);
  
    // Si des numéros sont trouvés, renvoyer le premier numéro trouvé
    // Sinon, renvoyer null ou une valeur par défaut selon vos besoins
    return numeros ? numeros[0] : null;
  }

// ***************************** PARTIE POUR LES METROS - EYCI *****************************

var horaire = '';

function horaires(station) {


    var stationID = station.stop_id;

    console.log(stationID);
    stationID = extraireNumerosStopId(stationID);

    var traffic_url = 'https://prim.iledefrance-mobilites.fr/marketplace/stop-monitoring?MonitoringRef=STIF%3AStopPoint%3AQ%3A' + stationID + '%3A';

    var token = 'nYRgohLx6OwxTpsgS4oCyAyxWZn4wQdT';

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Apikey': token,
    };

    // Return the promise directly
    return fetch(traffic_url, {
        method: 'GET',
        headers: headers,
    })
        .then(response => response.json())
        .then(data => {
            return [data.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit[0].MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime, data.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit[0].MonitoredVehicleJourney.DestinationName[0].value];
        })
        .catch(error => {
            console.error('Error:', error);
            throw error; // rethrow the error to be caught by the caller
        });
}



function refactorDate(horaire) {
    // Date au format GMT
    var dateGMT = new Date(horaire);

    // Obtenir les composants de la date et de l'heure
    var heure = dateGMT.getUTCHours() + 1;
    var minute = dateGMT.getUTCMinutes();

    return heure + ':' + (minute < 10 ? '0' : '') + minute;
}

var listeArrets = [];
var listeNomArrets = [];

function getArrets() {

    // URL du fichier JSON externe
    var jsonFileUrl = './static/refs/arrets.json';

    // Utilisation de fetch pour récupérer le fichier JSON
    fetch(jsonFileUrl)
        .then(response => response.json())
        .then(jsonDataArray => {
            // Utilisation de forEach pour parcourir le tableau
            jsonDataArray.forEach(function (element) {

                // Créer un objet avec id et name
                var elementData = {
                    id: element.stop_id,
                    name: element.stop_name,
                    geo: element.pointgeo,
                    ligne : element.route_long_name
                };

                // Ajouter l'objet au tableau
                listeArrets.push(elementData);
                listeNomArrets.push(elementData.name + " (Métro " + elementData.ligne + ")");
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement du fichier JSON :', error);
        });
}

function getcolor(id){
    switch (id) {
        case "1":
            return "#fece00";
        case "2":
            return "#0065ae";
        case "3":
            return "#a19818";
        case "3bis":
            return "#99d4de";
        case "4":
            return "#be418d";
        case "5":
            return "#f18032";
        case "6":
            return "#84c28e";
        case "7":
            return "#f2a4b6";
        case "7bis":
            return "#84c28e";
        case "8":
            return "#cdaccf";
        case "9":
            return "#b8dd00";
        case "10":
            return "#e4b427";
        case "11":
            return "#8c5e24";
        case "12":
            return "#007e49";
        case "13":
            return "#99d4de";
        case "14":
            return "#622181";
        default:
            return "#000";
    }
}

function hideMenu() {
    var x = document.getElementById("myMenu");
    var btn =  document.getElementById("hamburgerBtn");
    if (x.style.display === "none") {
        x.style.display = "block";
        btn.innerHTML = "Close menu";
    } else {
        x.style.display = "none";
        btn.innerHTML = "Open menu";
    }
}
function horaires_user(station) {

    var stationID = station;

    var traffic_url = 'https://prim.iledefrance-mobilites.fr/marketplace/stop-monitoring?MonitoringRef=STIF%3AStopPoint%3AQ%3A' + stationID + '%3A';

    var token = 'nYRgohLx6OwxTpsgS4oCyAyxWZn4wQdT';

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Apikey': token,
    };

    // Return the promise directly
    return fetch(traffic_url, {
        method: 'GET',
        headers: headers,
    })
        .then(response => response.json())
        .then(data => {
            return [data.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit[0].MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime, data.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit[0].MonitoredVehicleJourney.DestinationName[0].value];
        })
        .catch(error => {
            console.error('Error:', error);
            throw error; // rethrow the error to be caught by the caller
        });
}


function addHoraireUser(){
    let lesFavs = document.getElementsByClassName('favoris');
    Array.from(lesFavs).forEach(function (element) {
        let e = element.id.match(/\d+/)[0];
        horaires_user(e).then(
            function (horaire_dest) {
                var horaire = refactorDate(horaire_dest[0])
                element.innerHTML = horaire
            });
    });

}

function activePolyline(map, coordAvatar){
    let latlngs = [
        coordIUT,
        coordAvatar
    ];

     L.polyline(latlngs, {color: 'red'}).addTo(map);
}