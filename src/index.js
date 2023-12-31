import * as L from "leaflet";
import {loadAirPortData} from './dataloader.js';
import "leaflet.markercluster";
import "../styles/MarkerCluster.css";
import "../styles/MarkerCluster.Default.css";
import "../styles/myStyles.css";
import { findRoute } from "./routes.js";
import { servicesChart,initialize } from "./charts.js";
import { createLegend, legendButtons } from "./legend.js";

var bounds = new L.LatLngBounds(new L.LatLng(90, -180), new L.LatLng(-90, 180));

var map = new L.Map('map', {
  center: bounds.getCenter(),
  zoom: 3,
  maxBounds: bounds,
  maxBoundsViscosity: 0.75
});


var baseLayer=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 15,
    minZoom:3,
    noWrap:true,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var flightLineLayers= L.layerGroup();
var airportLayers=L.layerGroup();

let lines_displayed=false;

let legend= createLegend();
legend.addTo(map);

//loading airport.json data using dataloader.js file
let airportData= loadAirPortData();
var count = Object.keys(airportData).length;


let airportLocs= airportData.map(item => item.geometry);
let countryList= airportData.map(item => item.attributes);

let countryStore=[]; //This array stores unique country names so we can cross check withit each time while creating new markercluster instance

for (let i=0; i<count;i++){
    var tempCountry=countryList[i].country; //getting country name from each json object
    if (!countryStore.includes(tempCountry)){
        countryStore.push(tempCountry);
    }
}

let markerStore=[]; // This array store instance of each markerCluster where each instance is for each country
for (let i=0; i<countryStore.length; i++){
    var mkrClstr= new L.markerClusterGroup({maxClusterRadius:640,disableClusteringAtZoom:7,zoomToBoundsOnClick:false,showCoverageOnHover:false});
    markerStore.push(mkrClstr);

}

//now we have 237 markercluster instance each represent each country(including overseas teritories)
//now from the airportlocs we have to add each airports to respective country's instance


let markerOptions={color:'red',
fillColor:'#f03',
fillOpacity:0.5,
radius:2000
}

for (let i=0; i<countryStore.length;i++){
    for (let j=0; j<count; j++){

        if (countryStore[i]===countryList[j].country){
            markerStore[i].addLayer(L.circle([airportLocs[j].lat,airportLocs[j].lon],markerOptions).on("click", function (e){
                //console.log(airportLocs[j].lat,airportLocs[j].lon);
                findAirPort(airportLocs[j].lat,airportLocs[j].lon);
            }));
            //map.addLayer(markerStore[i]);
            airportLayers.addLayer(markerStore[i]);
        }
    }
}

airportLayers.addTo(map);

//code for handling click on marker cluster
for (let i=0;i<markerStore.length;i++){
    markerStore[i].on('clusterclick', function (a) {
        //console.log(i);
        var chldary= a.layer.getAllChildMarkers();
        //console.log(chldary);

        const chartDiv = document.createElement('div');
        chartDiv.setAttribute('class', 'chartSpace');
        chartDiv.setAttribute('width','500px');
        chartDiv.setAttribute('height','400px');

        const para = document.createElement('h2');
        const subpara=document.createElement('h3');
        para.setAttribute('id','chartTitle');
        subpara.setAttribute('id','chartSubTitle');
        const node = document.createTextNode(countryStore[i].replace(/"/g, '')); //removing esc character bcos airport.json has it
        const subnode=document.createTextNode("Total services: "+initialize(countryStore[i]));
        
        para.appendChild(node);
        subpara.appendChild(subnode);
        chartDiv.appendChild(para);
        chartDiv.appendChild(subpara);

        servicesChart(countryStore[i],chartDiv);

        var pop= L.popup({maxHeight:"auto",maxWidth:"auto"}).setLatLng(a.layer.getLatLng()).setContent(chartDiv).openOn(map);
        //a.layer.bindPopup(chartDiv,{maxWidth:"auto",maxHeight:"auto"}).openPopup();

    });
}


function findAirPort(lt,ln){
    lines_displayed=true;
    let lat=lt;
    let lng=ln;
    let pathArray=[];

    if (flightLineLayers.getLayers()!=0){
        flightLineLayers.eachLayer(function (layer) {
            map.removeLayer(layer);
        });
        flightLineLayers.clearLayers();
    }

    //now we will use this coordinates to check the iata code of the airport 
    for (let i=0; i<airportLocs.length;i++){
        let lat1=airportLocs[i].lat;
        let lng1=airportLocs[i].lon;

        if (lat===lat1 && lng===lng1){
            var ofId=countryList[i].openFlightAirportId; //openflightid of airport and its lat and lng is passed to get all routes
            console.log(ofId);
            pathArray= findRoute(ofId);

            for (let j=0; j<pathArray.length;j++){
               //pathArray[j].addTo(map);
               flightLineLayers.addLayer(pathArray[j]);
            }

            flightLineLayers.addTo(map);
            
            
        }

    }

    if (lines_displayed===true){
        map.setZoom(3);
    }
}

legendButtons(map,airportLayers);


