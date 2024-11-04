// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson

// Create a map object
let myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3
});

// Add Tile Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


var legend = L.control({position:'bottomright'});
legend.onAdd = function (myMap) {

var div = L.DomUtil.create('div', 'info legend');
labels = ['<strong>Earthquake Depths</strong>'];
categories = ['0-20','20-50','50-100','100-200','200-400','400+'];
colors = ['#fde725','#7ad151','#22a884','#2a788e','#414487','#440154'];

for (var i = 0; i <categories.length; i++) {

    div.innerHTML +=
    labels.push(
        '<i class="circle" style="background:' + colors[i] + '">'+ categories [i] + "km" + '</i>' 
    )
}
div.innerHTML = labels.join('<br>');
return div; 
};
legend.addTo(myMap);


let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"

// Perform a GET request to the query URL
d3.json(queryUrl).then(function (earthquake_data) {
    console.log(earthquake_data)
    createFeatures(earthquake_data.features)

});


function createFeatures(earthquakeDataFeatures) {
    let earthquakes = L.geoJSON(earthquakeDataFeatures, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: function(x){return({
            color: depth_to_color(x.geometry.coordinates[2]),
            fillColor: depth_to_color(x.geometry.coordinates[2]),
            fillOpacity: .6,
            radius: mag_to_size(x.properties.mag)

        })},
        onEachFeatures: function(feature, layer){
            layer.bindPopup('<h3>Magnitude:${feature.properties.mag}</h3><hr><p>${feature.properties.place}</p>');
        }
    }).addTo(myMap);

}


function depth_to_color (depth){
    let color = '#fde725'
    if (depth < 20){
        color = '#fde725'
    }else if (depth<50){
        color = '#7ad151'
    }else if (depth<100){
        color = '#22a884'
    }else if (depth<200){
        color = '#2a788e'
    }else if (depth<400){
        color = '#414487'
    }else{
        color = '#440154'
    }
    return color
}

function mag_to_size(mag){
    let size = Math.sqrt(mag)*5;
    return size
}








    
    
    


 
    //function onEachFeature(feature, layer) {
      //  layer.bindPopup()
    //}



