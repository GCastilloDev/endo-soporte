import Repartidor from '../maps/Repartidor';

export default class Socket {
  #key;
  #chanel;
  #emitter;
  #map;

  constructor(key, emitter, chanel, map) {
    this.#key = key;
    this.#chanel = chanel;
    this.#emitter = emitter.connect({
      host: 'ws://emitter.prbs.li',
      port: 58080,
      secure: false,
    });
    this.#map = map;
  }

  connect() {
    this.#emitter.subscribe({
      key: this.#key,
      channel: this.#chanel,
      last: 5,
    });
    // this.#emitter.on('connect', function() {
    //   // once we're connected, subscribe to the 'chat' channel
    //   console.log('emitter: connected');

    // });
  }

  listen() {
    this.#emitter.on('message', (msg) => {
      console.log(new Date(), msg.asObject());

      if (msg.asObject().tipo === 'REPARTIDORES') {
        drawMarkers(msg.asObject().repartidores, this.#map);
      }

      if (msg.asObject().tipo === 'CAMBIO_STATUS') {
        const response = msg.asObject();
        this.#map.changeStatus(response.idRepartidor, response.status);
      }

      if (msg.asObject().tipo === 'CAMBIO_COORDENADAS') {
        const response = msg.asObject();
        const idRepartidor = response.idRepartidor;
        const coordenadas = response.coordenadas;
        this.#map.moveMarker(idRepartidor, coordenadas);
      }

      if (msg.asObject().tipo === 'ELIMINAR') {
        const response = msg.asObject();
        const idRepartidor = response.idRepartidor;
        this.#map.deleteMarker(idRepartidor);
      }

      if (msg.asObject().tipo === 'CREAR') {
        const response = msg.asObject();
        const repartidor = response.repartidor;
        drawMarker(repartidor, this.#map);
      }
    });
  }

  publish() {
    this.#emitter.publish({
      key: this.#key,
      channel: this.#chanel,
      message: JSON.stringify({
        prueba: 'Conectando...',
        id: 'Thaeron tengo hambre!!!',
        poeei: '!!',
      }),
    });
  }

  solicitarRepartidores() {
    this.#emitter.publish({
      key: this.#key,
      channel: this.#chanel,
      message: JSON.stringify({
        tipo: 'SOLICITO_REPARTIDORES',
      }),
    });
  }
}

function drawMarker(delivery, map) {
  let repartidor = new Repartidor(
    delivery._id,
    delivery.nombres,
    delivery.apellidos,
    delivery.urlFotos,
    delivery.telefono,
    delivery.ubicacion.coordinates,
    delivery.ubicacion.delivery_status,
    map
  );

  map.drawMarker(repartidor);
}

function drawMarkers(repartidores, map) {
  repartidores.forEach((e) => {
    let repartidor = new Repartidor(
      e._id,
      e.nombres,
      e.apellidos,
      e.urlFotos,
      e.telefono,
      e.ubicacion.coordinates,
      e.ubicacion.delivery_status,
      map
    );

    map.drawMarker(repartidor);
  });
}
