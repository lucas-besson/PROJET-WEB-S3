const coordParis = [48.8566, 2.3522];
const coordTourEffeil = [48.8584, 2.2945];
const coordArcTriomphe = [48.87391868940699, 2.2950274969557416];
addEventListener("load", init);

function init(){
    //var map = L.map('map').setView(coordParis, 13);
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
    
}