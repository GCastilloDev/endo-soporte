export default class Repartidor {
  #id;
  #nombre;
  #avatar;
  #telefono;
  #ubicacion;
  #status;

  constructor(id, nombres, apellidos, urlFoto, telefono, ubicacion, status) {
    this.#id = id;
    this.#nombre = `${nombres} ${apellidos}`;
    this.#avatar = `https://endoback.prbs.li/${urlFoto}`;
    this.#telefono = telefono;
    this.#ubicacion = ubicacion;
    this.#status = status;
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
}
