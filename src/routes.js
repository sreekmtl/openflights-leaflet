//js file for creating route lines
import L from "leaflet";
import '@elfalem/leaflet-curve'
import "leaflet.smoothgeodesic";
import { loadRouteData } from "./dataloader";

let routes=loadRouteData();
var cnt = Object.keys(routes).length;
//console.log("Total no of routes: " +cnt); //66903

//function to find all routes from to and via an airport. used openflightId to search for airport
function findRoute(ofId){

    let pathArray=[];

    for (let i=0; i<routes.length;i++){
        if (routes[i].ofid_o===ofId || routes[i].ofid_d===ofId){

            try{
            let lat1= routes[i].lat_o;
            let lng1= routes[i].lng_o;
            let lat2= routes[i].lat_d;
            let lng2=routes[i].lng_d;

                if (routes[i].ofid_o===ofId){
                    //var path=L.curve(['M',[lat1,lng1],'Q',controlPoint(lat1,lng1,lat2,lng2),[lat2,lng2]],{color:'red',fill:false,weight:1}); //departure
                    //pathArray.push(path);
                    var path=L.smoothGeodesic([lat1,lng1],[lat2,lng2],30,{color:'red',fill:false,weight:1});
                    cross180(path,pathArray,lat2,lng2,-180);
                    pathArray.push(path);

                }else{
                    //var path=L.curve(['M',[lat2,lng2],'Q',controlPoint(lat2,lng2,lat1,lng1),[lat1,lng1]],{color:'red',fill:false,weight:1}); //arrival
                    //pathArray.push(path);
                    var path=L.smoothGeodesic([lat2,lng2],[lat1,lng1],30,{color:'red',fill:false,weight:1});
                    cross180(path,pathArray,lat1,lng1,180);
                    pathArray.push(path);
                }
            
            }

            catch(err){
                console.log(err);
            }

            
            
        }
    }

    //var path=L.curve(['M',[lat,lng],'Q',controlPoint(lat,lng,52.22,6.89),[52.22,6.89]],{color:'red',fill:false});
    return pathArray;
    

}

//function to rectify geodesic lines crossing 180 longitude
function cross180(path,pathArray,lat,lng, val){
    console.log(path._pathData.slice(-1)[0]);
    if (path._pathData.slice(-1)[0].includes(val)){
        var newPath= L.smoothGeodesic([lat,lng],[path._pathData.slice(-1)[0][0],180],30,{color:'red',fill:false,weight:1});
        pathArray.push(newPath);
    }
}

//function to curve the Bezier curve without control point
function controlPoint(lat1,lng1,lat2,lng2){

    //finding offset in cartesian plane
    let offsetx= lng2-lng1; //lng is on x axis
    let offsety= lat2-lat1; //lat is on y axis

    //converting to polar coordinates
    let r1=Math.sqrt(Math.pow(offsetx,2)+Math.pow(offsety,2));
    let theta1= Math.atan2(offsety,offsetx);

    //finding the midpoint
    let thetaOffset= 3.14/5; //we have to choose
    let theta2= theta1+thetaOffset;
    let r2= (r1/2)/Math.cos(thetaOffset);

    //converting polar midpoint to cartesian plane (adding lng1 and lat1 to remove offset)
    let mpX= r2*Math.cos(theta2)+lng1; 
    let mpY= r2*Math.sin(theta2)+lat1;

    return [mpY,mpX];
}

export {findRoute};

