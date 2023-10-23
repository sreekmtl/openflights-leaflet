//function to create legend in main map
import * as L from"leaflet";

function createLegend(){

    var legend = L.control({ position: "bottomleft" });

legend.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Number of airports</h4>";
  div.innerHTML += '<i style="background: #1c9099"></i><span>More than 100</span><br/>';
  div.innerHTML+='<br />';
  div.innerHTML += '<i style="background: #a6bddb"></i><span>10 to 100</span><br/>';
  div.innerHTML+='<br/>';
  div.innerHTML += '<i style="background: #ece2f0"></i><span>Less than 10</span><br/>';
  
  return div;
};

return legend;
}

export {createLegend};