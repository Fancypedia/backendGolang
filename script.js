// Menggunakan fetch untuk mengambil file JSON
fetch('fancy.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Menampilkan data JSON di elemen HTML
    document.getElementById("nama").textContent = data.Nama;
    document.getElementById("lokasi").textContent = data.Lokasi;
    document.getElementById("nomor-hp").textContent = data.Nomor_HP;
    document.getElementById("latar-belakang").textContent = data.Latar_Belakang;
    document.getElementById("about").textContent = data.About;
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
  const map = new ol.Map({
    target: 'map',
    view: new ol.View({
        center: ol.proj.fromLonLat([107.57505431918798, -6.872520017305959]),
        zoom: 17.4
    })
});

const tileLayer = new ol.layer.Tile({
    source: new ol.source.OSM()
});
map.addLayer(tileLayer);

function addGeoJSONToMapAndTable(geoJSONUrl, map) {
    fetch(geoJSONUrl)
        .then(response => response.json())
        .then(data => {
            const vectorSource = new ol.source.Vector({
                features: (new ol.format.GeoJSON()).readFeatures(data)
            });
            const vectorLayer = new ol.layer.Vector({
                source: vectorSource
            });
            map.addLayer(vectorLayer);

            data.features.forEach(feature => {
                if (feature.geometry.type === "Point") {
                    const coordinates = feature.geometry.coordinates;
                    const lat = coordinates[1];
                    const long = coordinates[0];

                    const iconUrl = feature.properties.icon;
                    const iconUrl2 = feature.properties.icon2;

                    const marker = new ol.Feature({
                        geometry: new ol.geom.Point(ol.proj.fromLonLat([long, lat]))
                    });

                    if (iconUrl || iconUrl2) {
                        const markerStyle = new ol.style.Style({
                            image: new ol.style.Icon({
                                src: iconUrl || iconUrl2,
                                scale: 0.1
                            }),
                        });
                        marker.setStyle(markerStyle);
                    }

                    vectorSource.addFeature(marker);
                } else if (feature.geometry.type === "Polygon") {
                    const coordinates = feature.geometry.coordinates;
                    const polygonCoordinates = coordinates.map(linearRingCoords => {
                        return linearRingCoords.map(coordinate => {
                            return ol.proj.fromLonLat(coordinate);
                        });
                    });

                    const polygon = new ol.geom.Polygon(polygonCoordinates);

                    const featureGeom = new ol.Feature({
                        geometry: polygon
                    });
                    vectorSource.addFeature(featureGeom);
                } else if (feature.geometry.type === "LineString") {
                    const coordinates = feature.geometry.coordinates;
                    const lineStringCoords = coordinates.map(coordinate => {
                        return ol.proj.fromLonLat(coordinate);
                    });

                    if (feature.properties.curve) {
                        const curve = feature.properties.curve;
                        const curveLineStringCoords = [];

                        for (let i = 0; i < lineStringCoords.length - 1; i++) {
                            curveLineStringCoords.push(lineStringCoords[i]);

                            for (let t = 0.1; t <= 0.9; t += 0.1) {
                                const x = (1 - t) * (1 - t) * lineStringCoords[i][0] +
                                          2 * (1 - t) * t * curve[i][0] +
                                          t * t * lineStringCoords[i + 1][0];

                                const y = (1 - t) * (1 - t) * lineStringCoords[i][1] +
                                          2 * (1 - t) * t * curve[i][1] +
                                          t * t * lineStringCoords[i + 1][1];

                                curveLineStringCoords.push([x, y]);
                            }
                        }

                        curveLineStringCoords.push(lineStringCoords[lineStringCoords.length - 1]);

                        const curveLineString = new ol.geom.LineString(curveLineStringCoords);
                        const featureGeom = new ol.Feature({
                            geometry: curveLineString
                        });
                        vectorSource.addFeature(featureGeom);
                    } else {
                        const lineString = new ol.geom.LineString(lineStringCoords);
                        const featureGeom = new ol.Feature({
                            geometry: lineString
                        });
                        vectorSource.addFeature(featureGeom);
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching GeoJSON:', error);
        });
}

// Panggil fungsi untuk menggambarkan GeoJSON pada peta
addGeoJSONToMapAndTable('./gis.json', map);

