export default class Repartidor {
  #id;
  #nombre;
  #avatar;
  #telefono;
  #ubicacion;
  #status;
  #map;

  constructor(
    id,
    nombres,
    apellidos,
    urlFoto,
    telefono,
    ubicacion,
    status,
    map
  ) {
    this.#id = id;
    this.#nombre = `${nombres} ${apellidos}`;
    this.#avatar = `https://endoback.prbs.li/${urlFoto}`;
    this.#telefono = telefono;
    this.#ubicacion = ubicacion;
    this.#status = status;
    this.#map = map;
  }

  get() {
    return {
      id: this.#id,
      nombre: this.#nombre,
      avatar: this.#avatar,
      telefono: this.#telefono,
      ubicacion: this.#ubicacion,
      status: this.#status,
    };
  }

  updateStatus(status) {
    this.#status = status;
  }

  updateLocation(coordinates) {
    this.#ubicacion = coordinates;
  }

  fly() {
    this.#map.flyToDelivery(this.#ubicacion);
  }
}
