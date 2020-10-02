import store from '../../store/index';

export default class Map {
  #mapContainer;
  #mapbox;
  #token;
  #map;
  // #instance = null;
  #marcadores = [];

  constructor(mapContainer, mapbox, token) {
    // if (!this.#instance) {
    //   this.#instance = this;
    // }

    this.#mapContainer = mapContainer;
    this.#mapbox = mapbox;
    this.#token = token;
    this.#mapbox.accessToken = this.#token;
    // return this.#instance;
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

    let status = repartidor.get().status;
    let color = getColor(status);

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

    sumarRepartidores(repartidor.get().status);

    let responseStore = {
      data: repartidor.get(),
      repartidor: repartidor,
    };

    // Guardar marcador en mapa
    this.#marcadores.push(marker);
    store.state.repartidores.push(responseStore);
  }

  deleteMarker(idDelivery) {
    const index = this.#marcadores.findIndex(
      (e) => e.getElement().dataset.repartidor == idDelivery
    );

    const indexStore = store.state.repartidores.findIndex(
      (e) => e.data.id === idDelivery
    );

    const status = store.state.repartidores[indexStore].repartidor.get().status;
    restarRepartidores(status);

    this.#marcadores[index].remove();
    this.#marcadores.splice(index, 1);
    store.state.repartidores.splice(indexStore, 1);
  }

  fly(coordinates) {
    this.#map.flyTo({
      center: coordinates,
      essential: true,
    });
  }

  flyToDelivery(coordinates) {
    this.#map.flyTo({
      center: coordinates,
      essential: true,
      zoom: 15,
    });
  }

  changeStyle(style) {
    this.#map.setStyle(style);
  }

  changeStatus(idDelivery, status) {
    const index = this.#marcadores.findIndex(
      (e) => e.getElement().dataset.repartidor == idDelivery
    );

    const indexStore = store.state.repartidores.findIndex(
      (e) => e.data.id === idDelivery
    );

    if (index != -1) {
      // Obtener status antiguo
      let oldStatus = store.state.repartidores[indexStore].repartidor.get()
        .status;
      // Restarle a ese status
      restarRepartidores(oldStatus);
      // Sumarle al nuevo status
      sumarRepartidores(status);
      // Actualizar el status del objeto repartidor
      store.state.repartidores[indexStore].repartidor.updateStatus(status);
      // Actualizar el status de la data para la reactividad
      store.state.repartidores[indexStore].data.status = status;
      // Obtengo el elemento div que contiene el avatar
      let el = this.#marcadores[index].getElement();
      // Obtengo el color
      let color = getColor(status);
      el.style.border = `5px solid ${color}`;
    }
  }

  moveMarker(idDelivery, coordinates) {
    const index = this.#marcadores.findIndex(
      (e) => e.getElement().dataset.repartidor == idDelivery
    );

    const indexStore = store.state.repartidores.findIndex(
      (e) => e.data.id === idDelivery
    );

    // Mover marcador
    let marker = this.#marcadores[index];
    marker.setLngLat(coordinates);

    // Actualizar data y objeto repartidor

    store.state.repartidores[indexStore].data.ubicacion = coordinates;
    store.state.repartidores[indexStore].repartidor.updateStatus(coordinates);
    console.warn(store.state.repartidores[indexStore]);
  }
}

function sumarRepartidores(tipoRepartidor) {
  if (tipoRepartidor == 'DISPONIBLE') store.state.repartidoresDisponibles++;
  if (tipoRepartidor == 'NO DISPONIBLE')
    store.state.repartidoresNoDisponibles++;
  if (tipoRepartidor == 'INVITADO') store.state.repartidoresConfirmando++;
  if (tipoRepartidor == 'EN RUTA') store.state.repartidoresEnEntrega++;
}

function restarRepartidores(tipoRepartidor) {
  if (tipoRepartidor == 'DISPONIBLE') store.state.repartidoresDisponibles--;
  if (tipoRepartidor == 'NO DISPONIBLE')
    store.state.repartidoresNoDisponibles--;
  if (tipoRepartidor == 'INVITADO') store.state.repartidoresConfirmando--;
  if (tipoRepartidor == 'EN RUTA') store.state.repartidoresEnEntrega--;
}

function getColor(status) {
  let color =
    status == 'DISPONIBLE'
      ? '#3FB523'
      : status == 'EN RUTA'
      ? '#000000'
      : status == 'INVITADO'
      ? '#F69400'
      : '#EF0049';

  return color;
}
