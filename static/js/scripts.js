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

    initLayer(map);
    recupStation(map);
    getArrets();
    autocomplete(document.getElementById("myInput"), listeNomArrets);
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
    var myDrag = createDrag(map);
    manageDrag(myDrag);
    
    var myDragButton = document.getElementById('myAvatarButton');
    myDragButton.addEventListener('click', function () {
        if (myDrag) {
            myDragPosition = myDrag.getLatLng();
            map.removeLayer(myDrag);
            myDrag = null;
            this.innerHTML = "Créer un avatar";
        } else {
            myDrag = createDrag(map);
            manageDrag(myDrag);
            this.innerHTML = "Supprimer l'avatar";
        }
    });

}

function createDrag(map){
    var aDragIcon = L.icon({
        iconUrl: './static/img/bonhomme_baton_standing.png',
        iconSize: [32, 44], 
        iconAnchor: [16, 20], 
        popupAnchor: [0, -20] 
    });
    return new L.Marker(coordIUT, {
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

    // Formater l'heure et les minutes avec un zéro devant les chiffres uniques
    var heureFrancaise = heure + ':' + (minute < 10 ? '0' : '') + minute;
    return heureFrancaise;
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
                    id: element.arrid,
                    name: element.arrname,
                    geo: element.arrgeopoint
                };

                // Ajouter l'objet au tableau
                listeArrets.push(elementData);
                listeNomArrets.push(element.arrname);
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement du fichier JSON :', error);
        });
}



function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
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

