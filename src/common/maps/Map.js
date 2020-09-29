export default class Map {
  #mapContainer;
  #mapbox;
  #token;
  #map;

  constructor(mapContainer, mapbox, token) {
    this.#mapContainer = mapContainer;
    this.#mapbox = mapbox;
    this.#token = token;
    this.#mapbox.accessToken = this.#token;
  }

  drawMap() {
    this.#map = new this.#mapbox.Map({
      container: this.#mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 12,
    });
  }

  drawMarker(repartidor) {
    let popup = new this.#mapbox.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 33,
    }).setHTML(
      `<h1 style="font-family: 'Poppins'; font-weight: bold; font-size: .9rem;">${
        repartidor.get().nombre
      }</h1><h2 style="font-family: 'Poppins'; font-weight: normal; font-size: .8rem;">${
        repartidor.get().telefono
      }</h2>`
    );

    let color =
      repartidor.get().status == 'DISPONIBLE'
        ? '#3FB523'
        : repartidor.get().status == 'EN RUTA'
        ? '#000000'
        : repartidor.get().status == 'INVITADO'
        ? '#F69400'
        : '#EF0049';

    let el = document.createElement('div');
    el.className = 'marker';
    el.dataset.repartidor = `${repartidor.get().id}`;
    el.style.display = `block`;
    el.style.backgroundSize = `50px 50px`;
    el.style.backgroundImage = `url(${repartidor.get().avatar})`;
    el.style.borderRadius = `50%`;
    el.style.border = `5px solid ${color}`;
    el.style.width = `50px`;
    el.style.height = `50px`;

    let marker = new this.#mapbox.Marker(el);
    let LngLat = repartidor.get().ubicacion;
    marker
      .setLngLat(LngLat)
      .setPopup(popup)
      .addTo(this.#map);
  }

  fly(coordinates) {
    this.#map.flyTo({
      center: coordinates,
      essential: true,
    });
  }
}
