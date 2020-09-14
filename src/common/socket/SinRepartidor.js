import { db } from '../Firebase.config';
import Pedido from '../Pedido';
import store from '../../store/index.js';

export default class SinRepartidor {
  #db;
  #status;

  constructor() {
    this.#db = location.host.includes('soporte.endomorelia.app')
      ? 'DLIVERYECPROD'
      : 'DLIVERYEC';
    this.#status = 'SIN REPARTIDOR';
  }

  listen() {
    db.collection(this.#db)
      .doc('DLIVERYEC')
      .collection('Pedidos')
      .where('status', '==', this.#status)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            setStore(change.doc.id, change.doc.data());
          }

          if (change.type === 'removed') {
            eliminarPedido(change.doc.id);
          }
        });
      });
  }
}

function setStore(id, data) {
  let pedido = new Pedido(
    id,
    data.comercio.nombre,
    data.fechaServer,
    data.comercio.urlLogo,
    data.total
  );

  store.state.pedidos.push(pedido);
}

function eliminarPedido(id) {
  let index = store.state.pedidos.findIndex(
    (pedido) => pedido.getPedido().id == id
  );

  store.state.pedidos.splice(index, 1);
}
