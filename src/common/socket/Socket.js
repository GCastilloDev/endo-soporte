export default class Socket {
  #key;
  #chanel;
  #emitter;

  constructor(key, emitter, chanel) {
    this.#key = key;
    this.#chanel = chanel;
    this.#emitter = emitter.connect({
      host: 'ws://emitter.prbs.li',
      port: 58080,
      secure: false,
    });
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
      console.log(msg.asObject());
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
}
