//loads airport data from json file in data
//return lat and long array to make pins on map

const airportData= require('../data/airports.json');
const routeData=require('../data/routes.json');

export function loadAirPortData(){

    return airportData;
}

export function loadRouteData(){

    return routeData;
}



