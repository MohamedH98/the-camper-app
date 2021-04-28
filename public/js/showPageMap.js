const parsedCampground = JSON.parse(campground);

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: parsedCampground.geometry.coordinates, // starting position [lng, lat]
  zoom: 7, // starting zoom
});

const marker = new mapboxgl.Marker()
  .setLngLat(parsedCampground.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h6>${parsedCampground.title}</h6>`
    )
  )
  .addTo(map);
