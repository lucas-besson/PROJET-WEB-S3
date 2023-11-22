const coordParis = [48.8566, 2.3522];
const coordTourEffeil = [48.8584, 2.2945];
const coordArcTriomphe = [48.87391868940699, 2.2950274969557416];
addEventListener("load", init);

var myDraggable = $("#myDragItem");
var draggableLatLng;
var myDraggableButton = $("#myDragButton");
var newDrag = '<div id="myDragSection"> <div id="myDragLabel">Nom du lieu</div> <button id="myDragButton">Placer</button> <button id="myBtnDel">X</button> <div id="myDragItem" class="ui-widget-content"> <p>Icon</p> </div> </div>'

function init() {
   
    var IUT_paris = new L.Marker([48.84222090637304, 2.267797611373178]).bindPopup('IUT Paris Rives de Seine');
    var chez_moi = new L.Marker([48.89230421741235, 2.2888199288353763]).bindPopup('Maison');
    var Tour_effeil = L.marker(coordTourEffeil).bindPopup('Tour Effeil'),
        Arc_triomphe = L.marker(coordArcTriomphe).bindPopup('Arc de Triomphe');
    
    var maison = L.layerGroup([chez_moi]);
    var iut = L.layerGroup([IUT_paris]);
    var monuments = L.layerGroup([Tour_effeil, Arc_triomphe]);

    
    var openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)'
    });

    var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    });

    var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
    });

    var baseMaps = {
        "OpenStreetMap": osm,
        "<span style='color: red'>OpenStreetMap.HOT</span>": osmHOT
    };
    
    var overlayMaps = {
        "Chez Moi": maison,
        "Etude": iut
    };

    var map = L.map('map', {
        center: coordParis,
        zoom: 12,
        layers: [osm, maison, iut]
    });

    var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
  
    layerControl.addBaseLayer(openTopoMap, "OpenTopoMap");
    layerControl.addOverlay(monuments, "Monuments");

    getArrets();

    request();

    autocomplete(document.getElementById("myInput"), listeNomArrets);

    myDraggableButton.prop("disabled", true);

    myDraggable.draggable({
        stop: function(event, ui) {
            draggableLatLng = map.containerPointToLatLng(L.point(ui.position.left, ui.position.top));
            myDraggable.data('latLng', draggableLatLng);
            
            myDraggableButton.text("Enregistrer");
            myDraggableButton.prop("disabled", false);
        },
        containment: "#map", 
        scroll: false
    });

    map.on('move zoomend', function(event) {
        myDraggable.css({
            top: map.latLngToContainerPoint(draggableLatLng).y + "px",
            left: map.latLngToContainerPoint(draggableLatLng).x + "px"
        });
    });

    myDraggableButton.on("click", function() {
        if(myDraggableButton.text() === "Enregistrer"){
            myDraggable.draggable("disable");
            myDraggableButton.text("Modifier");
        } else if(myDraggableButton.text() === "Modifier"){
            myDraggable.draggable("enable");
            myDraggableButton.text("Placer");            
            $("#myDragButton").prop("disabled", true);
        }
    });
}


// ***************************** PARTIE POUR LES METROS - EYCI *****************************

var listeArrets = [];
var listeNomArrets = [];

async function getArrets() {

    // URL du fichier JSON externe
    var jsonFileUrl = '../refs/arrets.json';

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

var api_response = '';

var stationID = '21908';

async function request() {
    var traffic_url = 'https://prim.iledefrance-mobilites.fr/marketplace/stop-monitoring?MonitoringRef=STIF%3AStopPoint%3AQ%3A' + stationID + '%3A';

    var token = 'nYRgohLx6OwxTpsgS4oCyAyxWZn4wQdT';



    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Apikey': token,
    };


    // Make a GET request with headers
    fetch(traffic_url, {
        method: 'GET',
        headers: headers,
    })
        .then(response => response.json())
        .then(data => {

            enregistrer(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });


    // Chemin : data.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit[0].MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime
}

async function enregistrer(data) {
    api_response = data;
    affichage();
    affichageNext();
}

async function affichage() {
    var nomArret = api_response.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit[0].MonitoredVehicleJourney.MonitoredCall.StopPointName[0].value;
    var ETA = api_response.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit[0].MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime;

    // Date au format GMT
    var dateGMT = new Date(ETA);

    // Obtenir les composants de la date et de l'heure
    var heure = dateGMT.getUTCHours() + 1;
    var minute = dateGMT.getUTCMinutes();

    // Afficher l'heure française
    var heureFrancaise = heure + ':' + minute;

    alert(nomArret);
    alert("Prochain train à " + heureFrancaise);
}

async function affichageNext() {
    var nomArret = api_response.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit[1].MonitoredVehicleJourney.MonitoredCall.StopPointName[0].value;
    var ETA = api_response.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit[1].MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime;

    // Date au format GMT
    var dateGMT = new Date(ETA);

    // Obtenir les composants de la date et de l'heure
    var heure = dateGMT.getUTCHours() + 1;
    var minute = dateGMT.getUTCMinutes();

    // Afficher l'heure française
    var heureFrancaise = heure + ':' + minute;

    alert("Le suivant à " + heureFrancaise);
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